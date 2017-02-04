var path = require('path');
var copyDirs = require('../lib/copy-file.js').copyDir;
var ROOT_PATH = path.resolve(__dirname);
// var APP_PATH = path.resolve(ROOT_PATH);
// var BUILD_PATH = path.resolve(ROOT_PATH, './bin');
var proPath = process.cwd();
var templatePath = path.resolve(ROOT_PATH, '../templates');
var templatePathLocal = path.resolve(proPath, '../coodev-temp-normal/normal/');


var fs = require('fs');
var task = {
	'checkdir': function(cb){
		// console.log('checkdir,ok');
		fs.exists(path.resolve(proPath, './src/'), function (exists){
			cb && cb(exists);
		});
	},
	'createdir': function(cb){
		// console.log('path:', path.resolve(proPath, './src/'));
		// fs.mkdir(path.resolve(proPath, './src/'), function(){
		// 	console.log('./src/,ok');
		// });
		// fs.mkdir(path.resolve(proPath, './dist/'), function(){
		// 	console.log('./dist/,ok');
		// });
		// copyDirs(path.resolve(templatePath, './normal/'), proPath, function (err){
		copyDirs(templatePathLocal, proPath, function (err){
			if (!!err) {
				console.log('err: ', err);
			}
		});
	},
	creatDist: function(){
		fs.mkdir(path.resolve(proPath, './dist/'), function(){
			//console.log('./dist/,ok');
		});
	}
};

exports.render = function(){
	// task.createdir();
	task.checkdir(function(exists){
		if(exists){
			console.log("this project had init!");
		}else{
			task.createdir();
			task.creatDist();
		}
	})
};