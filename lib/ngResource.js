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

function mkdir(path, fn) {
  shell.mkdir('-p', path);
  shell.chmod(755, path);
  console.log(chalk.cyan('   create:'), path);
  if (fn) fn();
}


function buildNgResource() {
  console.log(chalk.green("creating an angular resource"));
  console.log("working");
  var name = resource.name;
  console.log(name);
  var viewPath = "./public/app/views/" + name;
  mkdir(viewPath);
}



exports.yoteResource = function(name, options) {
  var camelName = camelCase(name);

  resource = {
    resourceName: name.toLowerCase()
    , name: camelName
  }

  buildNgResource();
}