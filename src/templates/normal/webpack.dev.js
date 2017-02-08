var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.config.js');

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  watch: true
});
