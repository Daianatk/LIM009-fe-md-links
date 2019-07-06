const path = require('path');
const options = require('../src/options.js');

const mock = [{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: path.join(process.cwd(), 'example\\README.md'),
},
{
  href: 'https://nodejs.org/',
  text: 'Node.js/',
  file: path.join(process.cwd(), 'example\\README.md'),
},
{
  href: 'https://nodes.org/',
  text: '',
  file: path.join(process.cwd(), 'example\\README.md'),
},
{
  href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
  text: 'md-links',
  file: path.join(process.cwd(), 'example\\README.md'),
}];

const output1 = { Total: 4, Unique: 4, Broken: 0 };

const validations = [{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: path.join(process.cwd(), 'example\\README.md'),
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://nodejs.org/',
  text: 'Node.js',
  file: path.join(process.cwd(), 'example\\README.md'),
  status: 200,
  statusText: 'OK',
},
{
  href: 'https://nodes.org/',
  text: '',
  file: path.join(process.cwd(), 'example\\README.md'),
  statusText: 'Fail',
},
{
  href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
  text: 'md-links',
  file: path.join(process.cwd(), 'example\\README.md'),
  status: 200,
  statusText: 'OK',
}];

const output2 = { Total: 4, Unique: 4, Broken: 1 };

describe('Prueba de la función options ', () => {
  it('options cuando solo se adjunta --stats', () => {
    expect(options(mock)).toEqual(output1);
  });
  it('options cuando solo se adjunta --stats y --validate', () => {
    expect(options(validations)).toEqual(output2);
  });
});