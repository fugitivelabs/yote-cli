"use strict";


exports.ng        = function(name, options) {
  require('./ngResource').yoteResource(name, options);
}

exports.api       = function(name, options) {
  require('./apiResource').yoteResource(name, options);
}

exports.scaffold  = function(name, options) {
  require('./scaffold').yoteScaffold(name, options);
}