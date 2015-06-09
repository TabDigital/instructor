// Webpack configuration
// =====================

var path = require('path');
var webpack = require('webpack');

module.exports = {
  contentBase: __dirname + '/public',
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:4567',
    'webpack/hot/dev-server',
    './src/boot'
  ],
  output: {
    pathInfo: true,
    path: __dirname + '/public/',
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader?optional=runtime']
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loaders: ['json-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css!autoprefixer!ruby-sass?requires[]=sass-globbing'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
