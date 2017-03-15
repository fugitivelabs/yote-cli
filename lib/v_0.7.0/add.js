var fs        = require('fs')
  , chalk     = require('chalk')
  , shell     = require('shelljs')
  , promptly  = require('promptly')
  , config    = require('../../package.json')
  , exec      = require('child_process').exec
  , utils     = require('../../tools/utils')
  ;

//import correct version of resource builders
let clientResource = require('./clientResource.js');
let serverResource = require('./serverResource.js');
// let mobileResource = require('./mobileResource.js');

module.exports = function(resourceName, options) {
  console.log("ADDING A RESOURCE");
  console.log(resourceName);

  // console.log(utils.getYoteVersion());

  //check current directory and make sure that we can create something here
  //if no "yote-project.json" then cancel; must run from top level directory
  if(!utils.checkIfExists('./yote-project.json')) {
    console.log("No yote-project.json file present! Please make sure you are in the project top-level directory and that you have initialized the project correctly.");
    return;
  }

  clientResource(resourceName);
  serverResource(resourceName);
  return;
  //determine what we need to install/remove
  //this is not being used right now; 
  // we will default to everyting that has a folder (seems legit)

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