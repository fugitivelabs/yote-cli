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
    utils.write(mobilePath + '/' + camelName + 'Styles.scss'
      , utils.readTemplateAndReplace(__dirname, '/mobile/styles.scss' , replacements));
    // now components
    utils.mkdir(mobilePath + '/components', () => {
      // create
      utils.write(mobilePath + '/components/Create' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/Create.js.jsx' , replacements));
      // layout
      utils.write(mobilePath + '/components/' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/Layout.js.jsx' , replacements));
      // list
      utils.write(mobilePath + '/components/' + PascalName + 'List.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/List.js.jsx' , replacements));
      // listItem
      utils.write(mobilePath + '/components/' + PascalName + 'ListItem.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/ListItem.js.jsx' , replacements));
      // single
      utils.write(mobilePath + '/components/Single' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/Single.js.jsx' , replacements));
      // update
      utils.write(mobilePath + '/components/Update' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/mobile/components/Update.js.jsx' , replacements));
    })
  })

  // now integrate into application
  var reducersRef = "\nexport { default as " + camelName + " } from './" + camelName + "/" + camelName + "Reducers.js';"
  utils.append("./mobile/"+mobileProjectName+"/js/modules/moduleReducers.js", reducersRef);

  console.log(chalk.magenta("     Finished creating Mobile Resource."));

}
