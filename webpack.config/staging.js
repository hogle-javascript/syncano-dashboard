var webpack = require('webpack'),
    config  = require('./common');

config.devtool = 'source-map';
config.plugins = config.plugins.concat(
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.DefinePlugin({SYNCANO_BASE_URL: "'https://api.syncano.rocks/'"}),
  new webpack.DefinePlugin({SYNCANO_DEMO_APPS_ACCOUNT_KEY: "'f983d5db8d3faf7743bc21d9cabf03794caaa02a'"})
);

module.exports = config;
