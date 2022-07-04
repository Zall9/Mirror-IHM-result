import Rainbow from 'rainbowvis.js';
/**
 * renvoie une couleur en fonction du nombre de tentatives et de la difficulté de l'exercice
 * @param nbTentatives - Nombre de Tentatives
 * @param difficulte - la difficulté de l'exo
 * @returns la couleur est renvoyée.
 */
export const colorGradient = (nbTentatives) => {
  // console.log('colorGradient param', nbTentatives);
  const rainbow = new Rainbow();
  rainbow.setNumberRange(-1, ~~nbTentatives + 1);
  rainbow.setSpectrum('white', 'green', 'yellow', 'red');
  //apres tps moyen #ffdb00
  //avant #80c000
  let selected = '';
  for (let i = 0; i < nbTentatives; i++) {
    let hexColour = rainbow.colorAt(i);
    selected = '#' + hexColour;
    // console.log('mycolor', selected);
  }
  // console.log(typeof selected);
  return selected;
};
