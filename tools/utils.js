function getYoteVersion() {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  console.log(pkg.version);
  return pkg.version;
}

function checkIfExists(path) {
  var exists = fs.existsSync(path);
  return exists;
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function camelCase(str) {
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

function mkdir(path, fn) {
  shell.mkdir('-p', path);
  shell.chmod(755, path);
  console.log(chalk.cyan('   create directory: '), path);
  if (fn) fn();
}

function append(path, str) {
  fs.appendFile(path, str);
  console.log(chalk.magenta('   appending file: '), path);
}

function write(path, str) {
  fs.writeFile(path, str);
  console.log(chalk.cyan('   create file: '), path);
}

function readTemplate(path) {
  var template = fs.readFileSync(__dirname + '/templates/' + path, 'utf8');
  for (var key in resource) {
    template = template.split('__' + key + '__').join(resource[key]);
  }
  return template;
}