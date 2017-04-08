var path = require("path"); 
var static = require('node-static');
var http = require('http');
var ora = require('ora');

var ROOT_PATH = path.resolve(__dirname);
var proPath = process.cwd();
var coodevConfigPath = path.resolve(proPath, './coodev.config.json');
var coodevConfig = require(coodevConfigPath);

var spinnerStart = ora('Server is start ...');

var port = coodevConfig['server-port'] || 8080;

var task = {
	'render': function(){
		console.log('Server is ready at ', port);
		var file = new static.Server(path.resolve(proPath, './dist/'));
		http.createServer(function (request, response) {
			spinnerStart.start();
			request.addListener('end', function(){
				file.serve(request, response);
				console.log('request end');
			}).resume();
		}).listen(port);
	}
}

exports.render = function(){
	task.render();
};