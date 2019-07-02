"use strict";

var fetch = require('node-fetch');

var _require = require('../src/index.js'),
    extractedLink = _require.extractedLink; //  Lee todos los archivos, muestra su status y si esta OK o Fail


var validateLinks = function validateLinks(route) {
  var objLinks = extractedLink(route);
  var runLinks = objLinks.map(function (val) {
    return new Promise(function (resolve) {
      var href = fetch(val.href);
      return href.then(function (res) {
        if (res.status >= 200 && res.status < 400) {
          val.status = res.status;
          val.statusText = res.statusText; // console.log(val);

          resolve(val);
        } else {
          val.status = res.status, val.statusText = 'Fail'; // console.log(val);

          resolve(val);
        }
      })["catch"](function (error) {
        val.status = error.message('No Existe');
        val.statusText = 'Fail'; // console.log(error);

        resolve(val);
      });
    });
  });
  return Promise.all(runLinks);
}; // validateLinks(route).then(res => console.log(res));


module.exports = {
  validateLinks: validateLinks
};