var gulp             = require('gulp'),
    fs               = require('fs'),
    path             = require('path'),
    async            = require('async'),
    gutil            = require('gulp-util'),
    git              = require('gulp-git'),
    rev              = require('gulp-rev'),
    revReplace       = require('gulp-rev-replace'),
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
    ENV              = process.env.NODE_ENV || 'development';

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
    .pipe(gulp.dest(paths.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('revreplace', ['clean', 'webpack:build', 'revision'], function() {
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

// gulp.task('clean:unrevisioned', ['clean', 'webpack:build', 'revision'], function(cb) {
//   var manifest = require('./' + paths.dist + '/rev-manifest.json'),
//       delPaths = Object.keys(manifest).map(function(path) {
//         return paths.dist + '/' + path;
//       });

//   del(delPaths, cb);
// });

gulp.task('revision:index', ['clean', 'revreplace'], function() {
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

gulp.task('add-github-tag', function(cb) {
  var version = 'v' + require('./package.json').version;

  async.series([
    function (callback) {
      git.exec({args: 'config --global user.email \"ci@circleci.com\"'}, callback);
    },

    function (callback) {
      git.exec({args: 'config --global user.name "CircleCI"'}, callback);
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

gulp.task('copy', ['copy:index', 'copy:images', 'copy:css', 'copy:fonts', 'copy:js']);
gulp.task('serve', ['webpack-dev-server']);
gulp.task('build', ['webpack:build', 'revreplace']);
gulp.task('default', ['webpack-dev-server']);
