let _ = require('lodash');
let chalk = require('chalk');
let fs = require('fs');
let shell = require('shelljs');

exports.getYoteVersion = () => {
  var yoteProject = JSON.parse(fs.readFileSync('./yote-project.json', 'utf8'));
  console.log("VERSION: " + yoteProject['yote-version']);
  return yoteProject['yote-version'];
}

exports.checkIfExists = (path) => {
  var exists = fs.existsSync(path);
  return exists;
}

exports.getNormalizedName = (string) => {
  //don't know what this does but we need a way to normalize user input names
  // into something we can use.
  // putting this in now and using it so that in the future we can
  // change this method and have it work automatically
  return string;
}

exports.capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.camelCase = (str) => {
  if(str.indexOf('-') > -1) {
    str = str.toLowerCase();
    var parts = str.split(/[\-_ \s]/);
    str = null;
    for (var i = 0; i < parts.length; i++) {
      str = (str ? str + capitaliseFirstLetter(parts[i]) : parts[i]);
    }
  }
  return str;
}

exports.mkdir = (path, fn) => {
  shell.mkdir('-p', path);
  shell.chmod(755, path);
  console.log(chalk.cyan('   create directory: '), path);
  if (fn) fn();
}

exports.append = (path, str) => {
  fs.appendFile(path, str);
  console.log(chalk.magenta('   appending file: '), path);
}

exports.write = (path, str) => {
  fs.writeFile(path, str);
  console.log(chalk.cyan('   create file: '), path);
}

exports.readTemplate = (path) => {
  var template = fs.readFileSync(__dirname + '/templates/' + path, 'utf8');
  for (var key in resource) {
    template = template.split('__' + key + '__').join(resource[key]);
  }
  return template;
}

exports.readTemplateAndReplace = (path, file, replacements) => {
  console.log(chalk.dim("          Read and replace " + file));
  var template = fs.readFileSync(path + '/templates/' + file, 'utf8');
  for (var key in replacements) {
    template = template.split('__' + key + '__').join(replacements[key]);
  }
  return template;
}

exports.findAndReplaceYote = (path, file, appName) => {
  var template = fs.readFileSync(path + file, 'utf8');
  template = template.split('Yote').join(appName);
  return template;
}

exports.kebabCase = (str) => {
  str = _.kebabCase(str);
  return str;
}
