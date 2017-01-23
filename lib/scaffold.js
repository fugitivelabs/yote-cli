"use strict";

var fs = require('fs')
    , shell = require('shelljs')
    , chalk = require('chalk')
    ;

var resource = {};

function getYoteVersion() {
  console.log("trying to get Yote version");
  try {
    var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    console.log(pkg.version);
    return pkg.version;
  } catch(e) {
    //file didn't exist, return version 0 - catch for the error
    return "0.6.0"; //default to latest version, should probably store this as a variable somewhere
  }
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
    template = template.split('__' + key + '__').join(resource[key]); //Now this is a quality line.
  }
  return template;
}

function buildScaffold() {
  console.log(chalk.cyan("Attempting to create a scaffold called " + name + " for Yote-react version " + resource.version));


  var name = resource.name;
  var Proper = resource.Proper;
  var v = 'v_' + resource.version;


  var clientPath = "./client/modules/" + name;
  var checkClient = checkIfExists(clientPath);

  var modelPath       = "./server/models/" + Proper + ".js";
  var controllerPath  = "./server/controllers/" + name + "s.js";
  var apiPath         = "./server/router/api/" + name + "-api.js";
  
  var checkModel      = checkIfExists(modelPath);
  var checkController = checkIfExists(controllerPath);
  var checkApi        = checkIfExists(apiPath);

  console.log(chalk.yellow("Checking to make sure the client path is clear for " + name + " ... "));

  if(checkClient) {
    
    console.log(chalk.red("ERROR:  A client REACT resource called " + name + " already exists. Skipping for now and trying the API."));
  
  } else {

    console.log(chalk.green("Path is clear. Building the " + name + " client. "));

    mkdir(clientPath, function() {
      //actions file
      write(clientPath + '/' + name + 'Actions.js', readTemplate(v + '/client/actions.js'));
      mkdir(clientPath + '/components', function() {
        write(clientPath + '/components/Create' + resource.Proper + '.js.jsx', readTemplate(v + '/client/components/Create.js.jsx'));
        write(clientPath + '/components/' + resource.Proper + 'Form.js.jsx', readTemplate(v + '/client/components/Form.js.jsx'));
        write(clientPath + '/components/' + resource.Proper + 'Layout.js.jsx', readTemplate(v + '/client/components/Layout.js.jsx'));
        write(clientPath + '/components/' + resource.Proper + 'List.js.jsx', readTemplate(v + '/client/components/List.js.jsx'));
        write(clientPath + '/components/' + resource.Proper + 'ListItem.js.jsx', readTemplate(v + '/client/components/ListItem.js.jsx'));
        write(clientPath + '/components/Single' + resource.Proper + '.js.jsx', readTemplate(v + '/client/components/Single.js.jsx'));
        write(clientPath + '/components/Update' + resource.Proper + '.js.jsx', readTemplate(v + '/client/components/Update.js.jsx'));
      })
      console.log("debug 1");
      write(clientPath + '/' + name + 'Reducers.js', readTemplate(v + '/client/reducer.js'));
      write(clientPath + '/' + name + 'Routes.js.jsx', readTemplate(v + '/client/routes.js.jsx'));
      write(clientPath + '/' + name + 'Styles.scss', readTemplate(v + '/client/styles.scss'));
    });

    var sassRef = "\n@import 'modules/" + name + "/" + name + "Styles';";
    append("./client/yote.scss", sassRef);

    var routesRef = "\nexport { default as " + name + " } from './" + name + "/" + name + "Routes.js.jsx';"
    append("./client/modules/moduleRoutes.js", routesRef);

    var reducersRef = "\nexport { default as " + name + " } from './" + name + "/" + name + "Reducers.js';"
    append("./client/modules/moduleReducers.js", reducersRef);
  }

  console.log(chalk.yellow("Checking to make sure the server-side path is clear for " + name + " ... "));

  if(checkModel) {
    console.log(chalk.red("ERROR:  A model called " + Proper + ".js already exists. Please rename and try again."));
  } else if(checkController) {
    console.log(chalk.red("ERROR:  A controller called " + name + "s.js already exists. Please rename and try again."));
  } else if(checkApi) {
    console.log(chalk.red("ERROR:  An API called " + name + "-api.js already exists. Please rename and try again."));
  } else {
    console.log(chalk.green("Path is clear. Building the " + name + " API "));

    write(modelPath, readTemplate(v + '/api/server-models.js'));
    write(controllerPath, readTemplate(v + '/api/server-controllers.js'));
    write(apiPath, readTemplate(v + '/api/api-routes.js'));

    var newApiReference = "\nrouteFilenames.push('" + name + "-api');";
    append("./server/router/api-router.js", newApiReference);

    var newDbReference  = "\nvar " + Proper + " = require('./models/" + Proper + "');";
    append("./server/db.js", newDbReference);

  }

  
}



exports.yoteScaffold = function(name, options) {
  var camelName = camelCase(name);
  var Proper = capitaliseFirstLetter(camelName);
  var allCaps = name.toUpperCase();
  var lowercase = name.toLowerCase();

  resource = {
    resourceName: name
    , lowercase: lowercase
    , name: camelName
    , Proper: Proper
    , allCaps: allCaps
    , version: getYoteVersion()
  }

  buildScaffold();
}