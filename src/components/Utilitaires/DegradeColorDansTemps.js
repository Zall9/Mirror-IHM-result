/**
 * Fonction qui permet de calculer la couleur d'un élément en fonction d'un exercice
 * Toutes les couleurs de la forme "#RRGGBB"
 *
 * @param exo l'exercice qu'il faut tester
 * @param minColor la couleur minimale du dégradé
 * @param maxColor la couleur maximale du dégradé
 * @param indiceCalculator {(exo) => number} fonction qui va calculer l'indice du dégradé
 * @param guardColor couleur qui est appelée si une certaine condition est remplie
 * @param guardCondition {(exo) => boolean} condition qui permet d'appliquer
 *                        une couleur définie pour des exceptions
 * @return la couleur choisie en string
 */
function getColor(
  exo,
  minColor,
  maxColor,
  indiceCalculator /*: (exo) => number*/,
  guardColor = '#000000',
  guardCondition = (_) => false /*: (exo) => boolean*/,
) {
  if (guardCondition(exo)) {
    return guardColor;
  }
  const c1 = hexToList(minColor);
  const c2 = hexToList(maxColor);
  let tp = indiceCalculator(exo);
  tp = tp > 1 ? 1 : tp < 0 ? 0 : tp;
  const cr = [
    Math.floor(c1[0] * (1 - tp) + c2[0] * tp),
    Math.floor(c1[1] * (1 - tp) + c2[1] * tp),
    Math.floor(c1[2] * (1 - tp) + c2[2] * tp),
  ];
  return '#' + ((1 << 24) + (cr[0] << 16) + (cr[1] << 8) + cr[2]).toString(16).slice(1);
}

const hexToList = (hexa) => {
  if (hexa.length != 7 || hexa[0] != '#')
    throw new Error('Erreur hexToList : mauvaise couleur passée :' + hexa);
  try {
    return [
      parseInt(hexa.slice(1, 3), 16),
      parseInt(hexa.slice(3, 5), 16),
      parseInt(hexa.slice(5, 7), 16),
    ];
  } catch (e) {
    throw new Error('Erreur hexToList : mauvaise couleur passée :' + hexa);
  }
};

export default getColor;
