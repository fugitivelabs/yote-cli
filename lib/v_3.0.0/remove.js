var fs        = require('fs')
, chalk     = require('chalk')
, shell     = require('shelljs')
, promptly  = require('promptly')
, config    = require('../../package.json')
, exec      = require('child_process').exec
, utils     = require('../../tools/utils')
;

// import correct version of resource builders
let removeClientResource = require('./removeClientResource.js');
let removeServerResource = require('./removeServerResource.js');
let removeMobileResource = require('./removeMobileResource.js');

module.exports = function(resourceName, options) {
console.log(chalk.bgCyan(">>>>  REMOVING A YOTE RESOURCE MODULE   <<<<"));
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

if(resourceName.toLowerCase() === "user") {
  console.log(chalk.bgRed("Stop that."))
  return;
}

if(!utils.checkIfExists('./server')) {
  console.log(chalk.yellow("    No Server folder present, skipping..."));
  console.log();
} else {
  removeServerResource(resourceName);
}
if(!utils.checkIfExists('./web')) {
  console.log(chalk.yellow("    No Client folder present, skipping..."));
  console.log();
} else {
  removeClientResource(resourceName);
}
if(!utils.checkIfExists('./mobile')) {
  console.log(chalk.yellow("    No Mobile folder present, skipping..."));
  console.log();
} else {
  removeMobileResource(resourceName);
}
console.log();
console.log(chalk.bgMagenta("<<<<   FINISHED REMOVING YOTE RESOURCE MODULE     >>>>"))
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
