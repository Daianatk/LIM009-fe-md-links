import { validateLinks } from '../src/validate.js';
const fetchMock = require('../__mocks__/node-fetch');

const file = '/home/diana/Desktop/LIM009-fe-md-links/example';

const ouputValidate = [
  {
    'file': '/home/diana/Desktop/LIM009-fe-md-links/example/README.md',
    'href': 'https://github.com/Daianatk/md-links',
    'message': 'OK', 
    'status': 200,
    'text': 'https://github.com/Daianatk/md-links'
  },
  {
    'file': '/home/diana/Desktop/LIM009-fe-md-links/example/README.md',
    'href': 'https://www.googler.ts',
    'message': 'Fail',
    'status': 'No existe',
    'text': 'Googler'
  },
  {
    'file': '/home/diana/Desktop/LIM009-fe-md-links/example/README.md',
    'href': 'https://www.google.com/searc',
    'text': 'https://www.google.com/searc',
    'status': 404,
    'message': 'Fail'
  },
];


describe('validateLinks', () => {
  it('validateLinks deberia ser una funcion', () => {
    expect(typeof validateLinks).toBe('function');
  });
  it('Deberia regresar un objeto con los datos de los links', (done) => {
    fetchMock
      .mock('https://github.com/Daianatk/md-links', 200)
      .mock('http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175', 200)
      .mock('https://www.googler.ts', 'No existe')
      .mock('https://www.google.com/searc', 404)
      .mock('*', 200);
    const ApliValidateLinks = validateLinks(file);
    ApliValidateLinks.then(response => {
      expect(response).toEqual(ouputValidate);
      done();
    })
      .catch(error => done());
  });
});