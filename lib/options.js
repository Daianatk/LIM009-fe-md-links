"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
var statsPath = function statsPath(route) {
  var total = route.map(function (val) {
    return val.href;
  });

  var arrUnique = _toConsumableArray(new Set(total));

  var broken = route.filter(function (val) {
    return val.statusText === 'Fail';
  });
  return {
    Total: total.length,
    Unique: arrUnique.length,
    Broken: broken.length
  };
}; // console.log(statsPath(route));


module.exports = statsPath;