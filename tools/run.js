const utils       = require('./utils.js');
var fs        = require('fs')
  , chalk     = require('chalk')
  , shell     = require('shelljs')
  , promptly  = require('promptly')
  , config    = require('../package.json')
  , exec      = require('child_process').exec
  , _         = require('lodash')
  // , ttab      = require('ttab');
  ;

module.exports = function(program) {
  program

  .command("run <appName>")
  // .command("run")
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

  function run(appName, options) {
    console.log("RUN YOTE");
    let runOptions = ["web","server","mobile"];
    let PascalName =utils.capitalizeFirstLetter(appName);

    // console.log(options);
    if(options.A || (!options.M && !options.S && !options.W)) {
      console.log('run all the things');
    } else if(options.W == undefined) {
      installOptions.splice(installOptions.indexOf('web'), 1);
    } else if(options.S == undefined) {
      installOptions.splice(installOptions.indexOf('server'), 1);
    } else if(options.M == undefined) {
      installOptions.splice(installOptions.indexOf('mobile'), 1);
    }
    console.log();
    console.log(chalk.cyan('      Run: '));
    console.log(chalk.magenta('     ',runOptions));
    console.log();
    if(runOptions.indexOf('server') > -1) {
      // shell.cd(appName + "/server", {async:true});
      shell.exec(`ttab -w -d ${appName}/server nodemon`);
      // shell.cd('..')
    }

    if(runOptions.indexOf('web') > -1) {
      // shell.cd(appName + "/web");
      // shell.exec(`ttab -w npm run debug`, {async:true});
      shell.exec(`ttab -w -d ${appName}/web npm run debug`);
      // shell.cd('..')
    }
    if(runOptions.indexOf('mobile') > -1) {
      // shell.cd(appName + "/mobile/" + PascalName);
      shell.exec(`ttab -w -d ${appName}/mobile/${PascalName} react-native run-ios`);
      // shell.exec('ttab -w react-native run-ios', {async:true});
      // shell.cd('../..')
    }
    // console.log(args.length);
  //   if(args.length == 1) {
  //     process.exit(0);
  //   }
  //   var switchArg = args.shift(); //remove first item
  //   console.log(switchArg);
  //   // console.log(args);
  //   switch(switchArg) {
  //     case 'list':
  //       list(args);
  //       break;
  //     case 'backup':
  //       backup(args);
  //       break;
  //     case 'restore':
  //       list(args);
  //       break;
  //     default:
  //       console.log("default");
  //       process.exit(0);
  //   }
  // })
  //
  // function list(args) {
  //   console.log("LIST");
  //   // console.log(args);
  //   shell.exec("gcloud compute instances list");
  // }
  //
  // function backup(args) {
  //   console.log("BACKUP");
  //   // console.log(args);
  //   var instanceName = args.shift();
  //   if(typeof(args[0]) !== "string") {
  //     console.log("MUST SPECIFY DATA REMOTE DATABASE NAME");
  //     process.exit(0);
  //   }
  //   var dbName = args[0];
  //   console.log("DATABASE NAME: " + dbName);
  //   if(args.length > 1) {
  //     console.log("NEXT ARG");
  //     console.log(args[1]);
  //     var outputRename = args[1];
  //   }
  //   // process.exit(0);
  //   console.log("NAME: " + instanceName);
  //   // console.log(args);
  //   exec("gcloud compute instances list", function(err, stdout, stderr) {
  //     console.log("GOT INSTANCE LIST");
  //     // console.log(stdout);
  //     //string methods to extract the zone for this instance (required for ssh and backup)
  //     var split = stdout.split(/[\n\r\s]+/);
  //     // console.log(split);
  //     var instanceIndex = split.indexOf(instanceName);
  //     // console.log(split[instanceIndex]);
  //     var zone = split[instanceIndex + 1];
  //     // console.log("ZONE: " + zone);
  //     //have name and zone, enough to ssh into instance
  //     //create fresh backup
  //     var nextCommand = `gcloud compute ssh grant@${instanceName} --zone ${zone} --command "`;
  //     nextCommand += `sudo docker run -v ~/backup/:/backup/ --rm --link mongodb:mongodb library/mongo bash -c 'mongodump -d ${args[0]} -o /backup/ --host mongodb'"`;
  //     console.log(nextCommand);
  //     console.log("Creating backup on remote instance");
  //     shell.exec(nextCommand); //actually creates the backup!!!!
  //     //now copy files locally
  //     nextCommand = `gcloud compute scp --recurse --compress grant@${instanceName}:/home/grant/backup/${dbName} ./ --zone ${zone}`;
  //     console.log(nextCommand);
  //     shell.exec(nextCommand);
  //     console.log("Backup created in local folder.");
  //     if(outputRename) {
  //       shell.exec(`mv ./${dbName} ./${outputRename}`);
  //     }

  }

}
