/**
 * Fonction qUI récupère toutes les sessions disponibles
 * @param listeEtudiantsExos - liste des exercices
 * @returns un tableau contenant le nom de chaque session trié dans l'ordre chronologique
 */

export function recupereSessions(exercices) {
  let sessions = [];
  exercices.map((exo) => {
    if (!sessions.includes(exo.idSession)) {
      sessions.push(
        exo.idSession,
        //idSession: exo.idSession,
        // dateSoumission: Date.parse(exo.tentatives[exo.tentatives.length - 1].dateSoumission),
      );
    }
  });
  // sessions.sort((a, b) => b.dateSoumission - a.dateSoumission);

  return sessions;
}
