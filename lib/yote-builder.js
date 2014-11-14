"use strict";


exports.ng        = function(name, options) {
  require('./ngResource').yoteClient(name, options);
}

exports.api       = function(name, options) {
  require('./apiResource').yoteApi(name, options);
}

exports.scaffold  = function(name, options) {
  require('./scaffold').yoteScaffold(name, options);
}