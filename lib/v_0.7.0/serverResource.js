"use strict";

var fs = require('fs')
  , shell = require('shelljs')
  , chalk = require('chalk')
  , utils = require('../../tools/utils')
  ;

module.exports = function(resourceName) {
  //init strings
  const name = utils.getNormalizedName(resourceName);
  const camelName = utils.camelCase(name);
  const Proper = utils.capitaliseFirstLetter(camelName);
  const allCaps = name.toUpperCase();
  const lowercase = name.toLowerCase();

  var serverPath = "./server/resources/" + name;
  var checkServer = utils.checkIfExists(serverPath);
  if(checkServer) {
    console.log("RESOURCE BY THAT NAME ALREADY EXISTS");
    return;
  }

  console.log("Creating Server resource called " + name);

  let replacements = {
    name, camelName, Proper, allCaps, lowercase
  }
  console.log("DIR", __dirname);
  //server only has 3 core files: Model, controller, and api
  utils.mkdir(serverPath, () => {
    utils.write(serverPath + '/' + Proper + 'Model.js'
      , utils.readTemplateAndReplace(__dirname, '/server/Model.js' , replacements));
    utils.write(serverPath + '/' + camelName + 'Api.js'
      , utils.readTemplateAndReplace(__dirname, '/server/api.js' , replacements));
    utils.write(serverPath + '/' + camelName + 'sController.js' //only one we add an "s" too
      , utils.readTemplateAndReplace(__dirname, '/server/controller.js' , replacements));
  })

  //now integrate into application
  var newApiReference = "\nrouteFilenames.push('" + resourceName + "/" + camelName + "Api');";
  utils.append("./server/router/api-router.js", newApiReference);

  var newDbReference  = "\nvar " + Proper + " = require('./resources/" + name + "/" + Proper + "Model');";
  utils.append("./server/db.js", newDbReference);

  console.log("Done creating Server Resource.");

}