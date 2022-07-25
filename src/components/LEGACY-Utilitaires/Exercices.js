/**
 *  Cherche l'exercice courant de l'etudiant passé en parametre
 * @param {Array} exercices
 * @param {String} idEtudiant
 * @returns exercice que l'etudiant est en train de réaliser
 */
export function recupereExerciceCourantEtudiant(exercices, idEtudiant) {
  // On récupère les exercices de l'étudiant
  const exercicesEtudiant = Object.values(exercices).filter(
    (exercice) => exercice.idEtu === idEtudiant,
  );

  // parcourir les exercices de l'étudiant et garder le temps mini si il est fini
  let derniereSoumission = 0;
  let idExo = exercicesEtudiant[0].idExo;

  exercicesEtudiant.forEach((exo) => {
    // Si l'étudiant n'a aucune tentative
    if (exo.tentatives.length === 0) {
      idExo = derniereSoumission < exo.debut ? exo.idExo : idExo;
      derniereSoumission = derniereSoumission < exo.debut ? exo.debut : derniereSoumission;
    } else {
      idExo =
        derniereSoumission < exo.tentatives[exo.tentatives.length - 1].dateSoumission
          ? exo.id
          : idExo;
      derniereSoumission =
        derniereSoumission < exo.tentatives[exo.tentatives.length - 1].dateSoumission
          ? exo.debut
          : exo.tentatives[exo.tentatives.length - 1].dateSoumission;
    }
  });
  return Object.values(exercices).find((exo) => exo.idExo === idExo);
}
