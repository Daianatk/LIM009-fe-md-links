const fetch = require('node-fetch');
const { extractedLink } = require('../src/index.js');
//  Lee todos los archivos, muestra su status y si esta OK o Fail
const validateLinks = (route) => {
  const objLinks = extractedLink(route);
  const runLinks = objLinks.map((val) =>
    new Promise((resolve) => {
      const href = fetch(val.href);
      return href .then((res) => {
        if (res.status >= 200 && res.status < 400) {
          val.status = res.status;
          val.statusText = res.statusText;
          resolve(val);
        } else {
          val.status = res.status,
          val.statusText = 'Fail';
          resolve(val);                      
        }
      }).catch((error) => {
        val.status ='No Existe';
        val.statusText = 'Fail';
        resolve(val);
      });
    }),
  );
  return Promise.all(runLinks);
};

module.exports = {
  validateLinks
};