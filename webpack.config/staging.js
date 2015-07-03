var webpack = require('webpack'),
    config  = Object.create(require('./common'));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'));

module.exports = config;
