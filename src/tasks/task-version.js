var packageJson = require('../../package.json');
var versionCode = packageJson.version;


exports.render = function(){
	console.log('coodev version is: v' + versionCode);
};