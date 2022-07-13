// TODO : verifier que les fonctions de tri fonctionnent correctement
export function triEtudiants(listeExercicesEtudiants, methode, reverseTri) {
  switch (methode) {
    case 'alphabetique':
      listeExercicesEtudiants.sort(triIdAlphabetique);
      break;
    case 'nbExercice':
      listeExercicesEtudiants.sort(compareNbEtudiants);
      break;
    case 'nbExerciceNonValide':
      listeExercicesEtudiants.sort(compareNbExerciceNonValide);
      break;
    case 'nbExerciceValide':
      listeExercicesEtudiants.sort(compareNbExerciceValide);
      break;
    case 'dateDerniereSoumission':
      listeExercicesEtudiants.sort(compareDateDerniereSoumission);
      break;
    case 'tempsDepuisDernierExo':
      listeExercicesEtudiants.sort(triNbTentative);
      break;
    case 'difficulte':
      listeExercicesEtudiants.sort(triParDifficulte);
      break;
  }
  if (reverseTri == 'true') listeExercicesEtudiants = listeExercicesEtudiants.reverse();
}

/**
 * Fonction qUI compare le nombre d'étudiants ayant validé un exercice
 * @param exo1 - le premier éxercice
 * @param exo2 - le deuxième éxercice
 * @returns 1 si le premier exercice a été moins validé que le deuxième.
 *          -1 sinon
 *
 */
function compareNbExerciceValide(exo1, exo2) {
  let listeEtu = [exo1.listeEtus, exo2.listeEtus];
  const nbValideExos = [0, 0];

  for (let i = 0; i < 2; i++) {
    for (const exoInst of listeEtu[i]) {
      nbValideExos[i] += exoInst.estFini ? 1 : 0;
    }
  }
  return nbValideExos[0] - nbValideExos[1];
}

/**
 * Fonction qUI compare le nombre d'étudiants étant en train de faire cet exercice
 * @param exo1 - le premier éxercice
 * @param exo2 - le deuxième éxercice
 * @returns 1 si le premier exercice est moins "utilisé" que le deuxième.
 *          -1 sinon
 *
 */

function compareNbExerciceNonValide(exo1, exo2) {
  let listeEtu = [exo1.listeEtus, exo2.listeEtus];
  const nbValideExos = [0, 0];

  for (let i = 0; i < 2; i++) {
    for (const exoInst of listeEtu[i]) {
      nbValideExos[i] += exoInst.estFini ? 0 : 1;
    }
  }
  return nbValideExos[1] - nbValideExos[0];
}

/**
 * Fonction qUI compare le nombre d'étudiants ayant effectués un exercice
 * @param exo1 - le premier éxercice
 * @param exo2 - le deuxième éxercice
 * @returns 1 si le premier exercice a été moins fait que le deuxième.
 *          -1 sinon
 *
 */
function compareNbEtudiants(exo1, exo2) {
  let listeEtu1 = exo1.listeEtus;
  let listeEtu2 = exo2.listeEtus;

  if (listeEtu1.length < listeEtu2.length) {
    return -1;
  } else {
    return 1;
  }
}

/**
 * Fonction qui compare la date de la dernière soumission de deux exercices
 * @param exo1 - le premier éxercice
 * @param exo2 - le deuxième éxercice
 * @returns  1 si il existe une soumission du premier il y a moins longtemps
 */
function compareDateDerniereSoumission(exo1, exo2) {
  let listeEtu1 = exo1.listeEtus;
  let listeEtu2 = exo2.listeEtus;

  // On trouve la dernière soumission
  let derniereSoumissionExo1 = -1;
  let derniereSoumissionExo2 = -1;

  // parcours la liste des soumissions faites pour cet exercice
  listeEtu1.map((exo) => {
    if (!exo.estFini) {
      // Temps en miliseconde depuis 1er janvier 1970, 00:00:00 UTC
      let debutMilis = Date.parse(exo.debut);
      let debutMilisDernierExo = Date.parse(derniereSoumissionExo1.debut);
      if (debutMilis < debutMilisDernierExo) {
        derniereSoumissionExo1 = exo;
      }
    }
  });
  listeEtu2.map((exo) => {
    if (!exo.estFini) {
      // Temps en miliseconde depuis 1er janvier 1970, 00:00:00 UTC
      let debutMilis = Date.parse(exo.debut);
      let debutMilisDernierExo = Date.parse(derniereSoumissionExo2.debut);
      if (debutMilis < debutMilisDernierExo) {
        derniereSoumissionExo2 = exo;
      }
    }
  });
  // cas ou un étudiant a validé tous ces exercices
  if (derniereSoumissionExo2 == -1) {
    return 1;
  }
  if (derniereSoumissionExo1 == -1) {
    return -1;
  }
  // cas général
  return (
    Date.parse(derniereSoumissionExo1.dateSoumission) -
    Date.parse(derniereSoumissionExo2.dateSoumission)
  );
}

/**
 * Fonction qui compare deux exos : le plus petit sera celui qui a le moins de tentatives
 * @param exo1 - le premier exercice
 * @param exo2 - le deuxième exercice
 * @returns 1 si exo1 a moins de tentatives recues que exo2, -1 sinon
 */
function triNbTentative(exo1, exo2) {
  let listeEtu = [exo1.listeEtus, exo2.listeEtus];
  const nbTentaExos = [0, 0];

  for (let i = 0; i < 2; i++) {
    for (const exoInst of listeEtu[i]) {
      nbTentaExos[i] += exoInst.tentatives.length;
    }
  }
  return nbTentaExos[0] - nbTentaExos[1];
}

/**
 * fonction de tri suivant l'ordre alphabétique des exercices
 * @param exo1 - le premier exercice
 * @param exo2 - le deuxième exercice
 * @returns 1 si exo1 est avant exo2 dans l'ordre alphabétique
 */
function triIdAlphabetique(exo1, exo2) {
  if (exo1.listeEtus[0].nomExo < exo2.listeEtus[0].nomExo) {
    return -1;
  } else if (exo1.idExo > exo2.idExo) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * Fonction qui compare deux exos : le plus petit sera celui qui est le plus facile
 * @param exo1 - le premier exercice
 * @param exo2 - le deuxième exercice
 * @returns >0 si exo1 est plus facile que exo2, =0 si mm difficulte, <0 sinon
 */
function triParDifficulte(exo1, exo2) {
  return exo1.listeEtus[0].difficulte - exo2.listeEtus[0].difficulte;
}
