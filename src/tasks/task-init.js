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
		fs.exists(path.resolve(proPath, './src/'), function (exists){
			cb && cb(exists);
		});
	},
	'createdir': function(cb){
		var self = this;
		loadNormalTmpl(function(){
			console.log('download templat ok');
			self.creatDist();
			cb && cb();
		});
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

function velocityChange(){
	var configPath = path.resolve(proPath, './coodev.config.json');
	var indexPagePath = path.resolve(proPath, './src/pages/index.html');
	var listPagePath = path.resolve(proPath, './src/pages/list.html');

	var confStr = fs.readFileSync(path.resolve(proPath, './velocity-example/coodev.config.json'), 'UTF-8');
	var indexHtml = fs.readFileSync(path.resolve(proPath, './velocity-example/index.html'), 'UTF-8');
	var listHtml = fs.readFileSync(path.resolve(proPath, './velocity-example/list.html'), 'UTF-8');
	fs.writeFileSync(configPath, confStr, 'utf8');
	fs.writeFileSync(indexPagePath, indexHtml, 'utf8');
	fs.writeFileSync(listPagePath, listHtml, 'utf8');
}

exports.render = function(){
	inquirer.prompt([{
	    type: 'list',
	    message: 'which template do you need:',
	    name: 'template',
	    choices: ['normal', 'wap', 'h5']
	},{
	    type: 'list',
	    message: 'which tpl language do you need:',
	    name: 'tpllanguage',
	    choices: ['els', 'velocity']
	}]).then(function (answers) {
	  	if (answers.template == 'normal') {
			tmplUrl = 'grARM/coodev-temp-normal';
	    }else{
	    	console.log('目前只发布了 normal 模板');
	    	return;
	    }

	    spinnerInit.start();
		task.checkdir(function(exists){
			if(exists){
				console.log("this project had init!");
			}else{
				task.createdir(function(){
					if(answers.tpllanguage == 'velocity'){
						velocityChange();
					}
				});
				//task.creatDist();
				
			}
		})
	})	
};