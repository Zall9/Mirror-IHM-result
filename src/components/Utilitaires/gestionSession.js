/**
 * Fonction qUI récupère toutes les sessions disponibles
 * @param listeEtudiantsExos - liste des exercices
 * @returns un tableau contenant le nom de chaque session trié dans l'ordre chronologique
 */

export function recupereSessions(sessions) {
  let sessionsId = [];
  sessions.map((session) => {
    if (!sessionsId.includes(session.id)) {
      sessionsId.push(
        session.id,
        //idSession: exo.idSession,
        // dateSoumission: Date.parse(exo.tentatives[exo.tentatives.length - 1].dateSoumission),
      );
    }
  });
  // sessions.sort((a, b) => b.dateSoumission - a.dateSoumission);
  sessionsId.push('all');
  return sessionsId;
}

export function recupereSeance(sessions) {
  let seances = [];
  sessions.map((session) => {
    session.seances.map((seance) => {
      if (!seances.includes(seance.id)) {
        seances.push(seance.id);
      }
    });
  });
  seances.push('all');
  return seances;
}
