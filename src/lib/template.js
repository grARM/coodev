var Velocity = require('velocityjs');
var _ = require('underscore');


exports.ejs = function(tmpl, data){
	var tmplFn = _.template(tmpl);
	return tmplFn(data);
}

exports.velocity = function(tmpl, data){
	var html = Velocity.render(tmpl, data);
	return html.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}



