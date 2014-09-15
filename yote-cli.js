#!/usr/bin/env node

var program     = require('commander')
    , fs        = require('fs')
    , chalk     = require('chalk')
    , shell     = require('shelljs')
    , promptly  = require('promptly')
  ;

function howl() {
  shell.exec("say 'owooooooooooooooo'");
}

function ngResource(name) {
  console.log(chalk.green("creating an angular resource called " + name));
  console.log(chalk.bgRed("THIS DOESN'T WORK YET " ));
}

function apiResource(name) {
  console.log(chalk.green("creating an api resource called " + name));
  console.log(chalk.bgRed("THIS DOESN'T WORK YET " ));
}



program
  .version('0.0.1')
  .usage('<command> [options]')
  .option('-b,    --build     <buildNum>', 'Select which version of Yote to install')
  .option('-H,    --howl', '', howl)

program
  .command('create <appName>')
  .alias('C')
  .description('Create a new Yote applicaion directory called <appName>')
  .option('-b, --build [buildNum]', 'Select which version of Yote to install. Defaults to most recent stable.')
  .action(function(cmd, options){
    // creating a new yote project might need to be done by 
    // creating a fork through the github api in the future.  
    // right now all this does is setup a clean repo
    // but it is up to the user to create the new upstream origin correctly. 

    // This method would be used to capture the github username
    // promptly.prompt('What is your github username: ', function(err, value){

    // console.log(value);

    // -----------------------------------------------
    // doing it this way sets fugitivelabs/yote.git as the upstream master and
    // allows the user to pull from the upstream remote 

    shell.exec("git clone https://github.com/fugitivelabs/yote.git " + cmd);
    shell.cd(cmd);
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
    console.log(chalk.green("     Now cd into " + cmd + " and run ") + chalk.bgGreen("[sudo] npm install") + chalk.green(" to get started"));
    console.log('');
    console.log('');
    console.log(chalk.dim("     To setup your github repository:"));
    console.log('');
    console.log(chalk.dim("         - Create a repository on https://github.com"));
    console.log(chalk.dim("         - Copy the respository URL "));
    console.log(chalk.dim("         - cd into the " + cmd + " directory"));
    console.log(chalk.dim("         - run 'git remote add origin [repository URL]"));
    console.log('');
    console.log(chalk.dim("     Then you're good to go."))

    // process.exit(0); 
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ yote create myApp');
    console.log('    $ yote C myApp -b 0.1.0.0');
    console.log('    $ yote create myApp build 0.1.0.1');
    console.log();
  });;

program
  .command('generate <name>')
  .alias('gen')
  .description('generate a new Yote resource.')
  .option('-s,    --scaffold', 'generate a scaffold')
  .option('-r,    --resource <type>', "generate either a server-side 'api' resource or a client side 'angular' ('ng' also acceptable) resource")
  .action(function(cmd, options){
    if(options.resource) {
      if(options.resource == 'api') {
        apiResource(cmd);
      } else if(options.resource == 'ng' || options.resource == 'angular') {
        ngResource(cmd);
      } else {
        console.log("");
        console.log(chalk.red('Whoops'));
        console.log(chalk.red("Can't understand your resource type"));
        console.log("");
        console.log(chalk.yellow("Acceptable resource types:"));
        console.log("");
        console.log(chalk.yellow("        'api' ...... Server-side NodeJS/API resource"));
        console.log(chalk.yellow("        'ng'  ...... Client-side AngularJS MVC resource (can also spell out 'angular' "));
        console.log("");
      }
    } else if(options.scaffold) {
      ngResource(cmd);
      apiResource(cmd);
    } else {
      shell.exec("yote gen -h");
    }


  });



program.parse(process.argv);

if(!program.args.length) {
  program.help();
}


