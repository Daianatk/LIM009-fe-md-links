const path = require('path');
const fs = require('fs');
const mymarked = require('marked');
const fetch = require('node-fetch');

let route = 'C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/example/README.md';
//  let route= '/Users/Soul/Desktop/LIM009-fe-md-links';
//  let route= '/home/daiana/Desktop/LIM009-fe-md-links';

//  Verifica si es Ruta Absoluta=True, sino es Relativa= False y la convierte en absoluta
const isPathAbsolute = (route) => {
  let abs = path.isAbsolute(route);
  if (abs) {
    return route;
  } else {
    return path.resolve(route);
  };
};
// console.log(path.isAbsolute(route));
// console.log(path.resolve(route));

//  Verifica si es Archivo= True, sino es False
const isFile = (route) => {
  const stats = fs.statSync(route);
  return stats.isFile();
};
//  console.log(isFile('./example/README.md'));

//  Verifica si es Directorio= True, sino es False
const isDirectory = (route) => {
  const stats = fs.statSync(route);
  return stats.isDirectory();
};
//  console.log(isDirectory('./example'));

//  Lee Archivo
const readFile = (route) => {
  let file = fs.readFileSync(route, 'utf-8');
  return file;
};
// console.log(readFile('./example/README.md'));

//  Lee Directorio y guarda los links en un array
const readDirectory = (route) => {
  let arrDirectory = fs.readdirSync(route, 'utf-8');
  return arrDirectory.map((element) => {
    return path.join(route, element);
  });
};
// console.log(readDirectory('./example'));

//  Verifica si es un archivo .md= true, sino es False
const isMarkdown = (str) => {
  let markdown = path.extname(str) === '.md';
  return markdown;
};
// console.log(isMarkdown('./example/README.md'));

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
// console.log(readAllFiles(route));

//  Lee todos los archivos y muestra href, text y file.
let extractedLink = (route) => {
  let arrayOfFile = readAllFiles(isPathAbsolute(route));
  let arrObj = [];
  arrayOfFile.forEach((filePath) => {
    const mdContent = readFile(filePath);
    let renderer = new mymarked.Renderer(mdContent);
    renderer.link = (href, __, text) => {
      arrObj.push({ href, text, file: filePath });
    };
    mymarked(mdContent, { renderer: renderer });
  });
  return arrObj;
};
// console.log(extractedLink(route));

const validateLink = (route) => {
  let arrayLinks = extractedLink(route).map(link => {
    return fetch(link.href)
      .then(res => {
        if (res.status <= 399) {
          link.code = res.status;
          link.status = res.statusText;
        } else {
          link.code = res.status;
          link.status = 'Fail';
        }
        return link;
      })
      .catch(element => {
        link.code = element.code;
        link.status = 'Fail';
        return link;
      });
  });
  return Promise.all(arrayLinks);
};
console.log(validateLink(route));

module.exports = {
  isPathAbsolute,
  isFile,
  isDirectory,
  readFile,
  readDirectory,
  isMarkdown,
  readAllFiles,
  extractedLink,
  validateLink
};