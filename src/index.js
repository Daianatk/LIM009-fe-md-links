const path = require('path');
const fs = require('fs');

let route= '/Users/Soul/Desktop/LIM009-fe-md-links';
//let route= '/home/daiana/Desktop/LIM009-fe-md-links';

//Verifica si es Ruta Absoluta=True, sino es Relativa=False
const isPathAbsolute = (route) => {
  let abs = path.isAbsolute(route);
  if(abs){
      return route;
  } else {
      return path.resolve(route);
  }
  //return abs
}
console.log(path.isAbsolute(route));

//Verifica si es Archivo= True, sino es False
const isFile = (route)=>{
  const stats = fs.statSync(route);
  return stats.isFile();
}
console.log(isFile('index.js'));

//Verifica si es Directorio= True, sino es False
const isDirectory = (route)=>{
  const stats = fs.statSync(route);
  return stats.isDirectory()
}

console.log(isDirectory(route));

//Lee Archivo
const readFile =(route) =>{
  let file = fs.readFileSync(route, 'utf-8');
  return file
}
console.log(readFile('index.js'));

//Lee Directorio
const readDirectory =(route) =>{
  let arrDirectory = fs.readdirSync(route, 'utf-8');
  return arrDirectory.map((element) => {
      return  path.join(route , element)
  })
}
console.log(readDirectory(route));

//Verifica si es un archivo .md= true, sino es False
const isMarkdown = (str) => {
  let markdown = path.extname(str) === '.md'
  return markdown
}
console.log(isMarkdown('README.md'));

//Lee todos los archivos buscando archivos .md y los muestra
const readAllFiles = (route) =>{
  let arr =[];    
  if (isFile(route)) {
      if(isMarkdown(route)){
          arr.push(route)
      }
  } else { // muestra directorio o archivo que contenga .md
      let dir =fs.readdirSync(route)
      dir.forEach((child) => {
          const arrNew = readAllFiles(path.join(route, child))
        arr = arr.concat(arrNew);
      });     
  }
  return arr  
}
console.log(readAllFiles(route));
