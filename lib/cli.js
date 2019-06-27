#!/usr/bin/env node
//  Libreria utilizada para pintar declaraciones en CLI
"use strict";

var path = require('path');

var chalk = require('chalk');

var fetch = require('node-fetch'); //  Archivo JS externo con las funciones.


var mdLinks = require('../src/index.js'); //  Args proporcionados en CLI


var route = process.argv[2];
mdLinks.isPathAbsolute(route);
mdLinks.isFile(route);
mdLinks.isDirectory(route);
mdLinks.readFile(route);
mdLinks.readDirectory(route);
mdLinks.isMarkdown(route);
mdLinks.readAllFiles(route);
mdLinks.extractedLink(route);
mdLinks.validateLink(route);