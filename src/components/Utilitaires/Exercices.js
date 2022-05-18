/**
 *  Cherche l'exercice courant de l'etudiant passé en parametre
 * @param {Array} exercices
 * @param {String} idEtudiant
 * @returns exercice que l'etudiant est en train de réaliser
 */
export function recupereExerciceCourantEtudiant(exercices, idEtudiant) {
  let exerciceCourant = exercices.find(
    (exo) => exo.idEtudiant === idEtudiant || exo.estFini === false,
  );
  return exerciceCourant;
}
