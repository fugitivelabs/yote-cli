#!/usr/bin/env node

var program     = require('commander')
    , fs        = require('fs')
    , chalk     = require('chalk')
    , shell     = require('shelljs')
    , promptly  = require('promptly')
  ;

program
    .version('0.0.1')
    .usage('<keywords>')
    .option('-c, --create [appName]', 'Create a new Yote applicaion directory called [appName]')
    .option('-H, --howl', '')
    .parse(process.argv);

// creating a new yote project might need to be done by 
// creating a fork through the github api in the future.  
// right now all this does is setup a clean repo
// but it is up to the user to create the new upstream origin correctly. 
if(program.create) {


  // This method would be used to capture the github username
  // promptly.prompt('What is your github username: ', function(err, value){

    // console.log(value);

    // -----------------------------------------------
    // doing it this way sets fugitivelabs/yote.git as the upstream master and
    // allows the user to pull from the upstream remote 

    shell.exec("git clone https://github.com/fugitivelabs/yote.git " + program.create);
    shell.cd(program.create);
    shell.exec('git remote rename origin upstream');
    

    // *************  ALTERNATIVELY ********************

    // doing it this way creates a brand new git directory that is not associated
    // with the fugitivelabs/yote.git upstream master at all.  
    
    // shell.exec("git clone --bare https://github.com/fugitivelabs/yote.git " + program.create);
    // shell.cd(program.create);
    // shell.exec("git init");

    // --------------------------------------------------


    console.log('');
    console.log(chalk.bgCyan("        Success!        "));
    console.log('');
    console.log(chalk.green("     Now cd into " + program.create + " and run ") + chalk.bgGreen("[sudo] npm install") + chalk.green(" to get started"));
    console.log('');
    console.log('');
    console.log(chalk.dim("     To setup your github repository:"));
    console.log('');
    console.log(chalk.dim("         - Create a repository on https://github.com"));
    console.log(chalk.dim("         - Copy the respository URL "));
    console.log(chalk.dim("         - cd into the " + program.create + " directory"));
    console.log(chalk.dim("         - run 'git remote add origin [repository URL]"));
    console.log('');
    console.log(chalk.dim("     Then you're good to go."))

    process.exit(0); 
  
  // ends the promptly function
  // });

}

if(program.howl) {
  shell.exec("say 'owooooooooooooooo'");
  process.exit(0);
}

// if(!program.args.length) {
//   console.log("yep");
//   // program.help();
//   console.log(program.option);
// }


