#!/usr/bin/env node

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author  @grarm
*/
// var path = require('path');
// var _ = require('underscore');
var program = require('commander');
var chalk = require('chalk');


program
    .version(require('./package').version)
    .option('-i, --init', '初始化项目文件夹')
    .option('-d, --dev', '以开发模式启动coodev 即时编译 不压缩')
    .option('-b, --build', '以生产模式启动coodev 编译一次 压缩')
    .option('-s, --server', '本地server调试')
    .option('-p, --publish', '提交到发布仓库')
    .parse(process.argv);

/** init */
if (program.init) {
	require('./src/tasks/task-init.js').render();
}

/** dev */
if (program.dev) {
	require('./src/tasks/task-dev.js').render();
}

/** build */
if (program.build) {
	require('./src/tasks/task-build.js').render();
}

/** start server */
if (program.server) {
	require('./src/tasks/task-server.js').render();
}

/** publish */
if (program.publish) {
	require('./src/tasks/task-publish.js').render();
}

program.on('--help', function () {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project with an official template'))
  console.log('    $ coodev --init')
  console.log()
  console.log(chalk.gray('    # develop project'))
  console.log('    $ coodev --dev')
  console.log()
  console.log(chalk.gray('    # start local server'))
  console.log('    $ coodev --server')
  console.log()
})

