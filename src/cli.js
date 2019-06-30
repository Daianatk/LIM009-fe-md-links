#!/usr/bin/env node
//  Library used to color statements in CLI
const path = require('path');
const chalk = require('chalk');
const fetch = require('node-fetch');
//  Archivo JS externo con las funciones.
const mdLinks = require('./index.js');
// const validateLinks = require('./options.js');
//  Args proporcionados en CLI
let route = process.argv[2];

mdLinks.isPathAbsolute(route);
mdLinks.isMarkdown(route);
mdLinks.readAllFiles(route);
mdLinks.extractedLink(route);
mdLinks.validateLinks(route);
// validateLinks.statsPath(route);
// mdLinks.mdLinks(route);