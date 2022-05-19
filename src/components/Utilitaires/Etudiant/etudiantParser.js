/**
 * prend un idEtu comme argument et renvoie une chaîne nom + prenom
 * @param idEtu - l'identifiant de l'étudiant
 * @returns nom + prenom avec premiere lettre en majuscule
 */
export function etudiantParser(idEtu) {
  let prenom = idEtu.split('.')[0];
  let nom = idEtu.split('.')[1];
  let prenomMaj = prenom.charAt(0).toUpperCase() + prenom.slice(1);

  let nomMaj = nom.charAt(0).toUpperCase() + nom.slice(1);
  return prenomMaj + ' ' + nomMaj;
}

export function etudiantUnParser(idEtu) {
  return idEtu.replace(' ', '.');
}
