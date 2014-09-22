"use strict";

var        fs   = require('fs'),
        shell   = require('shelljs'),
        chalk   = require('chalk');

var  resource   = {};

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelCase(str) {
  str = str.toLowerCase();
  var parts = str.split(/[\-_ \s]/);
  str = null;
  for (var i = 0; i < parts.length; i++) {
    str = (str ? str + capitaliseFirstLetter(parts[i]) : parts[i]);
  }
  return str;
}



function buildScaffold() {

}

exports.yoteResource = function(name, options) {
  var camelName = camelCase(name);

  resource = {
    resourceName: name.toLowerCase()
    , name: camelName
  }

  buildScaffold();
}