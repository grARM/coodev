var path = require("path"); 
var fs = require('fs');
var webpack = require('webpack');

var _ = require('underscore');
var ROOT_PATH = path.resolve(__dirname);
var proPath = process.cwd();
var coodevConfigPath = path.resolve(proPath, './coodev.config.json');
//var webpackConfigPath = path.resolve(proPath, './webpack.config.js');
// var pagePath = path.resolve(proPath, './coodev.config.json');

var task = {
	'pages': [],
	'pageInfos': {},
	'init': function(){
		console.log('task build ok! ');
		fs.exists(path.resolve(proPath, './dist/pages/'), function (exists){
			if (!exists) {
				fs.mkdir(path.resolve(proPath, './dist/pages/'), function(){
					
				});
			}
		});
	},
	renderWebpack: function () {
		var webpackConfig = require(path.resolve(proPath, './webpack.prod.js'));
		webpack(webpackConfig, function (err, stats){
			if(err){
				console.log('err: ', err);
			}
			console.log('build is ok!');

		});
	}
}

task.init();

exports.render = function(){
	task.renderWebpack();
};
