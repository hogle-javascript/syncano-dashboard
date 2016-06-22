var webpack = require('webpack'),
    config  = require('./common');

config.bail     = true;
config.debug    = false;
config.profile  = false;
config.devtool  = 'source-map';
config.progress = false;
config.plugins  = config.plugins.concat(
  new webpack.DefinePlugin({SYNCANO_BASE_URL: "'https://api.syncano.io/'"}),
  new webpack.DefinePlugin({SYNCANO_DEMO_APPS_SCRIPT_ENDPOINT: "'https://api.syncano.io/v1.1/instances/example-apps/endpoints/scripts/p/322f68921537dd4c655e0c22d7404569d4fc1f2e/getexampleapps/'"}),
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      drop_console: true,
      drop_debugger: true
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity})
);

module.exports = config;
