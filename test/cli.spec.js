const fetchMock = require('../__mocks__/node-fetch');
fetchMock.config.sendAsJson = false;
const path = require('path');
const optionValidate = require('../src/cli.js');

fetchMock
  .mock('https://github.com/Daianatk/md-links', 200)
  .mock('https://www.google.com/searc', 400)
  .mock('ttps://github.com/worktopper/xhb', 300)
  .mock('https://es.altavista.com/', 300);
		

describe('Cli optionValidate', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof optionValidate).toBe('function');
  });

  it('Deberia retornar  el total y los links unicos', (done) => {
    optionValidate(path.resolve('./example'), { stats: true }).then(result => {
		    expect(result).toBe('Total: 4\nUnique: 3');
      done();
    });		
  });

  it('Deberia retornar el total y los links unicos', (done) => {
    optionValidate(path.resolve('./example'), { stats: true, validate: true}).then(result => {
		    expect(result).toBe('Total: 4\nUnique: 3\nBroken: 1');
      done();
    });		
  });

  it('Deberia retornar uns lista de los links ', (done) => {
    optionValidate(path.resolve('./example/README.md'), {}).then(result => {
      expect(result).toBe(`${path.resolve('./example/README.md')} https://es.altavista.com/ Altavista\n`);
      done();
    });		
  });

  it('Deberia retornar uns lista de los links validados  ', (done) => {
    optionValidate(path.resolve('./example/README.md'), { validate: true}).then(result => {
		    expect(result).toBe(`${path.resolve('./example/README.md')} https://es.altavista.com/ Altavista 300 OK\n`);
      done();
    });		
  });

  it('Deberia retornar un mensaje de error ', (done) => {
    optionValidate(path.resolve('./example/README.md'), { validate: true}).then(result => {
      expect(result).toBe(`ENOENT: no such file or directory, stat '${path.resolve('./example/README.md')}'`);			
      done();
    });		
  });
});