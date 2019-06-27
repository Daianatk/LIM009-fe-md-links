import { isPathAbsolute } from '../src/index.js';
import { isMarkdown } from '../src/index.js';
import { validateLinks } from '../src/index.js';
import { readAllFiles } from '../src/index.js';
const chalk = require('chalk');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      let arrayFile = readAllFiles(path);
      if (isPathAbsolute(path) && (!options || options.validate === false)) {
        if (arrayFile.length !== 0) {
          resolve(isMarkdown(path));
        } else {
          resolve('No se encontraron archivos.md');
        };
      } else if (isPathAbsolute(path) && options.validate === true) {
        if (arrayFile.length !== 0) {
          resolve(validateLinks(path));
        } else {
          resolve('No se encontraron archivos.md');
        }
      };
    }
    catch (error) {
      if (error.code === 'ENOENT') {
        let error = chalk.red.bold('Ruta incorrecta');
        reject(error);
      }
    };
  });
};

module.exports = {
  mdLinks
};