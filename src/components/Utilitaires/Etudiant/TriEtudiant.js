export function triEtudiants(listeEtudiantsExos, methode, reverseTri, exoValides) {
  switch (methode) {
    case 'alphabetique':
      console.log('avant tri', listeEtudiantsExos);
      listeEtudiantsExos.sort(triIdAlphabetique);
      console.log('tri alphabetique', listeEtudiantsExos);
      break;
    case 'nbExercice':
      listeEtudiantsExos.sort(compareNbExercice);
      break;
    case 'dateDerniereSoumission':
      listeEtudiantsExos.sort(compareDateDerniereSoumission);
      break;
    case 'tempsDepuisDernierExo':
      listeEtudiantsExos.sort(triParTempsDepuisDernierExo);
      break;
    case 'difficulte':
      listeEtudiantsExos.sort(triParDifficulte);
      break;
  }
  if (reverseTri == 'true') listeEtudiantsExos = listeEtudiantsExos.reverse();
  if (exoValides != 'all') {
    const tmpList = [];
    const estValide = exoValides === 'valides';
    for (const etu of listeEtudiantsExos) {
      const tmpNewListExo = etu.listeExos.filter((exo) => estValide === exo.estFini);
      if (tmpNewListExo.length != 0) tmpList.push({ idEtu: etu.idEtu, listeExos: tmpNewListExo });
    }
    listeEtudiantsExos = tmpList;
  }
  return listeEtudiantsExos;
}
/**
 * Fonction qUI compare le nombre d'exercices effectués par deux élèves
 * @param exosEtu1 - le premier étudiant
 * @param exosEtu2 - le deuxième étudiant
 * @returns 1 si le premier à fait moins d'exercice que le deuxième.
 *          -1 sinon
 *
 */
export function compareNbExercice(exosEtu1, exosEtu2) {
  let listeExoEtu1 = exosEtu1.listeExos;
  let listeExoEtu2 = exosEtu2.listeExos;

  if (listeExoEtu1.length < listeExoEtu2.length) {
    return -1;
  } else {
    return 1;
  }
}

/**
 * Fonction qui compare la date de la dernière soumission de deux étudiants
 * @param exosEtu1 - le premier étudiant
 * @param exosEtu2 - le deuxième étudiant
 * @returns le nombre de tentatives que l'élève a faites sur l'exercice.
 */
export function compareDateDerniereSoumission(exosEtu1, exosEtu2) {
  let listeExoEtu1 = exosEtu1.listeExos;
  let listeExoEtu2 = exosEtu2.listeExos;

  // Gerer le début de la session ou tous les étudiants n'ont pas forcement d'exercice
  if (listeExoEtu2.lentgh == 0) {
    return 1;
  }
  if (listeExoEtu1.lentgh == 0) {
    return -1;
  }

  // On trouve le dernier exercice de chaque étudiant
  let dernierExoEtu1 = -1;
  let dernierExoEtu2 = -1;

  listeExoEtu1.map((exo) => {
    if (!exo.estFini) {
      // Temps en miliseconde depuis 1er janvier 1970, 00:00:00 UTC
      let debutMilis = Date.parse(exo.debut);
      let debutMilisDernierExo = Date.parse(dernierExoEtu1.debut);
      if (debutMilis > debutMilisDernierExo) {
        dernierExoEtu1 = exo;
      }
    }
  });

  listeExoEtu2.map((exo) => {
    if (!exo.estFini) {
      // Temps en miliseconde depuis 1er janvier 1970, 00:00:00 UTC
      let debutMilis = Date.parse(exo.debut);
      let debutMilisDernierExo = Date.parse(dernierExoEtu2.debut);
      if (debutMilis > debutMilisDernierExo) {
        dernierExoEtu2 = exo;
      }
    }
  });

  // cas ou un étudiant a validé tous ces exercices
  if (dernierExoEtu2 == -1 || dernierExoEtu2.tentatives.length == 0) {
    return 1;
  }
  if (dernierExoEtu1 == -1 || dernierExoEtu1.tentatives.length == 0) {
    return -1;
  }

  // cas général

  // récuperer la derniere tentative
  let derniereTentativeEtu1 = dernierExoEtu1.tentatives[dernierExoEtu1.tentatives.length - 1];
  let derniereTentativeEtu2 = dernierExoEtu2.tentatives[dernierExoEtu2.tentatives.length - 1];

  if (
    Date.parse(derniereTentativeEtu1.dateSoumission) <
    Date.parse(derniereTentativeEtu2.dateSoumission)
  ) {
    return 1;
  } else if (
    Date.parse(derniereTentativeEtu1.dateSoumission) >
    Date.parse(derniereTentativeEtu2.dateSoumission)
  ) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * Fonction qui compare deux étudiants : le plus petit sera celui qui a fait une soumission il y a le plus longtemps
 * @param exosEtu1 - le premier étudiant
 * @param exosEtu2 - le deuxième étudiant
 * @returns le nombre de tentatives que l'élève a faites sur l'exercice.
 */
export function triParTempsDepuisDernierExo(exosEtu1, exosEtu2) {
  let listeExoEtu1 = exosEtu1.listeExos;
  let listeExoEtu2 = exosEtu2.listeExos;

  if (listeExoEtu2.lentgh == 0) {
    return 1;
  }
  if (listeExoEtu1.lentgh == 0) {
    return -1;
  }

  // On trouve le dernier exercice de chaque étudiant
  let dernierExoEtu1 = -1;
  let dernierExoEtu2 = -1;

  listeExoEtu1.map((exo) => {
    if (!exo.estFini) {
      // Temps en miliseconde depuis 1er janvier 1970, 00:00:00 UTC
      let debutMilis = Date.parse(exo.debut);
      let debutMilisDernierExo = Date.parse(dernierExoEtu1.debut);
      if (debutMilis > debutMilisDernierExo) {
        dernierExoEtu1 = exo;
      }
    }
  });

  listeExoEtu2.map((exo) => {
    if (!exo.estFini) {
      // Temps en miliseconde depuis 1er janvier 1970, 00:00:00 UTC
      let debutMilis = Date.parse(exo.debut);
      let debutMilisDernierExo = Date.parse(dernierExoEtu2.debut);
      if (debutMilis > debutMilisDernierExo) {
        dernierExoEtu2 = exo;
      }
    }
  });

  // cas ou un étudiant a validé tous ces exercices
  if (dernierExoEtu2 == -1) {
    return 1;
  }
  if (dernierExoEtu1 == -1) {
    return -1;
  }

  // cas général
  if (Date.parse(dernierExo1.debut) < Date.parse(dernierExo2.debut)) {
    return 1;
  } else if (Date.parse(dernierExo1.debut) > Date.parse(dernierExo2.debut)) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * fonction de tri suivant l'ordre alphabétique des exercices
 * @param exosEtu1 - le premier étudiant
 * @param exosEtu2 - le deuxième étudiant
 * @returns le nombre de tentatives que l'élève a faites sur l'exercice.
 */
export function triIdAlphabetique(exosEtu1, exosEtu2) {
  if (exosEtu1.idEtu < exosEtu2.idEtu) {
    console.log('__', exosEtu1.idEtu, exosEtu2.idEtu);
    return -1;
  } else if (exosEtu1.idEtu > exosEtu2.idEtu) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * prend deux liste d'exercices d'étudiants et renvoie un nombre qui représente la
 * différence entre la difficulté des exercices que les deux objets ont terminés
 * @param exosEtu1 - les exercices du premier élève
 * @param exosEtu2 - les exercices du deuxième élève
 * @returns La différence entre les notes des deux élèves.
 */
export function triParDifficulte(exosEtu1, exosEtu2) {
  let pointsEtu1 = 0;
  let pointsEtu2 = 0;
  const listeExoEtu1 = exosEtu1.listeExos;
  const listeExoEtu2 = exosEtu2.listeExos;
  listeExoEtu1.map((exo) => {
    if (exo.estFini) {
      pointsEtu1 += exo.difficulte;
    }
  });
  listeExoEtu2.map((exo) => {
    if (exo.estFini) {
      pointsEtu2 += exo.difficulte;
    }
  });

  return pointsEtu1 - pointsEtu2;
}
