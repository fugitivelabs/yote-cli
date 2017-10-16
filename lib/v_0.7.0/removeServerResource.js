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
  const PascalName = utils.capitalizeFirstLetter(camelName);
  const allCaps = name.toUpperCase();
  const lowercase = name.toLowerCase();
  const kebabName = utils.kebabCase(resourceName);

  var serverPath = "./server/resources/" + camelName;
  var checkServer = utils.checkIfExists(serverPath);
  if(!checkServer) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" Unable to find a Server Resource by that name. Skip this step."));
    return;
  }

  console.log(chalk.cyan("     Remove Server Resource called " + name));

  let replacements = {
    name, camelName, PascalName, allCaps, lowercase, kebabName
  }
  console.log(chalk.dim("     DIR", __dirname));
  //server only has 3 core files: Model, controller, and api
  utils.rmDir(serverPath)

  //now integrate into application
  var newApiReference = "\nrouteFilenames.push('" + camelName + "/" + camelName + "Api');";
  utils.replaceInFile("./server/router/api-router.js", newApiReference, "");

  var newDbReference  = "\nlet " + PascalName + " = require('./resources/" + camelName + "/" + PascalName + "Model');";
  utils.replaceInFile("./server/db.js", newDbReference, "");

  console.log(chalk.magenta("     Finished creating Server Resource."));

}
