var ENV        = process.env.NODE_ENV || 'development',
    path       = require('path'),
    webpack    = require('webpack'),
    compass    = require('node-libcompass').includePaths,
    pluginVars = ['FACEBOOK_ID', 'GOOGLE_ID', 'GITHUB_ID', 'OAUTH_PROXY_URL', 'SENTRY_DSN'],
    plugin     = {ENV: JSON.stringify(ENV)};


// We want to check env variables like this: DEVELOPMENT_FACEBOOK_ID or FACEBOOK_ID or null
for (i = 0; i < pluginVars.length; i++) {
    var name    = pluginVars[i],
        envName = ENV.toUpperCase() + '_' + name;
    plugin[name] = JSON.stringify(process.env[envName] || process.env[name] || '');
}

var plugins = [
  new webpack.DefinePlugin(plugin),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
];

var appEntry = [
  path.join(__dirname, 'src', 'app.jsx')
];

if (ENV === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  appEntry.push('webpack/hot/dev-server')
}

module.exports = {
  // cache: true,
  entry: {
      app: appEntry,
      vendor: ['brace', 'react', 'moment', 'raven-js', 'material-ui']
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: 'js/',
  },
  plugins: plugins,
  module: {
    loaders: [
      {test: /\.(svg)$/, loader: 'raw-loader'},
      {test: /\.js(|x)$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'},
      {test: /\.styl/, loader: 'style-loader!stylus-loader!autoprefixer-loader?browsers=last 2 version'},
      {
        test: /\.sass$/,
        loader: "style!css!sass?indentedSyntax&outputStyle=expanded&precision=8&" +
          "includePaths[]=" + compass + "&" +
          "includePaths[]=" +
          (path.resolve(__dirname, "./src/assets/sass")) + "&" +
          "includePaths[]=" +
          (path.resolve(__dirname, "./node_modules"))
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss', '.sass', '.svg', '.styl']
  }
};
