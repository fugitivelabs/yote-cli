var fs        = require('fs')
  , chalk     = require('chalk')
  , shell     = require('shelljs')
  , promptly  = require('promptly')
  , config    = require('../../package.json')
  , exec      = require('child_process').exec
  , utils     = require('../../tools/utils')
  ;

// import correct version of resource builders
let addWebResource = require('./addWebResource.js');
let addServerResource = require('./addServerResource.js');
let addMobileResource = require('./addMobileResource.js');
let addWebAdminResource = require('./addWebAdminResource.js');

module.exports = function(resourceName, options) {
  console.log(chalk.bgCyan(">>>>  ADDING A YOTE RESOURCE MODULE   <<<<"));
  console.log();
  console.log("     " + resourceName);
  console.log();

  // console.log(utils.getYoteVersion());

  //check current directory and make sure that we can create something here
  //if no "yote-project.json" then cancel; must run from top level directory
  if(!utils.checkIfExists('./yote-project.json')) {
    console.log(chalk.bgRed("No yote-project.json file present! Please make sure you are in the project top-level directory and that you have initialized the project correctly."));
    return;
  }

  if(!utils.checkIfExists('./server')) {
    console.log(chalk.yellow("    No Server folder present, skipping..."));
    console.log();
  } else {
    addServerResource(resourceName);
  }
  if(!utils.checkIfExists('./web')) {
    console.log(chalk.yellow("    No Client folder present, skipping..."));
    console.log();
  } else {
    addWebResource(resourceName, options);
  }
  if(!utils.checkIfExists('./mobile')) {
    console.log(chalk.yellow("    No Mobile folder present, skipping..."));
    console.log();
  } else {
    console.log('skip mobile for now');
    // TODO: update to v3
    // addMobileResource(resourceName, options);
  }

  if(options.A) {
    // TODO: update to v3
    // addWebAdminResource(resourceName, options);
  }
  console.log();
  console.log(chalk.bgMagenta("<<<<   FINISHED ADDING YOTE RESOURCE MODULE     >>>>"))
  return;
  //determine what we need to install/remove
  //this is not being used right now;
  // we will default to everything that has a folder (seems legit)

  // var installOptions = ["client","server","mobile"];
  // //if no options or A, leave all
  // if(options.A || (options.C == undefined && options.S == undefined && options.M == undefined)) {
  //   console.log("leave all");
  // } else if(options.C == undefined) {
  //   console.log("no client");
  //   installOptions.splice(installOptions.indexOf('client'), 1);
  // } else if(options.S == undefined) {
  //   installOptions.splice(installOptions.indexOf('server'), 1);
  // } else if(options.M == undefined) {
  //   installOptions.splice(installOptions.indexOf('mobile'), 1);
  // }

  // console.log(installOptions);

  // -----------------------------------------------




  // --------------------------------------------------

}
