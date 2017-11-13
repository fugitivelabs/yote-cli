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
  if(checkMobile) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" A Mobile Resource by that name already exists.  Skip this step."));
    return;
  }

  console.log(chalk.cyan("     Creating Mobile Resource called " + name));

  let replacements = {
    name, camelName, PascalName, allCaps, lowercase, kebabName, actionCase
  }
  console.log(chalk.dim("     DIR", __dirname));

  utils.mkdir(mobilePath, () => {
    // actions, reducers, and styles first
    utils.write(mobilePath + '/' + camelName + 'Actions.js'
      , utils.readTemplateAndReplace(__dirname, '/mobile/actions.js' , replacements));
    utils.write(mobilePath + '/' + camelName + 'Reducers.js'
      , utils.readTemplateAndReplace(__dirname, '/mobile/reducers.js' , replacements));
    utils.write(mobilePath + '/' + camelName + 'Styles.js'
      , utils.readTemplateAndReplace(__dirname, '/mobile/styles.js' , replacements));
    utils.write(mobilePath + '/' + PascalName + 'Navigator.js'
      , utils.readTemplateAndReplace(__dirname, '/mobile/navigator.js' , replacements));

    // now components
    utils.mkdir(mobilePath + '/components', () => {
      // list
      utils.write(mobilePath + '/components/' + PascalName + 'List.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/List.js' , replacements));
      // listItem
      utils.write(mobilePath + '/components/' + PascalName + 'ListItem.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/ListItem.js' , replacements));
    })
    // now views
    utils.mkdir(mobilePath + '/views', () => {
      // create
      utils.write(mobilePath + '/views/Create' + PascalName + '.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/views/Create.js' , replacements));
      // root
      utils.write(mobilePath + '/views/' + PascalName + 'Root.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/views/Root.js' , replacements));
      // single
      utils.write(mobilePath + '/views/Single' + PascalName + '.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/views/Single.js' , replacements));
      // update
      utils.write(mobilePath + '/views/Update' + PascalName + '.js'
        , utils.readTemplateAndReplace(__dirname, '/mobile/views/Update.js' , replacements));
    })
  })

  // now integrate into application
  var reducersRef = "\nexport { default as " + camelName + " } from './" + camelName + "/" + camelName + "Reducers.js';"
  utils.append("./mobile/"+mobileProjectName+"/js/modules/moduleReducers.js", reducersRef);

  var navigatorsRef = "\nexport { default as " + PascalName + "Navigator } from './" + camelName + "/" + PascalName + "Navigator';"
  utils.append("./mobile/"+mobileProjectName+"/js/modules/moduleNavigators.js", navigatorsRef);

  console.log(chalk.magenta("     Finished creating Mobile Resource."));

}
