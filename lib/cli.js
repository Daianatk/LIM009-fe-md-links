#!/usr/bin/env node
// Libraria utilizada para colorear declaraciones en CLI
"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var chalk = require('chalk'); //  Archivo JS externo con las funciones.


var statsPath = require('./options.js');

var mdLinks = require('./mdlinks.js'); //  Args proporcionados en CLI


var _process$argv = _toArray(process.argv),
    args = _process$argv.slice(2);

var route = args[0];

var options = function options(element, args) {
  if (args && args[1] === '--validate') {
    return "".concat(element.file, " ").concat(element.href, " ").concat(element.status, " ").concat(element.statusText, " ").concat(element.text);
  } else if (args === undefined || !args[1]) {
    return "".concat(element.file, " ").concat(element.href, " ").concat(element.text);
  }
};

var optionValidate = function optionValidate(route, args) {
  return mdLinks(route, {
    validate: true
  }).then(function (result) {
    var statsTotal = statsPath(result);
    var basic = "Total: ".concat(statsTotal.Total, " Unique: ").concat(statsTotal.Unique);
    var statsValidate = " Broken: ".concat(statsTotal.Broken);

    if (args && args[1] === '--stats' && !args[2]) {
      return chalk.red.yellow(basic);
    } else if (args && args[1] === '--stats' && args[2] === '--validate') {
      return chalk.green.bold(basic) + chalk.red.bold(statsValidate);
    } else {
      var statsLinks = result.map(function (element) {
        return options(element, args);
      }).toString().replace(/,/g, '\n');
      return chalk.black.bold(statsLinks);
    }
  });
};

if (require.main === module) {
  optionValidate(route, args).then(function (result) {
    return console.log(result);
  });
}