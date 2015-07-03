var webpack = require('webpack'),
    config  = require('./common');

config.module.postLoaders = [{
  test: /\.js(|x)?$/,
  exclude: /(test|node_modules)\//,
  loader: 'istanbul-instrumenter'
}];

module.exports = config;
