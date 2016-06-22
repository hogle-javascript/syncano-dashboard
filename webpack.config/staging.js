var webpack = require('webpack'),
    config  = require('./common');

config.devtool = 'source-map';
config.plugins = config.plugins.concat(
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
  new webpack.DefinePlugin({SYNCANO_BASE_URL: "'https://api.syncano.rocks/'"}),
  new webpack.DefinePlugin({SYNCANO_DEMO_APPS_SCRIPT_ENDPOINT: "'https://api.syncano.rocks/v1/instances/example-apps/endpoints/scripts/p/06f2eb44d5e8d9ec2a6afff987122ec2b02d79e8/getexampleapps/'"})
);

module.exports = config;
