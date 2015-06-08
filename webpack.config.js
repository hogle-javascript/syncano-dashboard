var ENV     = process.env.NODE_ENV || 'development',
    path    = require('path'),
    webpack = require('webpack'),
    compass = require('node-libcompass').includePaths;

module.exports = {
  // cache: true,
  entry: {
      app: ['webpack/hot/dev-server', path.join(__dirname, 'src', 'app.jsx')],
      vendor: ['brace', 'react', 'moment']
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: 'js/',
  },
  plugins: [
    new webpack.DefinePlugin({ENV: ENV}),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {test: /\.(svg)$/, loader: 'raw-loader'},
      {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
      {test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'},
      {test: /\.styl/, loader: 'style-loader!stylus-loader!autoprefixer-loader?browsers=last 2 version'},
      {
        test: /\.sass$/,
        loader: "style!css!sass?indentedSyntax&outputStyle=expanded&precision=8&" +
          "includePaths[]=" + compass + "&" +
          "includePaths[]=" +
          (path.resolve(__dirname, "./src/assets/sass")) + "&" +
          "includePaths[]=" +
          (path.resolve(__dirname, "./node_modules"))
      }
      //{test: /\.sass$/, loader: "style!css!sass?indentedSyntax&precision=6"}
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
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss', '.sass', '.svg', '.styl']
  }
};
