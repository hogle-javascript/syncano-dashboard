var ENV     = process.env.NODE_ENV || 'development',
    path    = require('path'),
    webpack = require('webpack');


module.exports = {
  // cache: true,
  entry: {
      app: path.join(__dirname, 'src', 'app.jsx'),
      vendor: ['brace', 'react', 'moment'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: 'js/',
  },
  plugins: [
    new webpack.DefinePlugin({ENV: ENV}),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],
  module: {
    loaders: [
      {test: /\.(svg)$/, loader: 'raw-loader'},
      {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'},
      {test: /\.styl/, loader: 'style-loader!stylus-loader!autoprefixer-loader?browsers=last 2 version'},
      // // required to write "require('./style.css')"
      // { test: /\.css$/,    loader: "style-loader!css-loader" },

      // // required for bootstrap icons
      // { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
      // { test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
      // { test: /\.eot$/,    loader: "file-loader?prefix=font/" },
      // { test: /\.svg$/,    loader: "file-loader?prefix=font/" },

      // // required for react jsx
      // { test: /\.js$/,    loader: "jsx-loader" },
      // { test: /\.jsx$/,   loader: "jsx-loader?insertPragma=React.DOM" },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.svg', '.styl']
  }
};
