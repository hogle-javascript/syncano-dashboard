var gulp             = require('gulp'),
    gutil            = require('gulp-util'),
    rev              = require('gulp-rev'),
    revReplace       = require('gulp-rev-replace'),
    stripDebug       = require('gulp-strip-debug'),
    cloudfront       = require('gulp-cloudfront'),
    del              = require('del'),
    path             = require('path'),
    download         = require('gulp-download'),
    unzip            = require('gulp-unzip'),
    chmod            = require('gulp-chmod'),
    webpack          = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfig    = require('./webpack.config.js'),
    awspublish       = require('gulp-awspublish'),
    iconfont         = require('gulp-iconfont'),
    iconfontCss      = require('gulp-iconfont-css'),
    ENV              = process.env.NODE_ENV || 'development';

var paths = {
  dist: './dist',
  bin: './bin',
  assets: './src/assets',
  index: './src/assets/index.html',
  images: './src/assets/img/**/*'
};

gulp.task('clean', function(cb) {
  del(['./dist/**/*', paths.dist], cb);
});

gulp.task('copy-index', ['clean'], function() {
  return gulp.src(paths.index)
  .pipe(gulp.dest(paths.dist))
});

gulp.task('copy-images', ['clean'], function() {
  return gulp.src(paths.images)
  .pipe(gulp.dest('dist/img'));
});

var fontName = 'Syncano Icons';

gulp.task('iconfont', ['clean'], function(cb) {
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
    .pipe(gulp.dest(paths.dist + '/fonts/icons/'))
    .on('finish', function() {
      cb();
    });
});

gulp.task('webpack:build', ['clean', 'copy', 'iconfont'], function(callback) {
  var config     = Object.create(webpackConfig);
  config.devtool = 'sourcemap';
  config.debug   = true;

  if (ENV == 'production') {
    config.progress = false;
    config.debug    = false;
    config.plugins  = config.plugins.concat(
          new webpack.DefinePlugin({
            'process.env': {
              // This has effect on the react lib size
              'NODE_ENV': JSON.stringify('production')
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
      );
  }

  // run webpack
  webpack(config).run(callback);
});

gulp.task('webpack-dev-server', ['clean', 'copy', 'iconfont'], function() {
  var config = Object.create(webpackConfig);
  config.devtool = 'eval';
  config.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(config), {
    publicPath: '/js/',
    contentBase: paths.dist,
    https: true,
    hot: true,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'https://localhost:8080/');
  });
});

gulp.task('stripDebug', ['clean', 'webpack:build'], function() {
  gulp.src('./dist/js/app.js')
    .pipe(stripDebug())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('revision', ['clean', 'iconfont', 'webpack:build', 'stripDebug'], function() {
  return gulp.src([
      './dist/**/*',
      '!./dist/index.html'
    ])
    .pipe(rev())
    .pipe(gulp.dest(paths.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.dist))
});

gulp.task('revreplace', ['clean', 'webpack:build', 'revision', 'clean:unrevisioned'], function() {
  return gulp.src('./dist/**/*')
    .pipe(revReplace({
      manifest: gulp.src('./' + paths.dist + '/rev-manifest.json')
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

gulp.task('revision:index', ['clean', 'iconfont', 'clean:unrevisioned', 'revreplace'], function() {
  return gulp.src('./dist/index.html')
    .pipe(rev())
    .pipe(gulp.dest(paths.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.dist))
});

gulp.task('publish', ['clean', 'iconfont', 'build', 'revision:index'], function() {

  var aws = {
    region: 'eu-west-1',
    distributionId: 'E10VUXJJFKD7D3',
    params: {Bucket: 'syncano-gui-staging'},
    patternIndex: /^\/index-[a-f0-9]{10}\.html(\.gz)*$/gi
  };

  if (ENV === 'production') {
    aws.params.Bucket  = 'admin-syncano-io';
    aws.distributionId = 'E3GVWH8UCCSHQ7';
  }

  var publisher = awspublish.create(aws);

  return gulp.src([
      './dist/**/*',
      '!./dist/rev-manifest.json'
    ])
    .pipe(awspublish.gzip())
    .pipe(publisher.publish())
    .pipe(awspublish.reporter())
    .pipe(cloudfront(aws));
});

var chromedriverTypes = [
  'linux64',
  'linux32',
  'mac32',
  'win32'
];

chromedriverTypes.map(function(type) {
  gulp.task('nightwatch-setup:' + type, function(cb) {
    var zipFiles = paths.bin + '/**/*.zip',
        urls     = [
          'http://selenium-release.storage.googleapis.com/2.46/selenium-server-standalone-2.46.0.jar',
          'http://chromedriver.storage.googleapis.com/2.16/chromedriver_' + type + '.zip'
        ];

    download(urls)
      .pipe(gulp.dest(paths.bin))
      .on('finish', function() {
        gulp.src(zipFiles)
          .pipe(unzip())
          .pipe(gulp.dest(paths.bin))
          .on('finish', function() {
            gulp.src(paths.bin + '/chromedriver')
              .pipe(chmod({
                owner: {read: true, write: true, execute: true},
                group: {execute: true},
                others: {execute: true}
              }))
              .pipe(gulp.dest(paths.bin))
              .on('finish', function() {
                del(zipFiles, cb);
              });
          });
      });
  });
});

gulp.task('copy', ['copy-index', 'copy-images']);
gulp.task('serve', ['webpack-dev-server']);
gulp.task('build', ['webpack:build', 'iconfont', 'revreplace']);
gulp.task('default', ['webpack-dev-server']);
