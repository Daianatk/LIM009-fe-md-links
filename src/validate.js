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
          // console.log(val);
          resolve(val);
        } else {
          val.status = res.status,
          val.statusText = 'Fail';
          // console.log(val);
          resolve(val);                      
        }
      }).catch((error) => {
        val.status = error.message('No Existe');
        val.statusText = 'Fail';
        // console.log(error);
        resolve(val);
      });
    }),
  );
  return Promise.all(runLinks);
};
// validateLinks(route).then(res => console.log(res));

module.exports = {
  validateLinks
};