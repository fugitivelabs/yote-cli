var fs        = require('fs')
  , chalk     = require('chalk')
  , shell     = require('shelljs')
  , promptly  = require('promptly')
  , config    = require('../../package.json')
  , exec      = require('child_process').exec
  ;

module.exports = function(appName, options) {
  console.log("CALLING INIT");
  console.log(appName);
  //determine what we need to install/remove
  var installOptions = ["client","server","mobile"];
  //if no options or A, leave all
  if(options.A || (options.C == undefined && options.S == undefined && options.M == undefined)) {
    console.log("leave all");
  } else if(options.C == undefined) {
    console.log("no client");
    installOptions.splice(installOptions.indexOf('client'), 1);
  } else if(options.S == undefined) {
    installOptions.splice(installOptions.indexOf('server'), 1);
  } else if(options.M == undefined) {
    installOptions.splice(installOptions.indexOf('mobile'), 1);
  }

  console.log(installOptions);

  // -----------------------------------------------
  // doing it this way sets fugitivelabs/yote-react.git as the upstream master and
  // allows the user to pull from the upstream remote -- do we want this?
  shell.exec("git clone https://github.com/fugitivelabs/yote.git " + appName);
  shell.cd(appName);
  // set the repo with a clean origin
  shell.exec('git remote rename origin upstream');
  // remove the upstream master to unlink yote master repo
  // shell.exec('git remote rm upstream');

  //if NOT server, remove that folder, else npm install
  if(!installOptions.indexOf('server') < 0) {
    console.log("Removing Server component");
    shell.exec("rm -rf ./server");
  } else if(options.I !== undefined){
    console.log("Running NPM install in server. This may take a little while...");
    shell.cd("server");
    shell.exec('npm install');
    console.log("Copying a new secrets.js file in for the server.");
    shell.exec("cp ./secrets-sample.js ./secrets.js");
    console.log("Please change your secrets file from the defaults!");
    shell.cd("..");
  }

  if(!installOptions.indexOf('client') < 0) {
    console.log("Removing Client component");
    shell.exec("rm -rf ./client");
  } else if(options.I !== undefined){
    console.log("Running NPM install in client directory. This may take a little while...");
    shell.cd("client");
    shell.exec('npm install');
    shell.cd("..");
  }

  if(!installOptions.indexOf('mobile') < 0) {
    console.log("Removing Mobile component");
    shell.exec("rm -rf ./mobile");
  } else if(options.I !== undefined){
    console.log("Installing Mobile components! This is currently under constructions and does not work.");
    shell.cd("mobile");
    //DO MOBILE INSTALL STUFF?????
    // shell.exec('npm install');
    shell.cd("..");
  }

  // --------------------------------------------------

}