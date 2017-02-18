var argMap = {
	'init': function(){return require('../src/tasks/task-init.js');},
	'dev': function(){return require('../src/tasks/task-dev.js');},
	'start': function(){return require('../src/tasks/task-server.js');},
	'build': function(){return require('../src/tasks/task-build.js');},
	'publish': function(){return require('../src/tasks/task-publish.js');}
};

exports.argMap = argMap;