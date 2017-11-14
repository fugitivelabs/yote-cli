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
  const allCaps = utils.startCase(name).toUpperCase();
  const lowercase = utils.startCase(name).toLowerCase();
  const kebabName = utils.kebabCase(name);
  const actionCase = utils.actionCase(name);
  const startName = utils.startCase(name);

  var clientPath = "./client/modules/" + camelName;
  var checkClient = utils.checkIfExists(clientPath);
  if(checkClient) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" A Client Resource by that name already exists.  Skip this step."));
    return;
  }

  console.log(chalk.cyan("     Creating Client Resource called " + name));

  let replacements = {
    name, camelName, PascalName, allCaps, lowercase, kebabName, actionCase, startName
  }
  console.log(chalk.dim("     DIR", __dirname));

  utils.mkdir(clientPath, () => {
    // actions and reducers first
    utils.write(clientPath + '/' + camelName + 'Actions.js'
      , utils.readTemplateAndReplace(__dirname, '/client/actions.js' , replacements));
    utils.write(clientPath + '/' + camelName + 'Reducers.js'
      , utils.readTemplateAndReplace(__dirname, '/client/reducers.js' , replacements));

    // now router
    utils.write(clientPath + '/' + PascalName + 'Router.js.jsx'
      , utils.readTemplateAndReplace(__dirname, '/client/router.js.jsx' , replacements));

    // now global and module styles
    utils.write(clientPath + '/' + camelName + 'GlobalStyles.scss'
      , utils.readTemplateAndReplace(__dirname, '/client/globalStyles.scss' , replacements));
    utils.write(clientPath + '/' + camelName + 'ModuleStyles.css'
      , utils.readTemplateAndReplace(__dirname, '/client/moduleStyles.css' , replacements));

    // now components
    utils.mkdir(clientPath + '/components', () => {
      // layout
      utils.write(clientPath + '/components/' + PascalName + 'Layout.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/Layout.js.jsx' , replacements));
      // listItem
      utils.write(clientPath + '/components/' + PascalName + 'ListItem.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/ListItem.js.jsx' , replacements));
      // form
      utils.write(clientPath + '/components/' + PascalName + 'Form.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/Form.js.jsx' , replacements));
    })

    // now views
    utils.mkdir(clientPath + '/views', () => {
      // list
      utils.write(clientPath + '/views/' + PascalName + 'List.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/views/List.js.jsx' , replacements));
      // single
      utils.write(clientPath + '/views/Single' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/views/Single.js.jsx' , replacements));
      // update
      utils.write(clientPath + '/views/Update' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/views/Update.js.jsx' , replacements));
      // create
      utils.write(clientPath + '/views/Create' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/views/Create.js.jsx' , replacements));
    })
  })

  // now integrate into application
  var sassRef = '\n@import "modules/' + camelName + "/" + camelName + 'GlobalStyles";';
  utils.append("./client/yote.scss", sassRef);

  var routesRef = "\nexport { default as " + camelName + "s } from './" + camelName + "/" + PascalName + "Router.js.jsx';"
  utils.append("./client/modules/moduleRoutes.js", routesRef);

  var reducersRef = "\nexport { default as " + camelName + " } from './" + camelName + "/" + camelName + "Reducers.js';"
  utils.append("./client/modules/moduleReducers.js", reducersRef);

  console.log(chalk.magenta("     Finished creating Client Resource."));

}
