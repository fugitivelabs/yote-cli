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
    let runOptions = ["web","server","mobile"];
    // let PascalName =utils.capitalizeFirstLetter(appName);
    const mobileProjectName = utils.getYoteMobileProjectName();
    console.log(mobileProjectName);
    // console.log(options);
    if(options.A || (!options.M && !options.S && !options.W)) {
      console.log('run all the things');
    } else if(options.W == undefined) {
      runOptions.splice(runOptions.indexOf('web'), 1);
    } else if(options.S == undefined) {
      runOptions.splice(runOptions.indexOf('server'), 1);
    } else if(options.M == undefined) {
      runOptions.splice(runOptions.indexOf('mobile'), 1);
    }
    console.log();
    console.log(chalk.cyan('      Run: '));
    console.log(chalk.magenta('     ',runOptions));
    console.log();
    if(runOptions.indexOf('server') > -1) {
      shell.exec(`ttab -w -d server nodemon`);
    }

    if(runOptions.indexOf('web') > -1) {
      shell.exec(`ttab -w -d web npm run debug`);
    }
    if(runOptions.indexOf('mobile') > -1) {
      shell.exec(`ttab -w -d mobile/${mobileProjectName} yarn start`);
      shell.exec(`ttab -w -d mobile/${mobileProjectName} react-native run-ios`);
    }
  }
}
