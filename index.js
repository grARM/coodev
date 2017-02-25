#!/usr/bin/env node

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author  @grarm
*/
var path = require('path');
var _ = require('underscore');

var argMap = require('./config/arg-map.js').argMap;


var arguments = process.argv.splice(2);


_.each(arguments, function (v_arg, i_arg){
	if (!!argMap[v_arg]) {
		argMap[v_arg]().render();
	}
});
