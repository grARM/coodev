var path = require("path"); 
var static = require('node-static');
var http = require('http');
var ora = require('ora');

var ROOT_PATH = path.resolve(__dirname);
var proPath = process.cwd();

var spinnerStart = ora('Server is start ...');

var task = {
	'render': function(){
		var file = new static.Server(path.resolve(proPath, './dist/'));
		http.createServer(function (request, response) {
			
			request.addListener('end', function(){
				file.serve(request, response);
				console.log('request end');
			}).resume();
			spinnerStart.start();
		}).listen(8080);
		
	}
}

exports.render = function(){
	task.render();
};