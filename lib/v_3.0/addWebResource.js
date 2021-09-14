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

  var clientPath = "./web/src/resources/" + camelName;
  var checkClient = utils.checkIfExists(clientPath);
  if(checkClient) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" A Web Resource by that name already exists.  Skip this step."));
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
    // service and store first
    utils.write(clientPath + '/' + camelName + 'Service.js'
      , utils.readTemplateAndReplace(__dirname, '/web/service.js' , replacements));
    utils.write(clientPath + '/' + camelName + 'Store.js'
      , utils.readTemplateAndReplace(__dirname, '/web/store.js' , replacements));

    // now router
    utils.write(clientPath + '/' + PascalName + 'Router.jsx'
      , utils.readTemplateAndReplace(__dirname, '/web/router.jsx' , replacements));

    // TODO: Figure out how we want to handle resource styles.
    // // now global and module styles
    // utils.write(clientPath + '/' + camelName + 'GlobalStyles.scss'
    //   , utils.readTemplateAndReplace(__dirname, '/web/globalStyles.scss' , replacements));

    // now components
    utils.mkdir(clientPath + '/components', () => {
      // layout
      utils.write(clientPath + '/components/' + PascalName + 'Layout.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/components/Layout.jsx' , replacements));
      // listItem
      utils.write(clientPath + '/components/' + PascalName + 'ListItem.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/components/ListItem.jsx' , replacements));
      // form
      utils.write(clientPath + '/components/' + PascalName + 'Form.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/components/Form.jsx' , replacements));
    })

    // now views
    utils.mkdir(clientPath + '/views', () => {
      // list
      utils.write(clientPath + '/views/' + PascalName + 'List.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/views/List.jsx' , replacements));
      // single
      utils.write(clientPath + '/views/Single' + PascalName + '.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/views/Single.jsx' , replacements));
      // update
      utils.write(clientPath + '/views/Update' + PascalName + '.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/views/Update.jsx' , replacements));
      // create
      utils.write(clientPath + '/views/Create' + PascalName + '.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/views/Create.jsx' , replacements));
    })
  })

  // TODO: figure out how we want to handle global styles
  // now integrate into application
  // var sassRef = '\n@import "resources/' + camelName + "/" + camelName + 'GlobalStyles";';
  // utils.append("./web/config/yote.scss", sassRef);

  var routesRef = "\nexport { default as " + camelNamePlural + " } from '../resources/" + camelName + "/" + PascalName + "Router.jsx';"
  utils.append("./web/src/config/resourceRoutes.js", routesRef);

  var reducersRef = "\nexport { default as " + camelName + " } from '../resources/" + camelName + "/" + camelName + "Store.js';"
  utils.append("./web/src/config/resourceReducers.js", reducersRef);
  
  // TODO: Maybe add navItems
  // if(options.N) {
  //   // add as main nav bar reference
  //   var navRef = `  , { path: '/${kebabNamePlural}', display: '${PascalName}s' } \n];`;
  //   utils.replaceInFile('./web/src/config/navItems.js', '];', navRef);
  // }

  console.log(chalk.magenta("     Finished creating Client Resource."));

}
