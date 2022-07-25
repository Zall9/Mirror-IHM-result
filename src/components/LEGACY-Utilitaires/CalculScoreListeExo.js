/**
 * Calcule un score à partir d'une liste d'exercices finis ou non
 * On additionne les difficultés de chaque exercice réussi.
 *
 * @param listeExo la liste des exercices (souvent d'un étudiant)
 * @return le score de la liste
 */
function calculScoreListeExo(listeExo) {
  let points = 0;
  listeExo.map((exo) => {
    if (exo.estFini) {
      points += exo.difficulte;
    }
  });
  return points;
}

export default calculScoreListeExo;
