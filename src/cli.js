#!/usr/bin/env node
// Libraria utilizada para colorear declaraciones en CLI
const chalk = require('chalk');
//  Archivo JS externo con las funciones.
const statsPath = require('./options.js');
const mdLinks = require('./mdlinks.js');
//  Args proporcionados en CLI
const [, , ...args] = process.argv;
const route = args[0];

const options = (element, args) => {
  if (args && args[1] === '--validate') {
    return `${element.file} ${element.href} ${element.status} ${element.statusText} ${element.text}`;
  } else if (args === undefined || !args[1]) {
    return `${element.file} ${element.href} ${element.text}`;
  }
};

const optionValidate = (route, args) => {
  return mdLinks(route, { validate: true }).then(result => {
    const statsTotal = statsPath(result);
    const basic = `Total: ${statsTotal.Total} Unique: ${statsTotal.Unique}`;
    const statsValidate = ` Broken: ${statsTotal.Broken}`;
    if (args && args[1] === '--stats' && !args[2]) {
      return chalk.red.yellow(basic);
    } else if (args && args[1] === '--stats' && args[2] === '--validate') {
      return chalk.green.bold(basic) + chalk.red.bold(statsValidate);
    } else {
      const statsLinks = result.map(element => options(element, args)).toString().replace(/,/g, '\n');
      return (chalk.black.bold(statsLinks));
    }
  });
};

if (require.main === module) {
  optionValidate(route, args).then(result => console.log(result));
}