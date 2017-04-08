var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var chokidar = require('chokidar');
var template = require('../lib/template.js');

var ROOT_PATH = path.resolve(__dirname); // coodev path
var proPath = process.cwd(); //project path
var srcPath = path.resolve(proPath, './src');

var coodevConfigPath = path.resolve(proPath, './coodev.config.json');
var coodevConfig = require(coodevConfigPath);
var proServerRenderLng = coodevConfig['server-render-language'] || 'ejs';
var tmplFn = template[proServerRenderLng];

var pageEntryMap = {};
var pageHtmlList = [];

/* render pages  */
function renderPageDatas(){
	_.each(coodevConfig.pages, function (v, i) {
		var pageConfig = require(path.resolve(proPath, './page-config/' + v + '.json'));
		pageEntryMap[v] = path.resolve(proPath, pageConfig['entry-js']);
		/**/
		var layoutContent = {}
		_.each(pageConfig.layout, function (v, k) {
			var data = {};
			if(_.isObject(v.data)){
			  data = _.extend({}, v.data);
			} else if(_.isString(v.data)){
			  if(v.data !== ''){
			    data = require(path.resolve(proPath, v.data));
			  }
			}

			var tempStr = fs.readFileSync(path.resolve(proPath, v.temp), 'UTF-8');
			// var tempFun = _.template(tempStr);
			// layoutContent[k] = tempFun(data);
			layoutContent[k] = tmplFn(tempStr, data);
		});
		var html = {
		  filename: (path.resolve(proPath, './dist/pages/' + v + '.html')),
		  template: fs.readFileSync(path.resolve(proPath, './src/pages/' + v + '.html'), 'UTF-8'),
		  inject: true,
		  chunks: [v],
		  title: pageConfig.data.title,
		  layout: layoutContent
		};

		pageHtmlList.push(html);
	});

}

function initDir(){
	var distPath = path.resolve(proPath, './dist/');
	if(!fs.existsSync(distPath)){
		fs.mkdirSync(distPath);
		console.log('now has create dist dir');
	}
	var pagePath = path.resolve(distPath, './pages/');
	if(!fs.existsSync(pagePath)){
		fs.mkdirSync(pagePath);
		console.log('now has create page dir');
	}
}

function buildPages(pageHtmlList){
	// _.each(pageHtmlList, function (vPage, iPage){
	// });
	var pageDirPath = path.resolve(proPath, './dist/pages/');
	//console.log('pageHtmlList: ', pageHtmlList)
	pageHtmlList.forEach(function (page) {
		var pagePath = page.filename;//path.resolve(pageDirPath, './' + page.filename + '.html');
		
		// var pageTplFn = _.template(page.template);
		//var pageTplFn = tmplFn(page.template);
		// fs.writeFileSync(pagePath, pageTplFn(page), 'utf8');
		fs.writeFileSync(pagePath, tmplFn(page.template, page), 'utf8');
	});
}

function watchHtmlTask(){
	chokidar.watch([srcPath + '/**/*.html', srcPath + '/**/*.json'], {}).on('change', function (path, stats){
		renderPageDatas();
		buildPages(pageHtmlList);
		if (stats) console.log('File '+path+' changed size to '+stats.size);
	});
}

exports.initPage = function(){
	initDir();
	renderPageDatas();
	buildPages(pageHtmlList);
};

exports.addPage = function(){

};

exports.watchPage = function(){
	watchHtmlTask();
};

