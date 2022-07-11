/**
 * renvoie l'exercice avec l'idEtu et l'idExo donnés à partir de la liste d'exercices
 * @param idEtu - l'id de l'étudiant
 * @param idExo - l'id de l'exercice
 * @param ListeExo - la liste des exercices
 * @returns l'exercice qui correspond à l'id de l'élève et à l'id de l'exercice.
 */
export const getExoFromIds = (idEtu, idExo, ListeExo) => {
  let res = ListeExo.find((exo) => exo.idEtu == idEtu && exo.idExo == idExo);
  if (res !== undefined && res !== null) {
    return res;
  }
  return -1;
};
