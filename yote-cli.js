#!/usr/bin/env node

var program     = require('commander')
    , fs        = require('fs')
    , chalk     = require('chalk')
    , shell     = require('shelljs')
    , promptly  = require('promptly')
    , builder   = require('./lib/yote-builder')
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
  // .option('-b, --build [buildNum]', 'Select which version of Yote to install. Defaults to most recent stable.')
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
    // allows the user to pull from the upstream remote -- do we want this?

    shell.exec("git clone https://github.com/fugitivelabs/yote.git " + cmd);
    shell.cd(cmd);

    // set the repo with a clean origin
    shell.exec('git remote rename origin upstream');
    
    // remove the upstream master to unlink yote master repo
    // shell.exec('git remote rm upstream');


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
    console.log(chalk.green("     Now install your dependencies to get started"));
    console.log('');
    console.log(chalk.green("         $ cd " + cmd));
    console.log(chalk.green("         $ [sudo] npm install"));
    console.log('');
    console.log('');
    console.log(chalk.dim("     To setup your github repository:"));
    console.log('');
    console.log(chalk.dim("         - Create a repository on https://github.com"));
    console.log(chalk.dim("         - Copy the respository URL "));
    console.log(chalk.dim("         - $ cd " + cmd));
    console.log(chalk.dim("         - $ git remote add origin [repository URL]"));
    console.log('');
    console.log(chalk.dim("     Then you're good to go."))

    // process.exit(0); 
  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ yote create myApp');
    console.log('    $ yote C myApp');
    console.log();
  });

program
  .command('generate <name>')
  .alias('gen')
  .description('Generate a new Yote resource.')
  .option('-s,    --scaffold', 'Generate a scaffold.')
  .option('-c,    --client [type]', "Generate an api agnostic client resource.  Currently accepting: 'angular' ('ng')")
  .option('-a,    --api', "Generate a client agnostic api resource.")
  .action(function(name, options){
    if(options.client) {
      if(options.client == 'ng' || options.client == 'angular') {
        builder.ng(name, options);
      } else {
        builder.ng(name, options);
        // if we end up with more than one client type, we can add this back in
        // console.log("");
        // console.log(chalk.red('Whoops'));
        // console.log(chalk.red("Can't understand your client type"));
        // console.log("");
        // console.log(chalk.yellow("Acceptable client types (so far):"));
        // console.log("");
        // console.log(chalk.yellow("        'ng'  ...... Client-side AngularJS MVC resource (can also spell out as 'angular') "));
        // console.log("");
      }
    } else if(options.api) {
      builder.api(name, options);
    } else if(options.scaffold) {
      builder.scaffold(name, options);
    } else {
      builder.scaffold(name, options);
    }

  }).on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ yote gen myResource ');
    console.log(chalk.dim('      - will generate an integrated Yote scaffold'));
    console.log();
    console.log('    $ yote gen myResource -c ');
    console.log(chalk.dim('           - OR - '));
    console.log('    $ yote gen myResource --client ');
    console.log(chalk.dim('      - will generate a Yote client with dummy data'));
    console.log();
    console.log('    $ yote gen myResource -a');
    console.log(chalk.dim('           - OR - '));
    console.log('    $ yote gen myResource --api');
    console.log(chalk.dim('      - will generate a Yote API that can be hit by any client'));
    console.log();
  });



program.parse(process.argv);

if(!program.args.length) {
  program.help();
}


