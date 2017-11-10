"use strict";

let fs = require('fs');
let shell = require('shelljs');
let chalk = require('chalk');
let utils = require('../../tools/utils');

module.exports = function(resourceName) {
  //init strings
  const name = utils.getNormalizedName(resourceName);
  const camelName = utils.camelCase(name);
  const PascalName = utils.capitalizeFirstLetter(camelName);
  const allCaps = name.toUpperCase();
  const lowercase = name.toLowerCase();
  const kebabName = utils.kebabCase(name);
  const actionCase = utils.actionCase(name);

  var clientPath = "./client/modules/" + camelName;
  var checkClient = utils.checkIfExists(clientPath);
  if(!checkClient) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" Unable to find Client Resource by that name already. Cancelling..."));
    return;
  }

  console.log(chalk.cyan("     Remove Client Resource called " + name));

  let replacements = {
    name, camelName, PascalName, allCaps, lowercase, kebabName, actionCase
  }
  console.log(chalk.dim("     DIR", __dirname));

  utils.rmDir(clientPath);

  //now remove from application
  var sassRef = '\n@import "modules/' + camelName + "/" + camelName + 'GlobalStyles";';
  utils.replaceInFile("./client/yote.scss", sassRef, "");

  var routesRef = "\nexport { default as " + camelName + " } from './" + camelName + "/" + PascalName + "Router.js.jsx';"
  utils.replaceInFile("./client/modules/moduleRoutes.js", routesRef, "");

  var reducersRef = "\nexport { default as " + camelName + " } from './" + camelName + "/" + camelName + "Reducers.js';"
  utils.replaceInFile("./client/modules/moduleReducers.js", reducersRef, "");

  console.log(chalk.magenta("     Finished removing Client Resource."));

}
