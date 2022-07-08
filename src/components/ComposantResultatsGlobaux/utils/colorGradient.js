import Rainbow from 'rainbowvis.js';
/**
 * prend un intervalle(entier) et un tableau de couleurs(de taille 3), et renvoie une couleur qui se situe entre les
 * couleurs du tableau
 * @param interval - Le nombre de tentatives.
 * @param colors - un tableau de 3 couleurs dont la première et la dernière serviront à créer le
 * dégradé.
 * @returns renvoie une chaîne qui correspond à une couleur comprise dans le gradient.
 */
const _makeRainbow = (interval, colors) => {
  const rainbow = new Rainbow();
  rainbow.setNumberRange(-1, ~~interval + 1);
  rainbow.setSpectrum(colors[0], colors[1], colors[2]);
  let selected = '';
  for (let i = 0; i < interval; i++) {
    let hexColour = rainbow.colorAt(i);
    selected = '#' + hexColour;
  }
  return selected;
};
/**
 * prends un nombre de tentatives et un booléen, et renvoie une couleur
 * @param nbTentatives - le nombre de tentatives effectuées par l'utilisateur
 * @param boolean - si vrai renvoie une couleur sinon une autre.
 * @returns Une chaîne d'une couleur.
 */
export const colorGradient = (nbTentatives, boolean) => {
  if (nbTentatives > 0) {
    if (boolean) {
      return _makeRainbow(nbTentatives, ['#00ff11', '80c000', 'yellow']);
    } else {
      return _makeRainbow(nbTentatives, ['yellow', 'orange', 'red']);
    }
  }
  return 'white';
};
