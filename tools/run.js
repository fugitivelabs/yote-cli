const utils       = require('./utils.js');
var fs        = require('fs')
  , chalk     = require('chalk')
  , shell     = require('shelljs')
  , promptly  = require('promptly')
  , config    = require('../package.json')
  , exec      = require('child_process').exec
  , _         = require('lodash')
  ;

module.exports = function(program) {
  program
  .command("run")
  .alias("R")
  .option('-a', '--all', 'run everything')
  .option('-m', '--mobile', 'run ios simulator')
  .option('-w', '--web', 'run web client')
  .option('-s', '--server', 'run yote server')
  .option('-t', '--tabs', 'run in new tabs')
  .on('--help', () => {
    console.log('   To add a new resource to the Yote app')
    console.log(chalk.green('     $ yote A <resourceName>'));
    console.log(chalk.dim('     # OR'))
    console.log(chalk.green('     $ yote add <resourceName>'));
    console.log();
    console.log('   Examples:');
    console.log();
    console.log('    $ yote add myResource');
    console.log('    $ yote A myResource');
    console.log();
    console.log(chalk.bgRed('   NOTE: singular, camelcase names work best, like "product" or "book'));
    console.log();
    console.log();
  })
  .action(run)

  function run(options) {
    console.log("RUN YOTE");
    let runOptions = [];
    // let PascalName =utils.capitalizeFirstLetter(appName);
    const mobileProjectName = utils.getYoteMobileProjectName();
    console.log(mobileProjectName);
    let tabCmd = options.T ? 'ttab' : 'ttab -w'; 
    if(options.A || (!options.W && !options.S && !options.M)) {
      runOptions = ["web","server","mobile"];
      tabCmd = 'ttab'; 
    } 
    if(options.W) {
      runOptions.push("web"); 
    } 
    if(options.S) {
      runOptions.push("server");
    } 
    if(options.M) {
      runOptions.push("mobile");
    }
    console.log();
    console.log(chalk.cyan('      Run: '));
    console.log(chalk.magenta('     ',runOptions));
    console.log();
    if(utils.checkIfExists('./server') && runOptions.indexOf('server') > -1) {
      shell.exec(`${tabCmd} -d server nodemon`);
    }

    if(utils.checkIfExists('./web') && runOptions.indexOf('web') > -1) {
      shell.exec(`${tabCmd} -d web npm run debug`);
    }
    if(utils.checkIfExists('./mobile') && runOptions.indexOf('mobile') > -1) {
      shell.exec(`${tabCmd} -d mobile/${mobileProjectName} yarn start`);
      shell.exec(`${tabCmd} -d mobile/${mobileProjectName} react-native run-ios`);
    }
  }
}
