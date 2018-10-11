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

  var clientPath = "./web/resources/" + camelName;
  var checkClient = utils.checkIfExists(clientPath);

  //now remove from application
  var sassRef = '@import "resources/' + camelName + "/" + camelName + 'GlobalStyles";';
  utils.replaceInFile("./web/config/yote.scss", sassRef, "");

  var routesRef = "export { default as " + camelNamePlural + " } from '../resources/" + camelName + "/" + PascalName + "Router.js.jsx';"
  utils.replaceInFile("./web/config/resourceRoutes.js", routesRef, "");

  var adminRoutesRef = "export { default as " + camelNamePlural + " } from '../resources/" + camelName + "/admin/" + PascalName + "AdminRouter.js.jsx';"
  console.log(adminRoutesRef)
  utils.replaceInFile("./web/config/adminResourceRoutes.js", adminRoutesRef, "");

  var reducersRef = "export { default as " + camelName + " } from '../resources/" + camelName + "/" + camelName + "Reducers.js';"
  utils.replaceInFile("./web/config/resourceReducers.js", reducersRef, "");


  if(!checkClient) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" Unable to find Web Resource by that name. Cancelling..."));
    return;
  }

  console.log(chalk.cyan("     Remove Web Resource called " + name));

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


  console.log(chalk.magenta("     Finished removing Web Resource."));

}
