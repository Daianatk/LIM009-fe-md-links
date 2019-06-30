const path = require('path');
const fs = require('fs');
const mymarked = require('marked');
const fetch = require('node-fetch');

// let route = 'C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/example/README.md';
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
// console.log(extractedLink(route));

//  Lee todos los archivos, muestra su status y si esta OK o Fail
const validateLinks = (route) => {
  const objLinks = extractedLink(route);
  const runLinks = objLinks.map((val) =>
    new Promise((resolve) => {
      const href = fetch(val.href);
      return href .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          val.status = res.status;
          val.statusText = res.statusText;
          console.log(val);
          resolve(val);
        } else {
          val.status = res.status,
          val.statusText = 'Fail';
          console.log(val);
          resolve(val);                      
        }
      }).catch((error) => {
        val.status = error.message('No Existe');
        val.statusText = 'Fail';
        console.log(error);
        resolve(val);
      });
    }),
  );
  return Promise.all(runLinks);
};
// validateLinks(route).then(res => console.log(res));

module.exports = {
  isPathAbsolute,
  isFile,
  isDirectory,
  readFile,
  readDirectory,
  isMarkdown,
  readAllFiles,
  extractedLink,
  validateLinks
};