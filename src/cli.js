#!/usr/bin/env node
//  Archivo JS externo con las funciones.
const mdLinks = require('./mdlinks.js');
//  Args proporcionados en CLI
const [,, ...args] = process.argv;
const route = args[0];

mdLinks.isPathAbsolute(route);
mdLinks.isFile(route);
mdLinks.isDirectory(route);
mdLinks.readFile(route);
mdLinks.readDirectory(route);
mdLinks.isMarkdown(route);
mdLinks.readAllFiles(route);
mdLinks.extractedLink(route);
mdLinks.validateLink(route);