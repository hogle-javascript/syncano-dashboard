var webpack = require('webpack'),
    config  = Object.create(require('./common'));

config.module.postLoaders = [{
  test: /\.js(|x)?$/,
  exclude: /(test|node_modules)\//,
  loader: 'istanbul-instrumenter'
}];

module.exports = config;
