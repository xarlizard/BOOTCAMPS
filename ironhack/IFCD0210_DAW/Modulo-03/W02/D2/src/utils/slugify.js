// Funcion para convertir un string en un slug
const slugify = (str) => {
  return str.toLowerCase().replace(/\s+/g, "-");
};

export default slugify;
