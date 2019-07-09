const path = require('path');
const fs = require('fs');
const mymarked = require('marked');

//  Verifica si es Ruta Absoluta=True, sino es Relativa= False y la convierte en absoluta
const isPathAbsolute = (route) => {
  if (path.isAbsolute(route)) {
    return route;
  } else {
    return path.resolve(route);
  };
};

//  Verifica si es Archivo= True, sino es False
const isFile = (route) => {
  const stats = fs.statSync(route);
  return stats.isFile();
};

//  Verifica si es Directorio= True, sino es False
const isDirectory = (route) => {
  const stats = fs.statSync(route);
  return stats.isDirectory();
};

//  Lee Archivo
const readFile = (route) => {
  let file = fs.readFileSync(route, 'utf-8');
  return file;
};

//  Lee Directorio y guarda los links en un array
const readDirectory = (route) => {
  let arrDirectory = fs.readdirSync(route, 'utf-8');
  return arrDirectory.map((element) => {
    return path.join(route, element);
  });
};

//  Verifica si es un archivo .md= true, sino es False
const isMarkdown = (str) => {
  let markdown = path.extname(str) === '.md';
  return markdown;
};

//  Lee todos los archivos buscando archivos .md y los muestra
const readAllFiles = (route) => {
  let array = [];    
  if (isFile(route)) {
    if (isMarkdown(route)) {
      array.push(route);
    }
  } else { // muestra directorio o archivo que contenga .md
    let dir = fs.readdirSync(route);
    dir.forEach((file) => {
      const arrayNew = readAllFiles(path.join(route, file));
      array = array.concat(arrayNew);
    });     
  }
  return array;  
};

//  Lee todos los archivos y muestra href, text y file.
const extractedLink = (route) => {
  let arrayOfFile = readAllFiles(isPathAbsolute(route));
  let arrObj = [];
  arrayOfFile.forEach((filePath) => {
    const contentMd = readFile(filePath);
    let renderer = new mymarked.Renderer();
    renderer.link = (href, title, text) => {
      arrObj.push({ href: href, text: text, file: filePath });
    };
    mymarked(contentMd, { renderer: renderer });
  });
  return arrObj;
};

module.exports = {
  isPathAbsolute,
  isFile,
  isDirectory,
  readFile,
  readDirectory,
  isMarkdown,
  readAllFiles,
  extractedLink
};