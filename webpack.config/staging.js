var webpack = require('webpack'),
    config  = require('./common');

config.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'));
config.plugins.push(new webpack.DefinePlugin({SYNCANO_BASE_URL: JSON.stringify('https://api.syncano.rocks/')}));

module.exports = config;
