"use strict";

var fs = require('fs')
  , shell = require('shelljs')
  , chalk = require('chalk')
  , utils = require('../../tools/utils')
  ;

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

  var serverPath = "./server/resources/" + camelName;
  var checkServer = utils.checkIfExists(serverPath);

  //now remove from application

  /**
   * NOTE: The following block is NOT working for some reason...
   *
   * the line that says replace 'mongoose' with 'squirrel' works, but the other
   * two do not.
   *
   * need @grant's input
   */

  // ---- start non-working block -----
  // var newApiReference = "routeFilenames.push('" + camelName + "/" + camelNamePlural + "Api');";
  // // NOTE: ^ shell.sed() doesn't read this as a string

  var newApiReference = `routeFilenames.push('${camelName}/${camelNamePlural}Api')`;
  // NOTE: ^ shell.sed() doesn't read this as a string

  // var newApiReference = `'${camelName}/${camelNamePlural}Api'`;
  // // NOTE: ^ this works, output will be routeFilenames.push();

  // var newApiReference = `('${camelName}/${camelNamePlural}Api')`;
  // // NOTE: ^ wrapped in () -- this KIND OF works, output will STILL be routeFilenames.push();

  // var newApiReference = `('${camelName}/${camelNamePlural}Api');`;
  // // NOTE: ^ added ';' -- this does NOT work at all


  console.log(newApiReference)
  // utils.replaceInFile("./server/global/routing/api-router.js", 'mongoose', "squirrel");
  utils.replaceInFile("./server/global/routing/api-router.js", newApiReference, "");

  var newDbReference  = "let " + PascalName + " = require('./resources/" + camelName + "/" + PascalName + "Model');";
  console.log(newDbReference);
  utils.replaceInFile("./server/db.js", newDbReference, "");

  // ---- end non-working block -----


  if(!checkServer) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" Unable to find a Server Resource by that name. Skip this step."));
    return;
  }

  console.log(chalk.cyan("     Remove Server Resource called " + name));

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
  //server only has 3 core files: Model, controller, and api
  utils.rmDir(serverPath)

  console.log(chalk.magenta("     Finished creating Server Resource."));

}
