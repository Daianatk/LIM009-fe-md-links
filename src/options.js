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

module.exports = statsPath;