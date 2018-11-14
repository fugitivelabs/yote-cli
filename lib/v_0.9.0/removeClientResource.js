"use strict";

let fs = require('fs');
let shell = require('shelljs');
let chalk = require('chalk');
let utils = require('../../tools/utils');

module.exports = function(resourceName) {
  //init strings
  const name = utils.getNormalizedName(resourceName);
  const plural = utils.pluralize(name);
  const camelName = utils.camelCase(name);
  const camelNamePlural = utils.camelCase(plural);
  const PascalName = utils.capitalizeFirstLetter(name);
  const PascalNamePlural = utils.capitalizeFirstLetter(plural);
  const allCaps = utils.startCase(name).toUpperCase();
  const allCapsPlural = utils.startCase(plural).toUpperCase();
  const lowercase = utils.startCase(name).toLowerCase();
  const lowercasePlural = utils.startCase(plural).toLowerCase();
  const kebabName = utils.kebabCase(name);
  const kebabNamePlural = utils.kebabCase(plural);
  const actionCase = utils.actionCase(name);
  const actionCasePlural = utils.actionCase(plural);
  const startName = utils.startCase(name);

  var clientPath = "./client/modules/" + camelName;
  var checkClient = utils.checkIfExists(clientPath);
  if(!checkClient) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" Unable to find Client Resource by that name already. Cancelling..."));
    return;
  }

  console.log(chalk.cyan("     Remove Client Resource called " + name));

  let replacements = {
    name
    , plural
    , camelName
    , camelNamePlural
    , PascalName
    , PascalNamePlural
    , allCaps
    , allCapsPlural
    , lowercase
    , lowercasePlural
    , kebabName
    , kebabNamePlural
    , actionCase
    , actionCasePlural
    , startName
  }
  console.log(chalk.dim("     DIR", __dirname));

  utils.rmDir(clientPath);

  //now remove from application
  var sassRef = '\n@import "modules/' + camelName + "/" + camelName + 'GlobalStyles";';
  utils.replaceInFile("./client/yote.scss", sassRef, "");

  var routesRef = "\nexport { default as " + camelNamePlural + " } from './" + camelName + "/" + PascalName + "Router.js.jsx';"
  utils.replaceInFile("./client/modules/moduleRoutes.js", routesRef, "");

  var reducersRef = "\nexport { default as " + camelName + " } from './" + camelName + "/" + camelName + "Reducers.js';"
  utils.replaceInFile("./client/modules/moduleReducers.js", reducersRef, "");

  console.log(chalk.magenta("     Finished removing Client Resource."));

}
