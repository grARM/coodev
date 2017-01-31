#!/usr/bin/env node

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author  @grarm
*/
var path = require('path');
var _ = require('underscore');
// var webpack = require('webpack');
var argMap = require('./config/arg-map.js').argMap;

// console.log("coodev 运行的妥妥的");

var arguments = process.argv.splice(2);

// console.log("arguments:", arguments, "  argMap: ", argMap);

_.each(arguments, function (v_arg, i_arg){
	// console.log("i_arg: ", i_arg, "  ,v_arg: ", v_arg, "   ,argMap[v_arg]: ", argMap[v_arg]);
	if (!!argMap[v_arg]) {
		argMap[v_arg]().render();
	}
});
