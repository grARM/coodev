var path = require('path')
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.js');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH);
var BUILD_PATH = path.resolve(ROOT_PATH, './dist');
var modifiedDate = +(new Date());

var webpackConfig = merge(baseWebpackConfig, {
  devtool: false,
  output: {
    path: path.resolve(ROOT_PATH, './dist/resource/scripts/'),
    filename: '[name].min.js',
    chunkFilename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin('This file is modified at:' + modifiedDate)
  ]
});

module.exports = webpackConfig;