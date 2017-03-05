var path = require('path');
var copyDirs = require('../lib/copy-file.js').copyDir;
var ROOT_PATH = path.resolve(__dirname);
var child_process = require('child_process');
var download = require('download-git-repo');
var inquirer = require('inquirer');
// var APP_PATH = path.resolve(ROOT_PATH);
// var BUILD_PATH = path.resolve(ROOT_PATH, './bin');
var proPath = process.cwd();
var templatePath = path.resolve(ROOT_PATH, '../templates');
// var templatePathLocal = path.resolve(proPath, '../coodev-temp-normal/normal/');
var templatePathLocal = path.resolve(templatePath, "./normal/");
var ora = require('ora');
var spinnerInit = ora('now is init our porject ...');
var tmplUrl = 'grARM/coodev-temp-normal';


/** get code from github */
var loadNormalTmpl = function(cb){
	download(tmplUrl, proPath, function (err) {
		if(err){
			console.log('err', err);
		}
		cb && cb(err);
	});
}

/****/

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
		loadNormalTmpl(function(){
			console.log('download templat ok');
			self.creatDist();
		});
		// copyDirs(templatePathLocal, proPath, function (err){
		// 	if (!!err) {
		// 		console.log('err: ', err);
		// 	}
		// 	self.creatDist();
		// });
	},
	creatDist: function(){
		var self = this;
		fs.mkdir(path.resolve(proPath, './dist/'), function(){
			spinnerInit.stop();
			console.log('dir creat success!');
			console.log('next install lib ...');
			self.installLib();
		});
	},
	installLib: function(){
		child_process.execSync('cd ' + proPath + ' && ' + 'cnpm install', function(){
			console.log('install ok');
		});
	}
};

exports.render = function(){
	inquirer.prompt([{
	    type: 'list',
	    message: 'which template do you need:',
	    name: 'template',
	    choices: ['normal', 'wap', 'h5']
	}]).then(function (answers) {
	  	if (answers.template == 'normal') {
			tmplUrl = 'grARM/coodev-temp-normal';
	    }

	    spinnerInit.start();
		task.checkdir(function(exists){
			if(exists){
				console.log("this project had init!");
			}else{
				task.createdir();
				//task.creatDist();
			}
		})

	})

	
};