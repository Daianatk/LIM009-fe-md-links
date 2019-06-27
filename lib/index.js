"use strict";

var path = require('path');

var fs = require('fs');

var chalk = require('chalk');

var mymarked = require('marked');

var fetch = require('node-fetch');

var route = 'C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/example/README.md'; //  let route= '/Users/Soul/Desktop/LIM009-fe-md-links';
//  let route= '/home/daiana/Desktop/LIM009-fe-md-links';
//  Verifica si es Ruta Absoluta=True, sino es Relativa= False y la convierte en absoluta

var isPathAbsolute = function isPathAbsolute(route) {
  var abs = path.isAbsolute(route);

  if (abs) {
    return route;
  } else {
    return path.resolve(route);
  }

  ;
}; // console.log(path.isAbsolute(route));
// console.log(path.resolve(route));
//  Verifica si es Archivo= True, sino es False


var isFile = function isFile(route) {
  var stats = fs.statSync(route);
  return stats.isFile();
}; //  console.log(isFile('./example/README.md'));
//  Verifica si es Directorio= True, sino es False


var isDirectory = function isDirectory(route) {
  var stats = fs.statSync(route);
  return stats.isDirectory();
}; //  console.log(isDirectory('./example'));
//  Lee Archivo


var readFile = function readFile(route) {
  var file = fs.readFileSync(route, 'utf-8');
  return file;
}; // console.log(readFile('./example/README.md'));
//  Lee Directorio y guarda los links en un array


var readDirectory = function readDirectory(route) {
  var arrDirectory = fs.readdirSync(route, 'utf-8');
  return arrDirectory.map(function (element) {
    return path.join(route, element);
  });
}; // console.log(readDirectory('./example'));
//  Verifica si es un archivo .md= true, sino es False


var isMarkdown = function isMarkdown(str) {
  var markdown = path.extname(str) === '.md';
  return markdown;
}; // console.log(isMarkdown('./example/README.md'));
//  Lee todos los archivos buscando archivos .md y los muestra


var readAllFiles = function readAllFiles(route) {
  var array = [];

  if (isFile(route)) {
    if (isMarkdown(route)) {
      array.push(route);
    }
  } else {
    // muestra directorio o archivo que contenga .md
    var dir = fs.readdirSync(route);
    dir.forEach(function (file) {
      var arrayNew = readAllFiles(path.join(route, file));
      array = array.concat(arrayNew);
    });
  }

  return array;
}; // console.log(readAllFiles(route));
//  Lee todos los archivos y muestra href, text y file.


var extractedLink = function extractedLink(route) {
  var arrayOfFile = readAllFiles(isPathAbsolute(route));
  var arrObj = [];
  arrayOfFile.forEach(function (filePath) {
    var contentMd = readFile(filePath);
    var renderer = new mymarked.Renderer();

    renderer.link = function (href, title, text) {
      arrObj.push({
        href: href,
        text: text,
        file: filePath
      });
    };

    mymarked(contentMd, {
      renderer: renderer
    });
  });
  return arrObj;
}; // console.log(extractedLink(route));
//  Lee todos los archivos y muestra su status y si esta OK o Fail


var validateLinks = function validateLinks(route) {
  var objLinks = extractedLink(route);
  var runLinks = objLinks.map(function (val) {
    return new Promise(function (resolve) {
      var href = fetch(val.href);
      return href.then(function (res) {
        if (res.status >= 200 && res.status < 400) {
          val.status = res.status;
          val.statusText = res.statusText;
          console.log(val);
          resolve(val);
        } else {
          val.status = res.status, val.statusText = 'Fail';
          console.log(val);
          resolve(val);
        }
      })["catch"](function (error) {
        val.status = error.message;
        val.statusText = 'Fail';
        console.log(val);
        resolve(val);
      });
    });
  });
  return Promise.all(runLinks);
};

console.log(validateLinks(route));
module.exports = {
  isPathAbsolute: isPathAbsolute,
  isFile: isFile,
  isDirectory: isDirectory,
  readFile: readFile,
  readDirectory: readDirectory,
  isMarkdown: isMarkdown,
  readAllFiles: readAllFiles,
  extractedLink: extractedLink,
  validateLinks: validateLinks
};