let _ = require('lodash');
let chalk = require('chalk');
let fs = require('fs');
let pluralize = require('pluralize');
let shell = require('shelljs');

exports.getYoteVersion = () => {
  var yoteProject = JSON.parse(fs.readFileSync('./yote-project.json', 'utf8'));
  console.log("VERSION: " + yoteProject['yote-version']);
  return yoteProject['yote-version'];
}

exports.getYoteMobileProjectName = () => {
  var yoteProject = JSON.parse(fs.readFileSync('./yote-project.json', 'utf8'));
  console.log("MOBILE APP NAME: " + yoteProject['yote-mobile-project-name']);
  return yoteProject['yote-mobile-project-name'];
}

exports.checkIfExists = (path) => {
  var exists = fs.existsSync(path);
  return exists;
}

exports.getNormalizedName = (str) => {
  /**
   * Regardless of input, use _.camelCase() to normalize the str.
   *
   * NOTE:
   * _.camelCase('Foo Bar');
   * // => 'fooBar'
   *
   * _.camelCase('--foo-bar--');
   * // => 'fooBar'
   *
   * _.camelCase('__FOO_BAR__');
   * // => 'fooBar'
   */
  str = pluralize.singular(str);
  str = _.camelCase(str);
  return str;
}

exports.capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.camelCase = (str) => {
  // if(str.indexOf('-') > -1) {
  //   str = str.toLowerCase();
  //   var parts = str.split(/[\-_ \s]/);
  //   str = null;
  //   for (var i = 0; i < parts.length; i++) {
  //     str = (str ? str + capitalizeFirstLetter(parts[i]) : parts[i]);
  //   }
  // }
  str = _.camelCase(str);
  return str;
}

exports.mkdir = (path, fn) => {
  shell.mkdir('-p', path);
  shell.chmod(755, path);
  console.log(chalk.cyan('   create directory: '), path);
  if (fn) fn();
}

exports.rmDir = (path, cb) => {
  shell.rm('-rf', path);
  console.log(chalk.cyan('   rm directory: '), path);
  if(cb) { cb() }
}

exports.replaceInFile = (path, oldString, newString, cb) => {
  shell.sed('-i', oldString, newString, path);
  if(cb) { cb() }
}

exports.append = (path, str) => {
  fs.appendFileSync(path, str);
  console.log(chalk.magenta('   appending file: '), path);
}

exports.write = (path, str) => {
  fs.writeFileSync(path, str);
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

exports.actionCase = (str) => {
  str = _.snakeCase(str);
  str = _.toUpper(str);
  return str;
}

exports.startCase = (str) => {
  str = _.startCase(str);
  return str;
}

exports.pluralize = (str) => {
  str = pluralize(str);
  return str;
}

exports.singularize = (str) => {
  str = pluralize.singular(str);
  return str;
}
