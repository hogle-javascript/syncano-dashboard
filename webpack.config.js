var webpack = require("webpack");

var PRODUCTION = JSON.parse(process.env.PRODUCTION || 'false');
var STAGING = JSON.parse(process.env.STAGING || 'false');
var DEVEL = JSON.parse(process.env.DEVEL || 'false');

var envPlugin = new webpack.DefinePlugin({
  __DEVEL__: DEVEL,
  __STAGING__: STAGING,
  __PRODUCTION__: PRODUCTION
});

var vendorPlugin = new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js");

module.exports = {
  entry: {
      app: './src/main.jsx',
      vendor: ["brace", 'react', 'moment'],
  },
  output: {
    path: './public/js/',
    filename: PRODUCTION || STAGING ? '[hash].bundle.js' : 'bundle.js',
  },
  plugins: [envPlugin, vendorPlugin],
  module: {
    loaders: [
      {test: /\.(svg)$/, loader: 'raw-loader'},
      {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'},
      {test: /\.styl/, loader: 'style-loader!stylus-loader!autoprefixer-loader?browsers=last 2 version'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.svg', '.styl']
  }
};
