var webpack = require('webpack'),
    config  = require('./common');

config.cache   = true;
config.debug   = true;
config.devtool = 'eval';

config.entry.app.unshift(
  'webpack-dev-server/client?https://localhost:8080',
  'webpack/hot/only-dev-server'
);

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);

config.devServer = {
  publicPath: '/js/',
  contentBase: './dist',
  https: true,
  hot: true,
  noInfo: true,
  stats: {
    colors: true
  }
}

module.exports = config;
