var path = require('path');
var webpack = require('webpack');
var _ = require('underscore');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin')
//var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH);
var BUILD_PATH = path.resolve(ROOT_PATH, './bin');

var proPath = process.cwd();
var coodevConfigPath = path.resolve(proPath, './coodev.config.json');
var coodevConfig = require(coodevConfigPath);

var webpackEntry = {};
var webpackHtml = [];

_.each(coodevConfig.pages, function (v, i) {
  var pageConfig = require(path.resolve(proPath, './page-config/' + v + '.json'));
  webpackEntry[v] = path.resolve(proPath, pageConfig['entry-js']);
  /**/
  var layoutContent = {}
  _.each(pageConfig.layout, function (v, k) {
    var data = {};
    if(v.data !== ''){
      data = require(path.resolve(proPath, v.data));
    }
    var tempStr = fs.readFileSync(path.resolve(proPath, v.temp), 'UTF-8');
    var tempFun = _.template(tempStr);
    layoutContent[k] = tempFun(data);
  });
  /**/
  var html = new HtmlWebpackPlugin({
      filename: (path.resolve(proPath, './dist/pages/' + v + '.html')),
      template: (path.resolve(proPath, './src/pages/' + v + '.html')),
      inject: true,
      chunks: [v],
      title: pageConfig.data.title,
      layout: layoutContent
  });
  webpackHtml.push(html);
});

// var NODE_PATH = path.resolve(__dirname, 'node_modules');
//todo: jslint

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: webpackEntry,
  output: {
    path: path.resolve(proPath, './dist/resource/scripts/'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  externals:{
    jquery: "jQuery"
  },
  plugins: ([]).concat(webpackHtml)
  // ,
  // plugins: [
  //   new webpack.BannerPlugin('#!/usr/bin/env node')
  // ]
};