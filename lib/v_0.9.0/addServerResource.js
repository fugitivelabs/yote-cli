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
  if(checkServer) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" A Server Resource by that name already exists.  Skip this step."));
    return;
  }

  console.log(chalk.cyan("     Creating Server Resource called " + name));

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
  utils.mkdir(serverPath, () => {
    utils.write(serverPath + '/' + PascalName + 'Model.js'
      , utils.readTemplateAndReplace(__dirname, '/server/Model.js' , replacements));
    utils.write(serverPath + '/' + camelNamePlural + 'Api.js'
      , utils.readTemplateAndReplace(__dirname, '/server/api.js' , replacements));
    utils.write(serverPath + '/' + camelNamePlural + 'Controller.js' //only one we add an "s" too
      , utils.readTemplateAndReplace(__dirname, '/server/controller.js' , replacements));
  })

  //now integrate into application
  var newApiReference = "\nrouteFilenames.push('" + camelName + "/" + camelNamePlural + "Api');";
  utils.append("./server/global/routing/api-router.js", newApiReference);

  var newDbReference  = "\nlet " + PascalName + " = require('./resources/" + camelName + "/" + PascalName + "Model');";
  utils.append("./server/db.js", newDbReference);

  console.log(chalk.magenta("     Finished creating Server Resource."));

}
