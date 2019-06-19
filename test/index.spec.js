import { isPathAbsolute, isFile, isDirectory, readFile, readDirectory, isMarkdown, readAllFiles } from "../src/index.js";

describe('funcion que indica si la ruta es absoluta', () => {
    it('deberia ser una funcion', () => {
        expect(typeof isPathAbsolute).toBe('function');
     })
    it('deberia retornar true si la ruta es absoluta', () => {
        expect(isPathAbsolute('C:/Users/Programaciòn/Desktop/LIM009-fe-md-links')).toBe('C:/Users/Programaciòn/Desktop/LIM009-fe-md-links');
    })
    it('deberia retornar una ruta absoluta si es relativa', () => {
        expect(isPathAbsolute('C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/src/index.js')).toBe('C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/src/index.js');
    })
});

describe('funcion que indica si es archivo', () => {
    it('deberia ser una funcion', () => {
        expect(typeof isFile).toBe('function');
    })
    it('deberia retornar true si es un archivo', () => {
        expect(isFile('src/index.js')).toBe(true);
    })
    it('deberia retornar false si no es un archivo', () => {
        expect(isFile('src/')).toBe(false);
    })
    it('deberia fallar si la ruta no existe', () => {
        try {
            isFile('index')
        } catch(err) {
            expect(err.code).toBe('ENOENT');
        }        
    })
});

describe('funcion que indica si es una carpeta', () => {
    it('deberia ser una funcion', () => {
        expect(typeof isDirectory).toBe('function');
    })
    it('deberia retornar true si es una carpeta', () => {
        expect(isDirectory('C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/src')).toBe(true);
    })
    it('deberia retornar false si no es una carpeta', () => {
        expect(isDirectory('src/index.js')).toBe(false);
    })
    it('deberia fallar si la carpeta no existe', () => {
        try {
            isDirectory('src')
        } catch(err) {
            expect(err.code).toBe('ENOENT');
        }      
    })
});

describe('funcion que lee un archivo', () => {
    it('deberia ser una funcion', () => {
        expect(typeof readFile).toBe('function');
    })
    it('deberia leer un archivo', () => {
        expect(readFile('C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/src/index.js')).toBe("console.log('index');")
    })
});

describe('funcion que lee una carpeta', () => {
    it('deberia ser una funcion', () => {
        expect(typeof readDirectory).toBe('function');
    })
    it('deberia leer una carpeta y retornar el array', () => {
        expect(readDirectory('C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/src/')).toEqual(["C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/src/cli.js", "C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/src/index.js"])
    })
});

describe('Funcion que identifica si es markdown', () => {
    it('deberia ser una funcion', () => {
        expect(typeof isMarkdown).toBe('function');
    })
    it('deberia retornar true si es markdown', () => {
        expect(isMarkdown('README.md')).toBe(true)
    })
    it('deberia retornar false si no es markdown', () => {
        expect(isMarkdown('index.js')).toBe(false)
    })
});

describe('Funcion que deberia leer todos los archivos .md', () => {
    it('deberia ser una funcion', () => {
        expect(typeof readAllFiles).toBe('function');
    })
})