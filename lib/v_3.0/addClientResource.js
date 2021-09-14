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

  var clientPath = "./web/resources/" + camelName;
  var checkClient = utils.checkIfExists(clientPath);
  if(checkClient) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" A Client Resource by that name already exists.  Skip this step."));
    return;
  }

  console.log(chalk.cyan("     Creating Client Resource called " + name));

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

  utils.mkdir(clientPath, () => {
    // actions and reducers first
    utils.write(clientPath + '/' + camelName + 'Actions.js'
      , utils.readTemplateAndReplace(__dirname, '/web/actions.js' , replacements));
    utils.write(clientPath + '/' + camelName + 'Reducers.js'
      , utils.readTemplateAndReplace(__dirname, '/web/reducers.js' , replacements));

    // now router
    utils.write(clientPath + '/' + PascalName + 'Router.js.jsx'
      , utils.readTemplateAndReplace(__dirname, '/web/router.js.jsx' , replacements));

    // now global and module styles
    utils.write(clientPath + '/' + camelName + 'GlobalStyles.scss'
      , utils.readTemplateAndReplace(__dirname, '/web/globalStyles.scss' , replacements));

    // now components
    utils.mkdir(clientPath + '/components', () => {
      // layout
      utils.write(clientPath + '/components/' + PascalName + 'Layout.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/components/Layout.js.jsx' , replacements));
      // listItem
      utils.write(clientPath + '/components/' + PascalName + 'ListItem.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/components/ListItem.js.jsx' , replacements));
      // form
      utils.write(clientPath + '/components/' + PascalName + 'Form.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/components/Form.js.jsx' , replacements));
    })

    // now views
    utils.mkdir(clientPath + '/views', () => {
      // list
      utils.write(clientPath + '/views/' + PascalName + 'List.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/views/List.js.jsx' , replacements));
      // single
      utils.write(clientPath + '/views/Single' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/views/Single.js.jsx' , replacements));
      // update
      utils.write(clientPath + '/views/Update' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/views/Update.js.jsx' , replacements));
      // create
      utils.write(clientPath + '/views/Create' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/views/Create.js.jsx' , replacements));
    })
  })

  // now integrate into application
  var sassRef = '\n@import "resources/' + camelName + "/" + camelName + 'GlobalStyles";';
  utils.append("./web/config/yote.scss", sassRef);

  var routesRef = "\nexport { default as " + camelNamePlural + " } from '../resources/" + camelName + "/" + PascalName + "Router.js.jsx';"
  utils.append("./web/config/resourceRoutes.js", routesRef);

  var reducersRef = "\nexport { default as " + camelName + " } from '../resources/" + camelName + "/" + camelName + "Reducers.js';"
  utils.append("./web/config/resourceReducers.js", reducersRef);
  if(options.N) {
    // add as main nav bar reference
    var navRef = `  , { path: '/${kebabNamePlural}', display: '${PascalName}s' } \n];`;
    utils.replaceInFile('./web/config/navItems.js', '];', navRef);
  }

  console.log(chalk.magenta("     Finished creating Client Resource."));

}
