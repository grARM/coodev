var path = require('path');
var copyDirs = require('../lib/copy-file.js').copyDir;
var ROOT_PATH = path.resolve(__dirname);
// var APP_PATH = path.resolve(ROOT_PATH);
// var BUILD_PATH = path.resolve(ROOT_PATH, './bin');
var proPath = process.cwd();
var templatePath = path.resolve(ROOT_PATH, '../templates');
// var templatePathLocal = path.resolve(proPath, '../coodev-temp-normal/normal/');
var templatePathLocal = path.resolve(templatePath, "./normal/");
var ora = require('ora');
var spinnerInit = ora('now is init our porject ...');

var fs = require('fs');
var task = {
	'checkdir': function(cb){
		// console.log('checkdir,ok');
		fs.exists(path.resolve(proPath, './src/'), function (exists){
			cb && cb(exists);
		});
	},
	'createdir': function(cb){
		var self = this;

		copyDirs(templatePathLocal, proPath, function (err){
			if (!!err) {
				console.log('err: ', err);
			}
			self.creatDist();
		});
	},
	creatDist: function(){
		fs.mkdir(path.resolve(proPath, './dist/'), function(){
			spinnerInit.stop();
		});
	}
};

exports.render = function(){
	spinnerInit.start();
	task.checkdir(function(exists){
		if(exists){
			console.log("this project had init!");
		}else{
			task.createdir();
			//task.creatDist();
		}
	})
};