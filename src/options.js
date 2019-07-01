/* const route = [{
  href: 'https://github.com/user/repo/other_file.md',
  text: 'linkind',
  file: '/Escritorio/LIM009-fe-md-links/example/README.md',
  status: 404,
  statusText: 'Fail'
}, {
  href: 'https://youtube.com',
  text: 'link',
  file: '/Escritorio/LIM009-fe-md-links/practica/example/README.md',
  status: 'ECONNRESET',
  statusText: 'Fail'
}, {
  href: 'https://github.com/Daianatk',
  text: 'github',
  file: '/Escritorio/LIM009-fe-md-links/example/README.md',
  status: 200,
  statusText: 'OK'
}, {
  href: 'https://github.com/Daiana//-',
  text: 'mi github',
  file: '/Escritorio/LIM009-fe-md-links/example/README.md',
  status: 404,
  statusText: 'Fail'
}, {
  href: 'https://github.com/Daianatk',
  text: 'mi github',
  file: '/LIM009-fe-md-links/example/README.md',
  status: 200,
  statusText: 'OK'
}]; */

// Opciones de validacion muestra el total, unique y broken
const statsPath = (route) => {
  const total = route.map((val) => {
    return val.href;
  });
  const arrUnique = [...new Set(total)];
  const broken = route.filter((val) => {
    return val.statusText === 'Fail';
  });
  return {
    Total: total.length,
    Unique: arrUnique.length,
    Broken: broken.length
  };
};

// console.log(statsPath(route));

module.exports = statsPath;