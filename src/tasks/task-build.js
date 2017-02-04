var path = require("path"); 
var fs = require('fs');
var buf = new Buffer(1024);
var webpack = require('webpack');

var _ = require('underscore');
var ROOT_PATH = path.resolve(__dirname);
var proPath = process.cwd();
var coodevConfigPath = path.resolve(proPath, './coodev.config.json');
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
	'readPageInfo': function(){
		var self = this;
		var coodevConfig = require(coodevConfigPath);
		// console.log('coodevConfig: ', coodevConfig);
		self.pages = ([]).concat(coodevConfig.pages);
		_.each(coodevConfig.pages, function (v, i){
			var pageConfigPath = path.resolve(proPath, './page-config/' + v + '.json')
			console.log('this page is : ', v, 'config path is : ', pageConfigPath);
			var pageConfig = require(pageConfigPath);
			console.log('this page config is : ', pageConfig);
			self.pageInfos[v] = pageConfig;
			//self.renderPage(v, pageConfig);
		});
	},//,
	renderPage: function(pName, pInfo) {
		var layoutPath = path.resolve(proPath, './src/layout/' + pInfo['layout-temp'] + '/layout.html');
		fs.open(layoutPath, 'r+', function(err, fd) {
		   if (err) {
		       return console.error(err);
		   }
		   // console.log("文件打开成功！");
		   // console.log("准备读取文件：");
		   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
		      if (err){
		         console.log(err);
		      }
		      // console.log(bytes + "  字节被读取");
		      
		      // 仅输出读取的字节
		      if(bytes > 0){
		      	var pageTemp = buf.slice(0, bytes).toString()
		        console.log('pageTemp: ', pageTemp);
		        var pageHtml = _.template(pageTemp, pInfo['layout-set']);
				/*write to file*/
				console.log('pageHtml: ', pageHtml);
				
				fs.writeFile(path.resolve(proPath, './dist/pages/' + pName + '.html'), pageHtml, function (err){
					if (!!err) {
						console.log('file: ' + pName + '.html 写入失败！');
					} else{
						console.log('file: ' + pName + '.html 写入成功！');

					}
				});
		      }
		   });
		});

		// var pageTemp = require(path.resolve(proPath, './src/layout/' + pInfo['layout-temp'] + '/layout.html'));
		

		// var pageHtml = _.template(pageTemp, pInfo['layout-set']);
		// /*write to file*/
		// console.log('pageHtml: ', pageHtml);
		
		// fs.writeFile(path.resolve(proPath, './dist/pages/' + pName + '.html'), pageHtml, function (err){
		// 	if (!!err) {
		// 		console.log('file: ' + pName + '.html 写入失败！');
		// 	} else{
		// 		console.log('file: ' + pName + '.html 写入成功！');

		// 	}
		// });

	},
	renderWebpack: function () {
		var webpackConfig = require('../../webpack.config.js');
		// process.exec('webpack', function (error, stdout, stderr){
		// 	if(error !== null){
		// 		console.log('exec error: ', error);
		// 	}
		// });
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
	// task.createdir();
	//task.readPageInfo();
	task.renderWebpack();
};
