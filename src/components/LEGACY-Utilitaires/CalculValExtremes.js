/**
 * Calcule le score max des différents étudiants via la liste des exos d'une session
 *
 * @param listeExoSession la liste des exercices (souvent d'une session)
 * @return le score max de l'étudiant de la liste
 */
function calculValExtremes(listeExoSession) {
  let listeEtu = {};
  for (let i = 0; i < listeExoSession.length; i++) {
    listeExoSession[i].listeExos.map((exo) => {
      listeEtu[exo.idEtu] = (listeEtu[exo.idEtu] ?? 0) + (exo.estFini ? exo.difficulte : 0);
    });
  }

  const maxVal = Math.max.apply(null, Object.values(listeEtu));
  const minVal = Math.min.apply(null, Object.values(listeEtu));
  return {
    min: minVal,
    max: maxVal,
  };
}

export default calculValExtremes;
