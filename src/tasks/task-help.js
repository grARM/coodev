var _ = require('underscore');
var argHelp = require('../../config/arg-map.js').argHelp;
var helplogStr = 'command:';
_.each(argHelp, function (v_arg, k_arg) {
	helplogStr += '\n coodev ' + k_arg + ' : ' + v_arg; 
});

exports.render = function(){
	console.log(helplogStr);
};