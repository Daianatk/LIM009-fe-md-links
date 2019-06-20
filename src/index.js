const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const chalk = require('chalk');
const markdownLinkExtractor = require('markdown-link-extractor');


// Comprueba si el usuario escribe una ruta absoluta y si es relativa la convierte en absoluta.
const isPathAbsolute = (route) => {
  let abs = path.isAbsolute(route);
  if (abs) {
    console.log(chalk.green('✔ You enter a path successfully'));
    return route;
  } else {
    console.log(chalk.yellow('✖  It will become an absolute path'));
    return path.resolve(route);
  };
};

// Verificar la existencia del archivo en el directorio.
const verifyFileDirectory = (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.access(directoryPath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    // Error
      if (err) {
        console.error(chalk.red(
          `✖ ${directoryPath} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`));
        reject(err);
        return;
      } else {
        console.log(chalk.green(`✔ ${directoryPath} exists, and it is writable`));
        console.log(directoryPath);
        resolve(true);
        return directoryPath;
      }
    });
  });
};

// Obteniendo los Links de la ruta asignada.
const getLinks = (directoryPath) => {
  fs.readFile(directoryPath.toString(), 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      const links = markdownLinkExtractor(data);
      // Ejecuta la función indicada una vez por cada elemento del array.
      links.forEach(function(link) {
        function checkStatus(res) {
          counter = 0;
          if (res.ok) { // Status 200 - Solicitud Exitosa. 
            return console.log(chalk.green('✔ ', res.statusText), res.status, link, ++counter, ' link');
          } else {
          // console.log('Hubo un problema con la petición en este link: ', res.statusText, link);
            throw MyCustomError('This link is broken: ', res.statusText, link, res.status);
          }
        }
        fetch(link)
          .then(checkStatus)
          .catch(res => console.log(chalk.red('✖'), 'This link is broken: ', chalk.red(link)));
      });
    }
  });
};

module.exports = {
  isPathAbsolute,
  verifyFileDirectory,
  getLinks
};