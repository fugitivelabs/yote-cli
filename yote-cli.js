#!/usr/bin/env node

var program = require('commander')
    , fs    = require('fs')
    , chalk = require('chalk')
    , shell = require('shelljs')
  ;

program
    .version('0.0.1')
    .usage('<keywords>')
    .option('-c, --create [appName]', 'Create a new Yote applicaion directory called [appName]')
    .parse(process.argv);

if(program.create) {
  shell.exec("git clone https://github.com/fugitivelabsgit/yote.git " + program.create);
  console.log(chalk.bgCyan("Success!"));
  console.log(chalk.green("Now cd into " + program.create + " and run ") + chalk.bgGreen("[sudo] npm install") + chalk.green(" to get started"));
  process.exit(0);
}

if(!program.args.length) {
  program.help();
}


