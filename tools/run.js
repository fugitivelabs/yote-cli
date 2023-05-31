const utils       = require('./utils.js');
var fs        = require('fs')
  , chalk     = require('chalk')
  , shell     = require('shelljs')
  , promptly  = require('promptly')
  , config    = require('../package.json')
  , exec      = require('child_process').exec
  , _         = require('lodash')
  ;

// the app must be named the same as its directory
const WEB      = 'web'
const MOBILE   = 'mobile'
const SERVER   = 'server'
const ALL_APPS = [WEB, SERVER, MOBILE]

// methods for starting apps
const TAB      = 'tab'
const WINDOW   = 'window'
const TMUX     = 'tmux'
const ALL_METHODS = [TAB, WINDOW, TMUX]

module.exports = function(program) {
  program
  .command("run")
  .alias("R")
  .option('-a, --all', 'run all apps: server, web and mobile')
  .option('-m, --mobile', 'run mobile ios simulator')
  .option('-w, --web', 'run web client')
  .option('-s, --server', 'run yote server')
  .option('-t, --method <method> ', 'how to run apps [tab, window, tmux] default: tab',
      (option) => ALL_METHODS.indexOf(option) > -1 ? option : TAB)
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
    message(chalk.cyan("\nRUN YOTE\n"));

    let appList = [];
    if(options.web) {
      appList.push(WEB);
    } 
    if(options.server) {
      appList.push(SERVER);
    } 
    if(options.mobile) {
      appList.push(MOBILE);
    }
    appList = (appList.length ? appList : ALL_APPS)

    const runMethod = runMethodStrategy(options.method)

    appList.forEach((app) => {
      message(chalk.magenta('Start', app));
      if (runApp(app, runMethod)) {
        message(chalk.magenta("Complete.\n"));
      } else {
        message(chalk.red(`Error: could not run ${app}, because the directory is missing`, "\n"));
      }
    })
  }
}

function runApp(app, runMethod) {
  if(!utils.checkIfExists(`./${app}`)) {
    return false
  }
  switch (app) {
    case WEB:
      runMethod('web', 'npm start', app)
      break; 
    case SERVER:
      runMethod('server', 'nodemon', app)
      break;
    case MOBILE:
      const mobileProjectName = utils.getYoteMobileProjectName();
      runMethod(`mobile/${mobileProjectName}`, 'yarn start', app)
      runMethod(`mobile/${mobileProjectName}`, 'react-native run-ios', app)
      break;
  }
  return true
}

function runMethodStrategy(method) {
  switch (method) {
    case WINDOW:
      return runInWindow
    case TMUX:
      return runInTmux
    default:
      return runInTab
  }
}

function runInTab(directory, cmd, title) {
  const execCmd = `ttab -d "./${directory}" -t "${title}" ${cmd}`
  message('$', execCmd)
  shell.exec(execCmd);
}
function runInWindow(directory, cmd, title) {
  const execCmd = `ttab -w -d "./${directory}" -t "${title}" ${cmd}`
  message('$', execCmd)
  shell.exec(execCmd);
}
function runInTmux(directory, cmd, title) {
  const execCmd = `tmux new-window -n:${title} 'bash --init-file <(echo "cd ./${directory}; ${cmd}")'`
  message('$', execCmd)
  shell.exec(execCmd);
}

function message(...args) {
  console.log('  ', ...args)
}

