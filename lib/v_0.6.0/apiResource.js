"use strict";

var fs = require('fs')
    , shell = require('shelljs')
    , chalk = require('chalk')
    ;

var resource = {};

function getYoteVersion() {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  console.log(pkg.version);
  return pkg.version;
}

function checkIfExists(path) {
  var exists = fs.existsSync(path);
  return exists;
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelCase(str) {
  if(str.indexOf('-') > -1) {
    str = str.toLowerCase();
    var parts = str.split(/[\-_ \s]/);
    str = null;
    for (var i = 0; i < parts.length; i++) {
      str = (str ? str + capitaliseFirstLetter(parts[i]) : parts[i]);
    }
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



function buildApiResource() {
  console.log(chalk.cyan("Attempting to create an API called " + name + " for Yote version " + resource.version));

  var name = resource.name;
  var Proper = resource.Proper;
  var v = 'v_' + resource.version;

  var modelPath       = "./server/models/" + Proper + ".js";
  var controllerPath  = "./server/controllers/" + name + "s.js";
  var apiPath         = "./server/router/api/" + name + "-api.js";
  
  var checkModel      = checkIfExists(modelPath);
  var checkController = checkIfExists(controllerPath);
  var checkApi        = checkIfExists(apiPath);


  if(checkModel) {
    console.log(chalk.red("ERROR:  A model called " + Proper + ".js already exists. Please rename and try again."));
  } else if(checkController) {
    console.log(chalk.red("ERROR:  A controller called " + name + "s.js already exists. Please rename and try again."));
  } else if(checkApi) {
    console.log(chalk.red("ERROR:  An API called " + name + "-api.js already exists. Please rename and try again."));
  } else {

    write(modelPath, readTemplate(v + '/api/server-models.js'));
    write(controllerPath, readTemplate(v + '/api/server-controllers.js'));
    write(apiPath, readTemplate(v + '/api/api-routes.js'));

    var newApiReference = "\nrouteFilenames.push('" + name + "-api');";
    append("./server/router/api-router.js", newApiReference);

    var newDbReference  = "\nvar " + Proper + " = require('./models/" + Proper + "');";
    append("./server/db.js", newDbReference);

  }

}



exports.yoteApi = function(name, options) {
  var camelName = camelCase(name);
  var Proper    = capitaliseFirstLetter(camelName);
  var allCaps   = name.toUpperCase();
  var lowercase = name.toLowerCase();

  resource = {
    resourceName: name
    , lowercase: lowercase
    , name: camelName
    , Proper: Proper
    , allCaps: allCaps
    , version: getYoteVersion()
  }

  buildApiResource();
}