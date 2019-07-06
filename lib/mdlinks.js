"use strict";

//  Archivo JS externo con las funciones.
var _require = require('../src/index.js'),
    isPathAbsolute = _require.isPathAbsolute;

var _require2 = require('../src/index.js'),
    isMarkdown = _require2.isMarkdown;

var _require3 = require('../src/index.js'),
    readAllFiles = _require3.readAllFiles;

var _require4 = require('../src/validate.js'),
    validateLinks = _require4.validateLinks;

var chalk = require('chalk');

var mdLinks = function mdLinks(route, options) {
  return new Promise(function (resolve, reject) {
    try {
      var arrayFile = readAllFiles(route);

      if (isPathAbsolute(route) && (!options || options.validate === false)) {
        if (arrayFile.length !== 0) {
          resolve(isMarkdown(route));
        } else {
          resolve(chalk.red.bold('No se encontraron archivos .md'));
        }

        ;
      } else if (isPathAbsolute(route) && options.validate === true) {
        if (arrayFile.length !== 0) {
          resolve(validateLinks(route));
        } else {
          resolve(chalk.red.bold('No se encontraron archivos.md'));
        }

        ;
      }

      ;
    } catch (error) {
      if (error.code === 'ENOENT') {
        var _error = chalk.red.bold('Ruta incorrecta');

        reject(_error);
      }
    }

    ;
  });
};

module.exports = mdLinks;