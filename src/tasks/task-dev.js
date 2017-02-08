var path = require("path"); 
var fs = require('fs');
var webpack = require('webpack');
var ora = require('ora');

var _ = require('underscore');
var ROOT_PATH = path.resolve(__dirname);
var proPath = process.cwd();
var coodevConfigPath = path.resolve(proPath, './coodev.config.json');
var spinnerStart = ora('now is building all the project for the first time...');
var spinnerChange = ora('watching for file change ...');


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
		spinnerStart.start();
		var webpackConfig = require(path.resolve(proPath, './webpack.dev.js'));
		// spinnerStart.start();
		// webpack(_.extend({'watch': true}, webpackConfig), function (err, stats){
		webpack(webpackConfig, function (err, stats){
			spinnerStart.stop();
			spinnerChange.stop();
			if(err){
				console.log('err: ', err);
			}
			console.log('dev is working for file change at ' + (new Date()));
			setTimeout(function(){
				spinnerChange.start();
			}, 500);
			spinnerChange.start();
		});
	}
}

task.init();

exports.render = function(){
	task.renderWebpack();
};