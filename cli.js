#!/usr/bin/env node
const[,, ...args]= process.argv
console.log(`md links ${args}`);

let path = require ('path');

const ruta= `${args}`;
const abs= (ruta) =>{
    if(path.isAbsolute(ruta) === true){
        return console.log('Es una ruta absoluta');
    }else{
        console.log('Es una ruta Relativa');
    }
}
abs(ruta)