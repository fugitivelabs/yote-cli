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
  console.log(chalk.cyan('   create directory: '), path);
  if (fn) fn();
}

function append(path, str) {
  fs.appendFile(path, str);
  console.log(chalk.magenta('   appending file: '), path);
}

function write(path, str) {
  fs.writeFile(path, str);
  console.log(chalk.cyan('   create file: '), path);
}

function readTemplate(path) {
  var template = fs.readFileSync(__dirname + '/templates/' + path, 'utf8');
  for (var key in resource) {
    template = template.split('__' + key + '__').join(resource[key]);
  }
  return template;
}

function buildNgResource() {
  console.log("working");
  var name = resource.name;
  console.log(chalk.green("creating an angular resource for " + name));

  // Build sample views
  var viewPath = "./public/app/views/" + name;
  mkdir(viewPath, function() {
    write(viewPath + '/index.jade', readTemplate('client/views/index.jade'));
    write(viewPath + '/show.jade', readTemplate('client/views/show.jade'));
  });

  // Build basic routing to sample views
  var routePath = "./public/app/ui-routes";
  mkdir(routePath, function() {
    write(routePath + '/' + name + '-routes.js', readTemplate('client/ui-routes.js'));
  });

  // Build default resource controllers
  var controllerPath = "./public/app/controllers";
  mkdir(controllerPath, function(){
    write(controllerPath + '/' + name + '-controllers.js', readTemplate('client/ui-controllers.js'));
  });

  // Build simple service that returns sample json data
  var servicesPath = "./public/app/services";
  mkdir(servicesPath, function(){
    write(servicesPath + '/' + name + '-service.js', readTemplate('client/ui-service.js'));
  });

  var newReference = "\nscript(src=";
  
  var serviceSrc = "'/app/services/" + name + "-service.js')";
  append("./server/views/ng-services.jade", newReference + serviceSrc);

  var controllerSrc = "'/app/controllers/" + name + "-controllers.js')";
  append("./server/views/ng-controllers.jade", newReference + controllerSrc);

  var routeSrc = "'/app/ui-routes/" + name + "-routes.js')";
  append("./server/views/ng-routes.jade", newReference + routeSrc);
}



exports.yoteResource = function(name, options) {
  var camelName = camelCase(name);
  var pronoun = capitaliseFirstLetter(camelName);
  var allCaps = name.toUpperCase();

  resource = {
    resourceName: name.toLowerCase()
    , name: camelName
    , pronoun: pronoun
    , allCaps: allCaps
  }

  buildNgResource();
}