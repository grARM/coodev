var _ = require('underscore');
var argInfo = {
	'init': {
		'render': function(){return require('../src/tasks/task-init.js');},
		'help': '初始化项目文件夹'
	},
	'dev': {
		'render': function(){return require('../src/tasks/task-dev.js');},
		'help': '以开发模式启动coodev 即时编译 不压缩'
	},
	'start': {
		'render': function(){return require('../src/tasks/task-server.js');},
		'help': '本地server调试'
	},
	'build': {
		'render': function(){return require('../src/tasks/task-build.js');},
		'help': '以生产模式启动coodev 编译一次 压缩'
	},
	'publish': {
		'render': function(){return require('../src/tasks/task-publish.js');},
		'help': '提交到发布仓库'
	},
	'version': {
		'render': function(){return require('../src/tasks/task-version.js');},
		'help': '查看 coodev 版本号'
	},
	'-v': {
		'render': function(){return require('../src/tasks/task-version.js');},
		'help': '查看 coodev 版本号'
	},
	'-help': {
		'render': function(){return require('../src/tasks/task-help.js');},
		'help': '查看 coodev 命令集'
	}
}

var argMap = _.mapObject(argInfo, function (argItem) {
	return argItem.render;
});
var argHelp = _.mapObject(argInfo, function (argItem) {
	return argItem.help;
});

// var argMap = {
// 	'init': function(){return require('../src/tasks/task-init.js');},
// 	'dev': function(){return require('../src/tasks/task-dev.js');},
// 	'start': function(){return require('../src/tasks/task-server.js');},
// 	'build': function(){return require('../src/tasks/task-build.js');},
// 	'publish': function(){return require('../src/tasks/task-publish.js');},
// 	'version': function(){return require('../src/tasks/task-version.js');},
// 	'-v': function(){return require('../src/tasks/task-version.js');},
// 	'-help': function(){return require('../src/tasks/task-help.js');}
// };

exports.argMap = argMap;
exports.argHelp = argHelp;