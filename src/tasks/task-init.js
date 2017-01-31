var fs = require('fs');
var task = {
	'checkdir': function(){
		console.log('checkdir,ok');
	},
	'createdir': function(){
		console.log('createdir,ok');
	}
};

exports.render = function(){
	task.createdir();
};