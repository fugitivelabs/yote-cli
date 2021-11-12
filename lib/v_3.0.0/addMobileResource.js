"use strict";

let fs = require('fs');
let shell = require('shelljs');
let chalk = require('chalk');
let utils = require('../../tools/utils');

module.exports = function(resourceName, options) {
  // init strings
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
  const mobileProjectName = utils.getYoteMobileProjectName();

  var mobilePath = "./mobile/"+mobileProjectName+"/js/resources/" + camelName;
  var checkMobile = utils.checkIfExists(mobilePath);
  if(checkMobile) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" A Mobile Resource by that name already exists.  Skip this step."));
    return;
  }

  console.log(chalk.cyan("     Creating Mobile Resource called " + name));

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

  utils.mkdir(mobilePath, () => {
    // service and store first
    utils.write(mobilePath + '/' + camelName + 'Service.js'
      , utils.readTemplateAndReplace(__dirname, '/mobile/service.js' , replacements));
    utils.write(mobilePath + '/' + camelName + 'Store.js'
      , utils.readTemplateAndReplace(__dirname, '/mobile/store.js' , replacements));
    // now components
    utils.mkdir(mobilePath + '/components', () => {
      // form
      utils.write(mobilePath + '/components/' + PascalName + 'Form.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/Form.js' , replacements));
      // list
      utils.write(mobilePath + '/components/' + PascalName + 'List.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/List.js' , replacements));
      // listItem
      utils.write(mobilePath + '/components/' + PascalName + 'ListItem.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/ListItem.js' , replacements));
      // root
      utils.write(mobilePath + '/components/' + PascalName + 'Layout.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/Layout.js' , replacements));
    })
    // now views
    utils.mkdir(mobilePath + '/views', () => {
      // create
      utils.write(mobilePath + '/views/Create' + PascalName + '.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/views/Create.js' , replacements));
      // single
      utils.write(mobilePath + '/views/Single' + PascalName + '.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/views/Single.js' , replacements));
      // update
      utils.write(mobilePath + '/views/Update' + PascalName + '.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/views/Update.js' , replacements));
    })
  })

  // now integrate into application
  var reducersRef = "\nexport { default as " + camelName + " } from '../resources/" + camelName + "/" + camelName + "Store.js';"
  utils.append(`./mobile/${mobileProjectName}/js/config/resourceReducers.js`, reducersRef);

  console.log(chalk.magenta("     Finished creating Mobile Resource."));

}
