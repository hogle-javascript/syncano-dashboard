var gulp             = require('gulp'),
    fs               = require('fs'),
    path             = require('path'),
    async            = require('async'),
    _                = require('lodash'),
    gutil            = require('gulp-util'),
    git              = require('gulp-git'),
    rev              = require('gulp-rev'),
    revReplace       = require('gulp-rev-replace'),
    revOverride      = require('gulp-rev-css-url'),
    stripDebug       = require('gulp-strip-debug'),
    cloudfront       = require('gulp-cloudfront'),
    del              = require('del'),
    webpack          = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig    = require('./webpack.config'),
    awspublish       = require('gulp-awspublish'),
    iconfont         = require('gulp-iconfont'),
    iconfontCss      = require('gulp-iconfont-css'),
    through          = require('through2'),
    google           = require('googleapis'),
    googleAuth       = require('google-auth-library'),
    ENV              = process.env.NODE_ENV || 'development',
    version          = 'v' + require('./package.json').version;

var paths = {
  dist: './dist',
  bin: './bin',
  assets: './src/assets',
  index: './src/assets/index.html',
  images: './src/assets/img/**/*',
  css: './src/assets/css/**/*',
  js: './src/assets/js/**/*',
  fonts: './src/assets/fonts/**/*'
};

gulp.task('clean', function(cb) {
  del(['./dist/**/*', './dist', './dist_e2e/**/*', './dist_e2e'], cb);
});

gulp.task('clean:iconfont', function(cb) {
  del([
    paths.assets + '/fonts/icons/**/*',
    paths.assets + '/fonts/icons/',
    paths.assets + '/css/synicons.css'
  ], cb);
});

gulp.task('copy:index', ['clean'], function() {
  return gulp.src(paths.index)
  .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:images', ['clean'], function() {
  return gulp.src(paths.images)
  .pipe(gulp.dest('dist/img'));
});

gulp.task('copy:css', ['clean'], function() {
  return gulp.src(paths.css)
  .pipe(gulp.dest('dist/css'));
});

gulp.task('copy:js', ['clean'], function() {
  return gulp.src(paths.js)
  .pipe(gulp.dest('dist/js'));
});

gulp.task('copy:fonts', ['clean'], function() {
  return gulp.src(paths.fonts)
  .pipe(gulp.dest('dist/fonts'));
});

var fontName = 'Syncano Icons';

gulp.task('iconfont', ['clean:iconfont'], function(cb) {
  gulp.src([paths.assets + '/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      path: paths.assets + '/templates/synicons.css',
      targetPath: '../../css/synicons.css',
      fontPath: '/fonts/icons/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      normalize: true,
      fontHeight: 1001
    }))
    .pipe(gulp.dest(paths.assets + '/fonts/icons/'))
    .on('finish', function() {
      cb();
    });
});

gulp.task('webpack:build', ['clean', 'copy'], function(callback) {
  webpack(webpackConfig).run(callback);
});

gulp.task('webpack-dev-server', ['clean', 'copy'], function() {
  new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer)
    .listen(8080, 'localhost', function(err) {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      gutil.log('[webpack-dev-server]', 'https://localhost:8080/');
    });
});

gulp.task('stripDebug', ['clean', 'webpack:build'], function() {
  gulp.src('./dist/js/app.js')
    .pipe(stripDebug())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('revision', ['clean', 'webpack:build', 'stripDebug'], function() {
  return gulp.src([
      './dist/**/*',
      '!./dist/index.html'
    ])
    .pipe(rev())
    .pipe(revOverride())
    .pipe(gulp.dest(paths.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('revreplace', ['clean', 'webpack:build', 'clean:unrevisioned', 'revision'], function() {
  function replaceJsIfMap(filename) {
      if (filename.indexOf('.map') > -1) {
          return filename.replace('js/', '');
      }
      return filename;
  }

  return gulp.src('./dist/**/*')
    .pipe(revReplace({
      manifest: gulp.src('./' + paths.dist + '/rev-manifest.json'),
      modifyUnreved: replaceJsIfMap,
      modifyReved: replaceJsIfMap
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('clean:unrevisioned', ['clean', 'webpack:build', 'revision'], function(cb) {
  var manifest = require('./' + paths.dist + '/rev-manifest.json'),
      delPaths = Object.keys(manifest).map(function(path) {
        return paths.dist + '/' + path;
      });

  del(delPaths, cb);
});

gulp.task('revision:index', ['clean', 'clean:unrevisioned', 'revreplace'], function() {
  return gulp.src('./dist/index.html')
    .pipe(rev())
    .pipe(gulp.dest(paths.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('publish', ['clean', 'build', 'revision:index'], function() {

  var aws = {
    region: 'us-west-2',
    distributionId: 'E264182EUP50UN',
    params: {Bucket: 'dashboard-syncano-rocks'},
    patternIndex: /^\/index-[a-f0-9]{10}\.html(\.gz)*$/gi
  };

  if (ENV === 'production') {
    aws.params.Bucket  = 'dashboard-syncano-io';
    aws.distributionId = 'E1OU9ET0QZIL4X';
  }

  var src       = ['./dist/**/*', '!./dist/rev-manifest.json'],
      publisher = awspublish.create(aws);

  return gulp.src(src)
    .pipe(awspublish.gzip())
    .pipe(through.obj(function(file, enc, cb) {
      // Do nothing if no contents
      if (file.isNull()) return cb();

      // streams not supported
      if (file.isStream()) {
        this.emit('error',
          new gutil.PluginError('publish', 'Stream content is not supported'));
        return cb();
      }

      // check if file.contents is a `Buffer`
      if (file.isBuffer()) {
        file.s3.headers['Cache-Control'] = 'max-age=315360000, no-transform, public';

        if (path.basename(file.path).indexOf('index-') === 0) {
          file.s3.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        }
        cb(null, file);
      }
    }))
    .pipe(publisher.publish())
    .pipe(awspublish.reporter())
    .pipe(cloudfront(aws));
});

gulp.task('check-github-tag', function(cb) {
  async.series([
    function (callback) {
      git.fetch('origin', '', {args: '--tags'}, callback);
    },

    function (callback) {
      git.exec({args: 'tag -l "' + version + '"'}, function(err, stdout) {
        if (err) return callback(err);
        if (stdout.indexOf(version) > -1) {
          return callback(new gutil.PluginError('check-github-tag', 'Version "' + version +'" already exists.'))
        }

        callback();
      });
    }
  ], function(err) {
    if (err) throw err;
    cb();
  });
});

gulp.task('add-github-tag', function(cb) {
  async.series([
    function (callback) {
      git.exec({args: 'config --global user.email "ci@syncano.com"'}, callback);
    },

    function (callback) {
      git.exec({args: 'config --global user.name "CI"'}, callback);
    },

    function (callback) {
      git.tag(version, 'Release ' + version, callback);
    },

    function (callback) {
      git.push('origin', version, callback);
    }
  ], function(err) {
    if (err) throw err;
    cb();
  });
});

gulp.task('changelog', function(cb) {
  async.waterfall([
    function (callback) {
      // Fetch tags from origin
      git.fetch('origin', '', {args: '--tags'}, callback);
    },

    function (callback) {
      // Grab list of tags
      git.exec({args: 'tag'}, function(err, stdout) {
        if (err) return callback(err);
        var tags = stdout.split('\n').slice(-3);
        callback(null, tags[0], tags[1]);
      });
    },

    function(start, end, callback) {
      var range = start + '...' + end;
      var command = 'log ' + range + ' --grep="[[:alpha:]{5, 10}][-][[:digit:]]" --oneline --pretty=format:"%s"';
      var regex = /[A-Za-z]{5,10}-[\d]+/gm;
      git.exec({args: command}, function(err, stdout) {
        if (err) return callback(err);
        callback(null, _.uniq(stdout.match(regex)), end);
      });
    }
  ], function(err, tickets, tag) {
    if (err) throw err;

    console.log('\n\nChangelog for version:', tag + ':\n');

    tickets.sort();
    _.forEach(tickets, function(ticket) {
      if (_.startsWith(ticket, 'SYN')) {
        console.log(_.padRight(ticket, 15), 'https://syncano.aha.io/features/' + ticket);
      } else {
        console.log(ticket);
      }
    });
    cb();
  });
});

gulp.task('upload-screenshots', function(cb) {
  var clientId = process.env.GD_CLIENT_ID;
  var clientSecret = process.env.GD_CLIENT_SECRET;
  var access_token = process.env.GD_ACCESS_TOKEN;
  var refresh_token = process.env.GD_REFRESH_TOKEN;
  var nodeIndex = process.env.CIRCLE_NODE_INDEX || '';

  if (process.env.CI && nodeIndex.toString() !== '1') {
    return cb();
  }

  if (!clientId) {
    throw new gutil.PluginError('upload-screenshots', '"GD_CLIENT_ID" env variable is required');
  }

  if (!clientSecret) {
    throw new gutil.PluginError('upload-screenshots', '"GD_CLIENT_SECRET" env variable is required');
  }

  if (!access_token) {
    throw new gutil.PluginError('upload-screenshots', '"GD_ACCESS_TOKEN" env variable is required');
  }

  if (!refresh_token) {
    throw new gutil.PluginError('upload-screenshots', '"GD_REFRESH_TOKEN" env variable is required');
  }

  var invisionFolder = '0B-nLxpmereQIfkV2X1gxQkNtbXlwbHlCZE1RYlpoMFY1OGlaM1ppUkMybnU5bFllRENVZzg';
  var latestFolder = '0B-nLxpmereQIfkwwekk3b3I0dUJMdnZjS2Q4MTVqQnRublJVemlPZEdHVHdEaUlTWjIzdlk';
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, "urn:ietf:wg:oauth:2.0:oob");
  oauth2Client.setCredentials({
    access_token: access_token,
    refresh_token: refresh_token,
    token_type: 'Bearer',
    expiry_date: 1440513379139
  });

  var drive = google.drive({version: 'v2', auth: oauth2Client});

  async.waterfall([
    function(callback) {
      // Get list of files to upload
      var screenshots = './reports/screenshots/_navigation/';
      var files = fs.readdirSync(screenshots);
      var driveObjects = files.map(function(file) {
        return {
          path: path.join(screenshots, file),
          title: file,
          delete: []
        };
      });

      callback(null, driveObjects);
    },
    function(files, callback) {
      // Check which files should be deleted
      async.map(files, function(file, mapCallback) {
        drive.files.list({
          q: "title = '" + file.title + "' and '" + latestFolder + "' in parents"
        }, function(err, response) {
          if (err) return mapCallback(err);
          file.delete = response.items.map(function(item) {
            return item.id;
          });
          mapCallback(null, file);
        });
      }, callback);
    },
    function(files, callback) {
      // Delete files
      var ids = _.reduce(files, function(result, file) {
        if (file.delete.length === 0) {
          return result;
        }
        return result.concat(_.map(file.delete, function(id) {
          return {fileId: id};
        }));
      }, []);

      async.each(ids, drive.files.delete, function(err) {
        if (err) return callback(err);
        callback(null, files);
      });
    },
    function(files, callback) {
      // Create InVision/#{version} folder
      drive.files.insert({
        resource: {
          title: version,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [{id: invisionFolder}]
        }
      }, function(err, folder) {
        if (err) return callback(err);
        callback(null, files, folder);
      });
    },
    function(files, folder, callback) {
      // Insert files
      var driveObjects = files.map(function(file) {
        return {
          resource: {
            title: file.title,
            mimeType: 'image/png',
            parents: [{id: folder.id}, {id: latestFolder}]
          },
          media: {
            mimeType: 'image/png',
            body: fs.createReadStream(file.path)
          }
        };
      });

      async.each(driveObjects, drive.files.insert, callback);
    }
  ], function(err) {
    if (err) throw err;
    cb();
  });
});

gulp.task('copy', ['copy:index', 'copy:images', 'copy:css', 'copy:fonts', 'copy:js']);
gulp.task('serve', ['webpack-dev-server']);
gulp.task('build', ['webpack:build', 'revreplace']);
gulp.task('default', ['webpack-dev-server']);
