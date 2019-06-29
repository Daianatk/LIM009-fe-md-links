//  let route= '/Users/Soul/Desktop/LIM009-fe-md-links';
//  let route= '/home/daiana/Desktop/LIM009-fe-md-links';
//  Archivo JS externo con las funciones.
const { isPathAbsolute } = require('../src/index.js');
const { isMarkdown } = require('../src/index.js');
const { readAllFiles } = require('../src/index.js');
const { validateLinks } = require('../src/index.js');
const chalk = require('chalk');
// let route = 'C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/example/README.md';


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    try {
      let arrayFile = readAllFiles(path);
      if (isPathAbsolute(path) && (!options || options.validate === false)) {
        if (arrayFile.length !== 0) {
          console.log(isMarkdown(path));
          resolve(isMarkdown(path));
        } else {
          resolve('No se encontraron archivos .md');
        };
      } else if (isPathAbsolute(path) && options.validate === true) {
        if (arrayFile.length !== 0) {
          console.log(validateLinks(path));
          resolve(validateLinks(path));
        } else {
          resolve('No se encontraron archivos.md');
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

module.exports = {
  mdLinks
};