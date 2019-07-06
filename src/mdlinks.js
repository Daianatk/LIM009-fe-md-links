//  Archivo JS externo con las funciones.
const { isPathAbsolute } = require('../src/index.js');
const { isMarkdown } = require('../src/index.js');
const { readAllFiles } = require('../src/index.js');
const { validateLinks } = require('../src/validate.js');
const chalk = require('chalk');

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    try {
      let arrayFile = readAllFiles(route);
      if (isPathAbsolute(route) && (!options || options.validate === false)) {
        if (arrayFile.length !== 0) {
          resolve(isMarkdown(route));
        } else {
          resolve(chalk.red.bold('No se encontraron archivos .md'));
        };
      } else if (isPathAbsolute(route) && options.validate === true) {
        if (arrayFile.length !== 0) {
          resolve(validateLinks(route));
        } else {
          resolve(chalk.red.bold('No se encontraron archivos.md'));
        };
      };
    } catch (error) {
      if (error.code === 'ENOENT') {
        let error = chalk.red.bold('Ruta incorrecta');
        reject(error);
      }
    };
  });
};

module.exports = mdLinks;