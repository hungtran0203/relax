/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var optimize = webpack.optimize;

var webpackConfig = module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'cheap-module-source-map',
  resolve: {
    root: path.join(__dirname, '..', '..'),
    alias: {
      root_lib: 'lib',
      modules: 'lib/modules',
      shared_components: 'lib/shared/screens/admin/shared/components'
    },
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(css|less)$/,
        loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less'
      }
    ]
  }
};
