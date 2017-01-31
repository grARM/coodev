var path = require('path');
var webpack = require('webpack');
//var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH);
var BUILD_PATH = path.resolve(ROOT_PATH, './bin');
// var NODE_PATH = path.resolve(__dirname, 'node_modules');
//todo: jslint

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: './index.js',
  //输出的文件名 合并以后的js会命名为adsfehomev1.js
  output: {
    path: BUILD_PATH,
    filename: 'index.js'
  }
  // ,
  // plugins: [
  //   new webpack.BannerPlugin('#!/usr/bin/env node')
  // ]
};