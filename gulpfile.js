var gulp             = require('gulp'),
    fs               = require('fs'),
    path             = require('path'),
    async            = require('async'),
    _                = require('lodash'),
    AWS              = require('aws-sdk'),
    gutil            = require('gulp-util'),
    git              = require('gulp-git'),
    rev              = require('gulp-rev'),
    revReplace       = require('gulp-rev-replace'),
    revOverride      = require('gulp-rev-css-url'),
    stripDebug       = require('gulp-strip-debug'),
    cloudfront       = require('gulp-cloudfront'),
    gulpSequence     = require('gulp-sequence'),
    del              = require('del'),
    moment           = require('moment'),
    webpack          = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig    = require('./webpack.config'),
    listKeys         = require('./s3ListKeys'),
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
    .listen(8080, '0.0.0.0', function(err) {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      gutil.log('[webpack-dev-server]', 'https://0.0.0.0:8080/');
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
    gutil.log('Exit');
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
      // If actual version folder exist get it otherwise create it and get it
      drive.files.list({
        q: "fullText contains '" + version + "' and '" + invisionFolder + "' in parents and trashed = false"
      }, function(err, response) {
        if (err) return callback(err);
        if (response.items.length < 1) {
          gutil.log('Creating version folder...');
          drive.files.insert({
            resource: {
              title: version,
              mimeType: 'application/vnd.google-apps.folder',
              parents: [{id: invisionFolder}]
            }
          }, function(err, folder) {
            if (err) return callback(err);
            callback(null, folder);
          });
        } else {
          gutil.log('Saving version folder ID...');
          var folder = response.items[0];
          callback(null, folder)
        }
      });
    },
    function(folder, callback) {
      // Get list of files from disc, GoogleDrive latest and version folder
      async.parallel({
        localFilesList: function(callback) {
          gutil.log('Creating screenshots list...');
          var screenshots = './reports/screenshots/_navigation/';
          var files = fs.readdirSync(screenshots);
          var localFilesList = _.map(_.filter(files, function(file) {
            return _.includes(file, '.png')
          }), function(file) {
            return {
              path: path.join(screenshots, file),
              title: file
            };
          });

          callback(null, localFilesList);
        },
        latestFolderFilesList: function(callback) {
          gutil.log('Creating latest folder screenshots list...');
          var latestFolderFilesList = [];

          drive.files.list({
            q: "'" + latestFolder + "' in parents and trashed = false"
          }, function(err, response) {
            if (err) return callback(err);
            latestFolderFilesList = _.map(response.items, function(item) {
              return {
                title: item.title,
                id: item.id
              }
            });

            callback(null, latestFolderFilesList);
          });
        },
        versionFolderFilesList: function(callback) {
          gutil.log('Creating version folder screenshots list...');
          var versionFolderFilesList = [];

          drive.files.list({
            q: "'" + folder.id + "' in parents and trashed = false"
          }, function(err, response) {
            if (err) return callback(err);
            versionFolderFilesList = _.map(response.items, function(item) {
              return {
                title: item.title,
                id: item.id
              }
            });

            callback(null, versionFolderFilesList);
          });
        }
      }, function(err, filesLists) {
        if (err) return callback(err);
        callback(null, filesLists, folder)
      });
    },
    function(_files, folder,  callback) {
      // Check which files should be updated and which should be inserted
      var files = _files;
      files.filesToUpdateList = [];

      function getFilesToUpdate(filesToFilter) {
        var filteredFiles = _.filter(filesToFilter, function(remoteFile) {
          return _.some(files.localFilesList, function(localFile) {
            if (localFile.title === remoteFile.title) {
              remoteFile.updateMediaPath = localFile.path;
              return true;
            }

            return false;
          });
        });

        return filteredFiles;
      }

      function getNewFiles(filesToFilter) {
        var newFiles = _.reject(files.localFilesList, function(remoteFile) {
          return _.some(filesToFilter, 'title', remoteFile.title);
        });

        return newFiles;
      }

      gutil.log('Creating list of files to update...');
      files.filesToUpdateList = files.filesToUpdateList.concat(getFilesToUpdate(files.latestFolderFilesList));
      files.filesToUpdateList = files.filesToUpdateList.concat(getFilesToUpdate(files.versionFolderFilesList));
      gutil.log('Creating list of new files...');
      files.newFilesForLatest = getNewFiles(files.latestFolderFilesList);
      files.newFilesForVersion = getNewFiles(files.versionFolderFilesList);

      callback(null, files, folder);
    },
    function(files, folder, callback) {
      // Update files
      if (files.filesToUpdateList.length > 0) {
        gutil.log('Updating files...');
        var fileObjects = _.map(files.filesToUpdateList, function(file) {
          return {
            fileId: file.id,
            media: {
              mimeType: 'image/png',
              body: fs.readFileSync(file.updateMediaPath)
            }
          }
        });

        async.each(fileObjects, drive.files.update, function(err) {
          if (err) return callback(err);
          callback(null, files, folder);
        });
      } else {
        gutil.log('No files to update.');
        callback(null, files, folder);
      }
    },
    function(files, folder, callback) {
      // Insert new files
      if (files.newFilesForLatest.length > 0 || files.newFilesForVersion.length > 0) {
        gutil.log('Uploading new files...');
        function mapDriveObjects(newFiles, folderId) {
          var objects = newFiles.map(function(file) {
            return {
              resource: {
                title: file.title,
                mimeType: 'image/png',
                parents: [{id: folderId}]
              },
              media: {
                mimeType: 'image/png',
                body: fs.createReadStream(file.path)
              }
            };
          });
          return objects;
        }

        var latestDriveObjects = mapDriveObjects(files.newFilesForLatest, latestFolder);
        var versionDriveObjects = mapDriveObjects(files.newFilesForVersion, folder.id);

        async.parallel([
          function() {
            async.each(latestDriveObjects, drive.files.insert);
          },
          function() {
            async.each(versionDriveObjects, drive.files.insert)
          }
        ], function() {
          callback();
        });
      } else {
        gutil.log('No new files to upload.');
        callback();
      }
    }
  ], function(err) {
    if (err) throw err;
    cb();
  });
});

gulp.task('s3-cleanup', function(cb) {
  var s3Client = new AWS.S3();
  var params = {bucket: 'dashboard-syncano-rocks'};
  var pattern = /(.*)-[a-f0-9]{10}.*(\.[a-z0-9]{2,5})$/gi

  if (ENV === 'production') {
    params.bucket = 'dashboard-syncano-io'
  }

  listKeys(s3Client, params, function (err, keys) {
    if (err) throw err;

    // group keys
    var versionedKeys = _.reduce(keys, function(result, key) {
      var matches = pattern.exec(key.Key);
      if (matches) {
        var prefix = matches[1] + matches[2];
        key.timestamp = moment(key.LastModified).unix();
        result[prefix] = result[prefix] || [];
        result[prefix].push(key);
      }
      return result;
    }, {});

    // filter keys
    var keysToDelete = _.reduce(versionedKeys, function(result, keys, prefix) {
      if (keys.length > 3) {
        var toDelete = _.pluck(_.sortBy(keys, 'timestamp'), 'Key');
        return result.concat(_.map(toDelete.slice(0, toDelete.length-3), function(key) {
          return {Key: key};
        }));
      }
      return result;
    }, []);

    if (keysToDelete.length === 0) {
      return cb();
    }

    s3Client.deleteObjects({
      Bucket: params.bucket,
      Delete: {Objects: keysToDelete}
    }, function(err, data) {
      if (err) throw err;
      _.forEach(data, function(keys, type) {
        _.forEach(keys, function(key) {
          gutil.log(gutil.colors.red('[' + type + ']'), key.Key);
        });
      });
      cb();
    });
  });

});

gulp.task('copy', ['copy:index', 'copy:images', 'copy:css', 'copy:fonts', 'copy:js']);
gulp.task('serve', ['webpack-dev-server']);
gulp.task('build', ['webpack:build', 'revreplace']);
gulp.task('default', ['webpack-dev-server']);
gulp.task('deployment-master', gulpSequence(
  'check-github-tag',
  'publish',
  'clean',
  'add-github-tag',
  'changelog',
  's3-cleanup'
));
gulp.task('deployment-devel', gulpSequence('publish', 'clean', 's3-cleanup'));
