var path = require('path');
var webpack = require('webpack');
var _ = require('underscore');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH);
var BUILD_PATH = path.resolve(ROOT_PATH, './dist');

var coodevConfigPath = path.resolve(ROOT_PATH, './coodev.config.json');
var coodevConfig = require(coodevConfigPath);

var webpackEntry = {};
var webpackHtml = [];

_.each(coodevConfig.pages, function (v, i) {
  var pageConfig = require(path.resolve(ROOT_PATH, './page-config/' + v + '.json'));
  webpackEntry[v] = path.resolve(ROOT_PATH, pageConfig['entry-js']);
  /**/
  var layoutContent = {}
  _.each(pageConfig.layout, function (v, k) {
    var data = {};
    if(_.isObject(v.data)){
      data = _.extend({}, v.data);
    } else if(_.isString(v.data)){
      if(v.data !== ''){
        data = require(path.resolve(ROOT_PATH, v.data));
      }
    }
    
    var tempStr = fs.readFileSync(path.resolve(ROOT_PATH, v.temp), 'UTF-8');
    var tempFun = _.template(tempStr);
    layoutContent[k] = tempFun(data);
  });
  /**/
  var html = new HtmlWebpackPlugin({
      filename: (path.resolve(ROOT_PATH, './dist/pages/' + v + '.html')),
      template: (path.resolve(ROOT_PATH, './src/pages/' + v + '.html')),
      inject: true,
      chunks: [v],
      title: pageConfig.data.title,
      layout: layoutContent
  });
  webpackHtml.push(html);
});

var extractCSS = new ExtractTextPlugin("../styles/[name].css");
module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: webpackEntry,
  output: {
    path: path.resolve(ROOT_PATH, './dist/resource/scripts/'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  externals:{
    jquery: "jQuery"
  },
  module: {
    loaders: [
      {
        test : /\.(less|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      }
    ]
  },
  plugins: ([
    extractCSS
  ]).concat(webpackHtml)
};