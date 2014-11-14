"use strict";

var        fs   = require('fs'),
        shell   = require('shelljs'),
        chalk   = require('chalk');

var  resource   = {};

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

function buildNgClient() {
  console.log(chalk.cyan("Attempting to create a client called " + name + " for Yote version " + resource.version));


  var name = resource.name;
  var v = 'v_' + getYoteVersion();


  var clientPath = "./public/app/" + name;
  var checkClient = checkIfExists(clientPath);

  

  if(checkClient) {
    
    console.log(chalk.red("ERROR:  A client resource called " + name + " already exists. Please rename and try again."));
  
  } else {



    mkdir(clientPath, function() {
      mkdir(clientPath + '/stylesheets');
      mkdir(clientPath + '/templates', function(){
        write(clientPath + '/templates/list.jade', readTemplate(v + '/client/views/list.jade'));
        write(clientPath + '/templates/show.jade', readTemplate(v + '/client/views/show.jade'));
        write(clientPath + '/templates/create.jade', readTemplate(v + '/client/views/create.jade'));
        write(clientPath + '/templates/edit.jade', readTemplate(v + '/client/views/edit.jade'));
      });
      write(clientPath + '/' + name + '-styles.scss', readTemplate(v + '/client/page.scss'));
      write(clientPath + '/' + name + '-routes.js', readTemplate(v + '/client/ui-routes.js'));
      write(clientPath + '/' + name + '-factory.js', readTemplate(v + '/client/ui-factory.js'));
      write(clientPath + '/' + name + '-ctrl.js', readTemplate(v + '/client/ui-controllers.js'));
    });

    var newReference = "\nscript(src=";
    
    var serviceSrc = "'/app/"+ name + "/" + name + "-factory.js')";
    append("./server/views/includes/ng-services.jade", newReference + serviceSrc);

    var controllerSrc = "'/app/" + name + '/' + name + "-ctrl.js')";
    append("./server/views/includes/ng-controllers.jade", newReference + controllerSrc);

    var routeSrc = "'/app/" + name + '/' + name + "-routes.js')";
    append("./server/views/includes/ng-routes.jade", newReference + routeSrc);

  }

  
}



exports.yoteClient = function(name, options) {
  var camelName = camelCase(name);
  var Proper = capitaliseFirstLetter(camelName);
  var allCaps = name.toUpperCase();

  resource = {
    resourceName: name.toLowerCase()
    , name: camelName
    , Proper: Proper
    , allCaps: allCaps
    , version: getYoteVersion()
  }

  buildNgClient();
}