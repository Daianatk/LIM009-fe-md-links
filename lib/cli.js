#!/usr/bin/env node
//  Libreria utilizada para pintar declaraciones en CLI
const path = require('path');
const chalk = require('chalk');
const fetch = require('node-fetch');
//  Archivo JS externo con las funciones.
const mdLinks = require('../src/index.js');
//  Args proporcionados en CLI
const route = process.argv[2];

mdLinks.isPathAbsolute(route);
mdLinks.verifyFileDirectory(route);
mdLinks.getLinks(route);