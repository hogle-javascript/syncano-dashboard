var webpack = require('webpack'),
    config  = require('./common');

config.plugins.push(
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
);

module.exports = config;
