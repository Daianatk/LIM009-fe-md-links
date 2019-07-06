import mdLinks from '../src/mdlinks.js';
const fetchMock = require('../__mocks__/node-fetch');
import mock from 'mock-fs';
import process from 'process';
import path from 'path';

fetchMock.config.sendAsJson = false;
fetchMock
  .mock('https://github.com/Daianatk/md-links', 200)
  .mock('http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175', 200)
  .mock('https://www.googler.ts', 'No existe')
  .mock('https://www.google.com/searc', 404)
  .mock('*', 200);

beforeEach(() => {
  mock({
    'example': {
      'README.md': 'Leeme!!!! ![Github]https://github.com/Daianatk/md-links ![Google]https://www.google.com/searc',
      'example1': {
        'README.md': '![Markdown](https://es.wikipedia.org/wiki/Markdown)(Es un tipo de archivo con extension)'
      },
    },
  });
});
afterEach(mock.restore);

describe('mdlinks', () => {
  it('deberia retornar un array de objetos con los status, con parametro validate true', (done) => {
    mdLinks(path.join(process.cwd(), 'example'), {validate: true}).then(result => {
      const resultFromFunctionMdLinks = [ { 
        href: 'https://github.com/Daianatk/md-links',
        text: 'https://github.com/Daianatk/md-links',
        file: path.join(process.cwd(), 'example\\README.md'),
        status: 200, 
        statusText: 'OK'
      },
      { 
        href: 'https://www.google.com/searc',
        text: 'https://www.google.com/searc',
        file: path.join(process.cwd(), 'example\\README.md'),
        status: 404, 
        statusText: 'Fail'
      }
      ];
      expect(result).toEqual(resultFromFunctionMdLinks);
      done();
    });
  });
  it('deberia retornar un mensaje de Ruta Incorrecta', (done) => {
    mdLinks(path.join(process.cwd(), 'example1'), {validate: false}).then(result => {
      const resultFromFunctionMdLinks = [ { 
        href: 'https://github.com/md-links',
        text: 'https://github.com/md-links',
        file: path.join(process.cwd(), 'README.md'),
        status: 200, 
        statusText: 'OK'
      },
      { 
        href: 'https://www.google.com/',
        text: 'https://www.google.com/',
        file: path.join(process.cwd(), 'README.md'),
        status: 404, 
        statusText: 'Fail'
      }
      ];
      expect(result).toEqual(resultFromFunctionMdLinks);
      done();
    });
  });
});
it('Deberia retornar no se encontraron archivos.md', (done) => {
  mdLinks(path.join(process.cwd(), 'example')).then(result => {
    const resultFromFunctionMdLinks = false ;
    expect(result).toEqual(resultFromFunctionMdLinks);
    done();
  });
});