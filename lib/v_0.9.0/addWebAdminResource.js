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

  var clientPath = "./web/modules/" + camelName + '/admin';
  var checkClient = utils.checkIfExists(clientPath);
  if(checkClient) {
    console.log("    " + chalk.bgRed("NOTE:") + chalk.red(" An Web Admin Resource for " + camelName + " already exists.  Skip this step."));
    return;
  }

  console.log(chalk.cyan("     Creating Web Admin Resource called " + name));

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

    // now router
    utils.write(clientPath + '/' + PascalName + 'AdminRouter.js.jsx'
      , utils.readTemplateAndReplace(__dirname, '/web/admin/adminRouter.js.jsx' , replacements));

    // now global and module styles
    utils.write(clientPath + '/' + camelName + 'AdminStyles.scss'
      , utils.readTemplateAndReplace(__dirname, '/web/admin/adminStyles.scss' , replacements));

    // now components
    utils.mkdir(clientPath + '/components', () => {
      // layout
      utils.write(clientPath + '/components/Admin' + PascalName + 'Layout.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/admin/components/AdminLayout.js.jsx' , replacements));
      // listItem
      utils.write(clientPath + '/components/Admin' + PascalName + 'ListItem.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/admin/components/AdminListItem.js.jsx' , replacements));
      // form
      utils.write(clientPath + '/components/Admin' + PascalName + 'Form.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/admin/components/AdminForm.js.jsx' , replacements));
    })

    // now views
    utils.mkdir(clientPath + '/views', () => {
      // list
      utils.write(clientPath + '/views/Admin' + PascalName + 'List.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/admin/views/AdminList.js.jsx' , replacements));
      // single
      utils.write(clientPath + '/views/AdminSingle' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/admin/views/AdminSingle.js.jsx' , replacements));
      // update
      utils.write(clientPath + '/views/AdminUpdate' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/admin/views/AdminUpdate.js.jsx' , replacements));
      // create
      utils.write(clientPath + '/views/AdminCreate' + PascalName + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/web/admin/views/AdminCreate.js.jsx' , replacements));
    })
  })

  // now integrate into application
  var sassRef = `\n@import "./admin/${camelName}AdminStyles";`;
  utils.append(`./web/modules/${camelName}/${camelName}GlobalStyles.scss`, sassRef);

  var routesRef = `\nexport { default as ${camelNamePlural}} from '../${camelName}/admin/${PascalName}AdminRouter.js.jsx';`
  utils.append("./web/modules/admin/adminModuleRoutes.js", routesRef);

  var navRef = `  , { path: '/${kebabNamePlural}', display: '${PascalName}s' } \n];`;
  utils.replaceInFile('./web/modules/admin/adminNavItems.js', '];', navRef);

  console.log(chalk.magenta("     Finished creating Web Admin Resource."));

}
