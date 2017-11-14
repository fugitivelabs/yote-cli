"use strict";

let fs = require('fs');
let shell = require('shelljs');
let chalk = require('chalk');
let utils = require('../../tools/utils');

module.exports = function(resourceName) {
  // init strings
  const name = utils.getNormalizedName(resourceName);
  const camelName = utils.camelCase(name);
  const PascalName = utils.capitalizeFirstLetter(camelName);
  const allCaps = name.toUpperCase();
  const lowercase = name.toLowerCase();
  const kebabName = utils.kebabCase(name);
  const actionCase = utils.actionCase(name);
  const mobileProjectName = utils.getYoteMobileProjectName();

  var mobilePath = "./mobile/"+mobileProjectName+"/js/modules/" + camelName;
  var checkMobile = utils.checkIfExists(mobilePath);
  if(!checkMobile) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red("  Unable to find a Mobile Resource by that name.  Skip this step."));
    return;
  }

  console.log(chalk.cyan("     Removing Mobile Resource called " + name));

  let replacements = {
    name, camelName, PascalName, allCaps, lowercase, kebabName, actionCase
  }
  console.log(chalk.dim("     DIR", __dirname));

  utils.rmDir(mobilePath)

  // now integrate into application
  var reducersRef = "\nexport { default as " + camelName + " } from './" + camelName + "/" + camelName + "Reducers.js';"
  utils.replaceInFile("./mobile/"+mobileProjectName+"/js/modules/moduleReducers.js", reducersRef, "");

  var navigatorsRef = "\nexport { default as " + PascalName + "Navigator } from './" + camelName + "/" + PascalName + "Navigator';"
  utils.replaceInFile("./mobile/"+mobileProjectName+"/js/modules/moduleNavigators.js", navigatorsRef, ""); 

  console.log(chalk.magenta("     Finished creating Mobile Resource."));

}
