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

function buildNgClient() {
  console.log(chalk.cyan("Attempting to create a client called " + name + " for Yote version " + resource.version));


  var name = resource.name;
  var v = 'v_' + getYoteVersion();


  var clientPath = "./client/modules/" + name;
  var checkClient = checkIfExists(clientPath);

  

  if(checkClient) {
    
    console.log(chalk.red("ERROR:  A client REACT resource called " + name + " already exists. Please rename and try again."));
  
  } else {

    mkdir(clientPath, function() {
      mkdir(clientPath + '/actions', function() {
        write(clientPath + '/index.js', readTemplate(v + '/client/actions/index.js'));
        write(clientPath + '/' + name + 'ListActions.js', readTemplate(v + '/client/actions/listActions.js'));
        write(clientPath + '/' + name + 'SingleActions.js', readTemplate(v + '/client/actions/singleActions.js'));
      })
      mkdir(clientPath + '/components', function() {
        write(clientPath + '/components/Create' + resource.Proper + '.js.jsx', readTemplate(v + '/client/components/Create.js.jsx'));
        write(clientPath + '/components/' + resource.Proper + 'Form.js.jsx', readTemplate(v + '/client/components/Form.js.jsx'));
        write(clientPath + '/components/' + resource.Proper + 'Layout.js.jsx', readTemplate(v + '/client/components/Layout.js.jsx'));
        write(clientPath + '/components/' + resource.Proper + 'List.js.jsx', readTemplate(v + '/client/components/List.js.jsx'));
        write(clientPath + '/components/' + resource.Proper + 'ListItem.js.jsx', readTemplate(v + '/client/components/List.js.jsx'));
        write(clientPath + '/components/Single' + resource.Proper + '.js.jsx', readTemplate(v + '/client/components/ListItem.js.jsx'));
        write(clientPath + '/components/Update' + resource.Proper + '.js.jsx', readTemplate(v + '/client/components/Update.js.jsx'));
      })
      mkdir(clientPath + '/reducers', function() {
        write(clientPath + '/index.js', readTemplate(v + '/client/reducers/index.js'));
        write(clientPath + '/' + name + 'ListReducers.js', readTemplate(v + '/client/reducers/listReducers.js'));
        write(clientPath + '/' + name + 'SingleReducers.js', readTemplate(v + '/client/reducers/singleReducers.js'));
      })
      write(clientPath + '/' + name + 'Routes.js.jsx', readTemplate(v + '/client/routes.js.jsx'));
      write(clientPath + '/' + name + 'Styles.scss', readTemplate(v + '/client/styles.scss'));
    });

    var sassRef = "\n@import 'modules/" + name + "/" + name + "Styles';";
    append("./client/yote.scss", sassRef);

    var routesRef = "\nexport { default as " + name + " } from './" + name + "/" + name + "Routes.js.jsx';"
    append("./client/modules/moduleRoutes.js", routesRef);

    var reducersRef = "\nexport { default as " + name + " } from './" + name + "/reducers';"
    append("./client/modules/moduleReducers.js", reducersRef);

  }

  
}



exports.yoteClient = function(name, options) {
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

  buildNgClient();
}