"use strict";

var fs = require('fs')
  , shell = require('shelljs')
  , chalk = require('chalk')
  , utils = require('../../tools/utils')
  ;

module.exports = function(resourceName) {
  //init strings
  const name = utils.getNormalizedName(resourceName);
  const camelName = utils.camelCase(name);
  const Proper = utils.capitaliseFirstLetter(camelName);
  const allCaps = name.toUpperCase();
  const lowercase = name.toLowerCase();

  var clientPath = "./client/modules/" + name;
  var checkClient = utils.checkIfExists(clientPath);
  if(checkClient) {
    console.log("RESOURCE BY THAT NAME ALREADY EXISTS");
    return;
  }

  console.log("Creating Client resource called " + name);

  let replacements = {
    name, camelName, Proper, allCaps, lowercase
  }
  console.log("DIR", __dirname);

  utils.mkdir(clientPath, () => {
    //actions and reducers first
    utils.write(clientPath + '/' + camelName + 'Actions.js'
      , utils.readTemplateAndReplace(__dirname, '/client/actions.js' , replacements));
    utils.write(clientPath + '/' + camelName + 'Reducers.js'
      , utils.readTemplateAndReplace(__dirname, '/client/reducers.js' , replacements));
    utils.write(clientPath + '/' + camelName + 'Routes.js.jsx'
      , utils.readTemplateAndReplace(__dirname, '/client/routes.js.jsx' , replacements));
    utils.write(clientPath + '/' + camelName + 'Styles.scss'
      , utils.readTemplateAndReplace(__dirname, '/client/styles.scss' , replacements));
    //now components
    utils.mkdir(clientPath + '/components', () => {
      //layout
      utils.write(clientPath + '/components/' + Proper + 'Layout.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/Layout.js.jsx' , replacements));
      //list
      utils.write(clientPath + '/components/' + Proper + 'List.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/List.js.jsx' , replacements));
      //listItem
      utils.write(clientPath + '/components/' + Proper + 'ListItem.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/ListItem.js.jsx' , replacements));
      //single
      utils.write(clientPath + '/components/Single' + Proper + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/Single.js.jsx' , replacements));
      //update
      utils.write(clientPath + '/components/Update' + Proper + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/Update.js.jsx' , replacements));
      //create
      utils.write(clientPath + '/components/Create' + Proper + '.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/Create.js.jsx' , replacements));
      //form
      utils.write(clientPath + '/components/' + Proper + 'Form.js.jsx'
        , utils.readTemplateAndReplace(__dirname, '/client/components/Form.js.jsx' , replacements));
    })
  })

  //now integrate into application
  var sassRef = "\n@import 'modules/" + name + "/" + name + "Styles';";
  utils.append("./client/yote.scss", sassRef);

  var routesRef = "\nexport { default as " + name + " } from './" + name + "/" + name + "Routes.js.jsx';"
  utils.append("./client/modules/moduleRoutes.js", routesRef);

  var reducersRef = "\nexport { default as " + name + " } from './" + name + "/" + name + "Reducers.js';"
  utils.append("./client/modules/moduleReducers.js", reducersRef);

  console.log("Done creating Client Resource.");

}