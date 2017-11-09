const _           = require('lodash');
const Spinner     = require('cli-spinner').Spinner;
const chalk       = require('chalk');
const config      = require('../../package.json');
const exec        = require('child_process').exec;
const fs          = require('fs');
const promptly    = require('promptly');
const shell       = require('shelljs');
const utils       = require('../../tools/utils.js');

let spinner = null;

module.exports = function(appName, options) {
  appName = _.camelCase(appName); // normalize the app name
  var PascalName =utils.capitalizeFirstLetter(appName);
  console.log(chalk.cyan("     Initializing a new Yote app called: "));
  console.log();
  console.log(chalk.magenta('     ', appName));

  // determine what we need to install/remove
  let installOptions = ["client","server","mobile"];

  // if no options or A, leave all (i.e. install everything)
  if(options.A || (options.C == undefined && options.S == undefined && options.M == undefined)) {
    console.log();
    console.log(chalk.dim("     Default selected. Install everything"));
  } else if(options.C == undefined) {
    installOptions.splice(installOptions.indexOf('client'), 1);
  } else if(options.S == undefined) {
    installOptions.splice(installOptions.indexOf('server'), 1);
  } else if(options.M == undefined) {
    installOptions.splice(installOptions.indexOf('mobile'), 1);
  }
  console.log();
  console.log(chalk.cyan('     We are installing'));
  console.log(chalk.magenta('     ',installOptions));
  console.log();
  console.log();
  console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
  console.log();
  console.log(chalk.cyan('     Step 1:  Clone the Yote repository... '))
  console.log()
  console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
  console.log();


  /**
   * doing it this way sets fugitivelabs/yote.git as the upstream master and
   * allows the user to pull from the upstream remote
   */

  shell.exec("git clone -b v0.8-release --single-branch https://github.com/fugitivelabs/yote.git " + appName);
  // spinner.stop();
  console.log();
  console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
  console.log();
  console.log(chalk.magenta("     Finished cloning Yote "))
  console.log();
  console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
  console.log();
  shell.cd(appName);

  // set the repo with a clean origin
  shell.exec('git remote rename origin upstream');
  // remove the upstream master to unlink yote master repo
  // shell.exec('git remote rm upstream');


  /**
   * Initialize Yote Server
   */
  //if NOT server, remove that folder, else npm install
  if(!installOptions.indexOf('server') < 0) {
    console.log();
    console.log();
    console.log(chalk.cyan("     Removing Server component"));
    console.log();
    console.log();
    shell.exec("rm -rf ./server");
  } else {
    console.log();
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    console.log(chalk.cyan("     Initilizing Yote Server for " + appName));
    console.log(chalk.cyan("     This may take a little while..."));
    console.log();
    // spinner = new Spinner('     installing... ');
    // spinner.setSpinnerString(19);
    // spinner.start();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    shell.cd("server");
    shell.sed('-i', `yote`, appName, `./config.js`);
    shell.exec('npm install');
    // spinner.stop();
    console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
    console.log();
    console.log(chalk.magenta("     Finished with " + appName + " Server "))
    console.log();
    console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
    console.log();
    console.log();
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    console.log(chalk.cyan("     Copying a new secrets.js file in for the server."));
    console.log();
    console.log(chalk.bgRed("   NOTE: Please change your secrets file from the defaults!    "));
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    console.log();
    shell.exec("cp ./secrets-sample.js ./secrets.js");
    shell.cd("..");
    console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
    console.log();
    console.log(chalk.magenta("     Finished with Secrets "))
    console.log();
    console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
    console.log();
  }

  /**
   * Initialize Yote Client
   */
  if(!installOptions.indexOf('client') < 0) {
    console.log();
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    console.log("Removing Client component");
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    shell.exec("rm -rf ./client");
  } else {
    console.log();
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    console.log(chalk.cyan("     Initializing Yote Client for " + appName + ". "));
    console.log(chalk.cyan("     This may take a little while..."));
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    console.log();
    shell.cd("client");
    shell.exec('npm install');
    shell.cd("..");
    console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
    console.log();
    console.log(chalk.magenta("     Finished with " + appName + " client "));
    console.log();
    console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
    console.log();
  }

  /**
   * Initialize Yote Mobile
   */
  if(!installOptions.indexOf('mobile') < 0) {
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    console.log(chalk.cyan("     Initializing Yote Mobile for " + appName));
    console.log(chalk.cyan("     This may take a little while..."));
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    shell.exec("rm -rf ./mobile");
  } else {
    console.log();
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    console.log(chalk.cyan("     Initializing Yote Mobile for " + appName));
    console.log(chalk.cyan("     This may take a little while..."));
    console.log();
    console.log(chalk.bgCyan('////////////////////////////////////////////////////////'));
    console.log();
    console.log();
    shell.cd("mobile");
    shell.exec("react-native init --version='0.50.3' " + PascalName);
    shell.sed('-i', 'Yote', PascalName, `./Yote/index.js`);
    shell.cp('-f', [`./Yote/index.js`, `./Yote/package.json` ], `./${PascalName}/`);
    shell.cp('-Rf', `./Yote/js/*`, `./${PascalName}/js`);
    shell.sed('-i', 'Yote', PascalName, '../yote-project.json');
    shell.mv(`./${PascalName}/js/YoteApp.js`, `./${PascalName}/js/${PascalName}App.js`);
    shell.rm('-rf', './Yote');
    shell.rm(`./${PascalName}/App.js`)
    shell.cd(appName);
    shell.exec('npm install');
    // shell.exec('react-native link');
    //DO MOBILE INSTALL STUFF?????
    // shell.exec('npm install');
    console.log();
    console.log();
    console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
    console.log();
    console.log(chalk.magenta("     Finished creating " + appName + " Mobile "))
    console.log();
    console.log(chalk.bgMagenta('////////////////////////////////////////////////////////'));
    console.log();
    shell.cd("..");
  }

  console.log('');
  console.log(chalk.bgCyan("        Success!        "));
  console.log('');
  console.log(chalk.green("     Now you're ready to run " + appName));
  console.log('');
  console.log(chalk.green("         $ cd " + appName + "/server"));
  console.log(chalk.green("         $ nodemon"));
  console.log('');
  console.log('');
  console.log(chalk.green("         $ cd " + appName + "/client"));
  console.log(chalk.green("         $ npm run watch"));
  console.log('');
  console.log('');
  console.log(chalk.green("         $ cd " + appName + "/mobile/" + appName));
  console.log(chalk.green("         $ react-native run-ios"));
  console.log('');
  console.log(chalk.bgYellow("        Yote run commands coming soon..."));
  console.log('');
  console.log(chalk.magenta("     To setup your github repository:"));
  console.log('');
  console.log(chalk.magenta("         - Create a repository on https://github.com"));
  console.log(chalk.magenta("         - Copy the respository URL "));
  console.log(chalk.magenta("         - $ cd " + appName));
  console.log(chalk.magenta("         - $ git remote add origin [repository URL]"));
  console.log('');
  console.log(chalk.magenta("     Then you're good to go."))



  // --------------------------------------------------

}
