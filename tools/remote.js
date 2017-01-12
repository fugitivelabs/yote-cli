var fs        = require('fs')
  , chalk     = require('chalk')
  , shell     = require('shelljs')
  , promptly  = require('promptly')
  , config    = require('../package.json')
  , exec      = require('child_process').exec
  ;

module.exports = function(program) {

  program

  .command("remote <command>")
  .action(function(...args) {
    console.log("REMOTE");
    // console.log(args.length);
    if(args.length == 1) {
      process.exit(0);
    }
    var switchArg = args.shift(); //remove first item
    console.log(switchArg);
    // console.log(args);
    switch(switchArg) {
      case 'list':
        list(args);
        break;
      case 'backup':
        backup(args);
        break;
      case 'restore':
        list(args);
        break;
      default:
        console.log("default");
        process.exit(0);
    }
  })

  function list(args) {
    console.log("LIST");
    console.log(args);
    shell.exec("gcloud compute instances list");
  }

  function backup(args) {
    console.log("BACKUP");
    // console.log(args);
    var instanceName = args.shift();
    if(typeof(args[0]) !== "string") {
      console.log("MUST SPECIFY DATA REMOTE DATABASE NAME");
      process.exit(0);
    }
    var dbName = args[0];
    console.log("DATABASE NAME: " + dbName);
    if(args.length > 1) {
      console.log("NEXT ARG");
      console.log(args[1]);
      var outputRename = args[1];
    }
    // process.exit(0);
    console.log(instanceName);
    // console.log(args);
    exec("gcloud compute instances list", function(err, stdout, stderr) {
      // console.log("GOT INSTANCE LIST");
      // console.log(stdout);
      //string methods to extract the zone for this instance (required for ssh and backup)
      var split = stdout.split(/[\n\r\s]+/);
      var instanceIndex = split.indexOf(instanceName);
      // console.log(split[instanceIndex]);
      var zone = split[instanceIndex + 1];
      console.log("ZONE: " + zone);
      //have name and zone, enough to ssh into instance
      //create fresh backup
      var nextCommand = `gcloud compute ssh grant@${instanceName} --zone ${zone} --command "`;
      nextCommand += `sudo docker run -v ~/backup/:/backup/ --rm --link mongodb:mongodb library/mongo bash -c 'mongodump -d ${args[0]} -o /backup/ --host mongodb'"`;
      console.log(nextCommand);
      console.log("Creating backup on remote instance");
      shell.exec(nextCommand); //actually creates the backup!!!!
      //now copy files locally
      nextCommand = `gcloud compute copy-files grant@${instanceName}:/home/grant/backup/${dbName} ./ --zone ${zone}`;
      shell.exec(nextCommand);
      console.log("Backup created in local folder.");
      if(outputRename) {
        shell.exec(`mv ./${dbName} ./${outputRename}`);
      }
    })
  }

}
