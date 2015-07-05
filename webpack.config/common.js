var ENV         = process.env.NODE_ENV || 'development',
    path        = require('path'),
    webpack     = require('webpack'),
    compass     = require('node-libcompass').includePaths,
    envVars     = ['FACEBOOK_ID', 'GOOGLE_ID', 'GITHUB_ID', 'OAUTH_PROXY_URL', 'SENTRY_DSN', 'ANALYTICS_WRITE_KEY'],
    plugin      = {ENV: JSON.stringify(ENV)},
    packageJson = require('../package.json');


// We want to check env variables like this: DEVELOPMENT_FACEBOOK_ID or FACEBOOK_ID or null
for (var i = 0; i < envVars.length; i++) {
    var name    = envVars[i],
        envName = ENV.toUpperCase() + '_' + name;
    plugin[name] = JSON.stringify(process.env[envName] || process.env[name] || '');
}

module.exports = {
  target: 'web',
  entry: {
      app: [path.resolve(__dirname, '../src/app.jsx')],
      vendor: Object.keys(packageJson.dependencies)
  },
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: 'js/',
  },
  plugins: [
    new webpack.DefinePlugin(plugin)
  ],
  module: {
    loaders: [
      {test: /\.(svg)$/, loader: 'raw-loader'},
      {test: /\.js(|x)$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'},
      {test: /\.styl/, loader: 'style-loader!stylus-loader!autoprefixer-loader?browsers=last 2 version'},
      {
        test: /\.sass$/,
        loader: "style!css!sass?sourceMap&indentedSyntax&outputStyle=expanded&precision=8&" +
          "includePaths[]=" + compass + "&" +
          "includePaths[]=" +
          (path.resolve(__dirname, "../src/assets/sass")) + "&" +
          "includePaths[]=" +
          (path.resolve(__dirname, "../node_modules"))
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss', '.sass', '.svg', '.styl']
  },
  externals: {
    'analytics': 'analytics'
  }
};