var webpack = require('webpack'),
    config  = require('./common');

config.plugins = config.plugins.concat(
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.DefinePlugin({SYNCANO_BASE_URL: "'https://api.syncano.rocks/'"})
);

module.exports = config;
