import { validateLinks } from '../src/validate.js';
import { readAllFiles } from '../src/index.js';
import path from 'path';
import fetchMock from '../__mocks__/node-fetch.js';
fetchMock.config.sendAsJson = false;

describe('validateLinks', () => {
  fetchMock
    .mock('https://github.com/Daianatk/md-links', 200)
    .mock('https://book.com/404', 404)
    .mock('https://www.google.com/searc', { throws: 'C:/Users/Programaciòn/Desktop/LIM009-fe-md-links/example/README.md https://www.google.com/searc fail (NO HAY STATUS PORQUE LINK FALLÓ) no' });

  it('debería retornar el código http al hacer la petición http para conocer si el link funciona o no', () => {
    validateLinks(readAllFiles(path.join(process.cwd(), 'example/README.md')))
      .then(data => {
        expect(data).toEqual([{
          href: 'https://github.com/Daianatk/md-links',
          text: 'https://github.com/Daianatk/md-links',
          file: path.join(process.cwd(), 'example/README.md'),
          status: 200,
          ok: 'OK'
        },
        {
          href: 'https://www.google.com/searc',
          text: 'https://www.google.com/searc',
          file: path.join(process.cwd(), 'example/README.md'),
          status: '(NO HAY STATUS PORQUE LINK FALLÓ)',
          ok: 'Fail'
        }]);
      });
  });
});