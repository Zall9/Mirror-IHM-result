/**
 *  Cherche l'exercice courant de l'etudiant passé en parametre
 * @param {Array} exercices
 * @param {String} idEtudiant
 * @returns exercice que l'etudiant est en train de réaliser
 */
export function recupereExerciceCourantEtudiant(exercices, idEtudiant) {
  // parcourir les exercices de l'étudiant et garder le temps mini si il est fini
  // let derniereSoumission = 0;
  // let idExo = exercices[0].idExo;
  // exercices.map((exo) => {
  //   if (exo.tentatives.length == 0) {
  //     idExo = derniereSoumission < exo.debut ? exo.idExo : idExo;
  //     derniereSoumission = derniereSoumission < exo.debut ? exo.debut : derniereSoumission;
  //   } else {
  //     idExo =
  //       derniereSoumission < exo.tentatives[exo.tentatives.length - 1].dateSoumission
  //         ? exo.id
  //         : idExo;
  //     derniereSoumission =
  //       derniereSoumission < exo.tentatives[exo.tentatives.length - 1].dateSoumission
  //         ? exo.debut
  //         : exo.tentatives[exo.tentatives.length - 1].dateSoumission;
  //   }
  // });

  // TODO : Demander a Clément comment ça fonctionne crash sinon
  let exerciceCourant = exercices.find((exo) => exo.idEtu === idEtudiant && exo.estFini === false);
  return exerciceCourant;
}
