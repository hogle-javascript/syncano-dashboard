var webpack = require('webpack'),
    config  = require('./common');

config.cache   = true;
config.debug   = true;
config.devtool = 'eval';

config.entry.app.unshift(
  'webpack-dev-server/client?https://localhost:8080',
  'webpack/hot/only-dev-server'
);

config.module.loaders[1].loaders = [
  'react-hot',
  config.module.loaders[1].loader
]

delete config.module.loaders[1].loader

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({SYNCANO_BASE_URL: JSON.stringify('https://api.syncano.rocks/')})
);

config.devServer = {
  publicPath: '/js/',
  contentBase: './dist',
  https: true,
  hot: true,
  noInfo: false,
  stats: {
    colors: true
  }
}

module.exports = config;
