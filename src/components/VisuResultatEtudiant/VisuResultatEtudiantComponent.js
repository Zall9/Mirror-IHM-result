import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import Etudiant from './Etudiant';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const construitListeEtudiants = (ListeEtudiantsExos) =>
  ListeEtudiantsExos.map((objetIdEtuListeExo, index) => {
    console.log('ETUDIANT :', objetIdEtuListeExo.idEtu);
    // component="div" pour supprimer le warning (https://github.com/mui/material-ui/issues/19827)
    return (
      <Item key={index} component="div">
        <Etudiant idEtu={objetIdEtuListeExo.idEtu} listeExercices={objetIdEtuListeExo.listeExos} />
      </Item>
    );
  });

const choixSessionSelect = (listeIdSession, choixSession, handleChangeSession) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="choix-session">Session</InputLabel>
        <Select
          labelId="session-label"
          id="session-select"
          value={choixSession}
          label="Session"
          onChange={handleChangeSession}
        >
          {listeIdSession.map((idSession, index) => {
            //TODO: afficher les nom de sessions au lieu des ids
            return (
              <MenuItem key={index} value={idSession}>
                {idSession}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

const choixTriSelect = (listeNomChoixTri, choixTri, handleChangeTri) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="choix-tri">Tri</InputLabel>
        <Select
          labelId="tri-label"
          id="tri-select"
          value={choixTri}
          label="Tri"
          onChange={handleChangeTri}
        >
          {listeNomChoixTri.map((nomTri, index) => {
            return (
              <MenuItem key={index} value={nomTri}>
                {nomTri}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

const VisuResultatEtudiantComponent = (props) => {
  const [choixSession, setSession] = React.useState(
    sessionStorage.getItem('idSes') ? sessionStorage.getItem('idSes') : '',
  );

  const handleChangeSession = (event) => {
    sessionStorage.setItem('idSes', event.target.value);
    setSession(event.target.value);
  };

  const [choixTri, setTri] = React.useState(
    sessionStorage.getItem('tri') ? sessionStorage.getItem('tri') : 'alphabetique',
  );

  const handleChangeTri = (event) => {
    sessionStorage.setItem('tri', event.target.value);
    setTri(event.target.value);
  };

  useEffect(() => {}, [choixSession, choixTri]);

  // récupérer tous les exercices pour chaque  étudiant
  const exercices = useSelector(getExercices);
  const idSession = choixSession;

  // collecter tous les exercices de chaque étudiant
  // clé : idEtu, valeur : listeExercices
  let ExosEtudiants = {};
  // tableau contenant tous les étudiants
  let ListeEtudiants = [];

  exercices.map((exo) => {
    if (exo.idSession == idSession) {
      if (ExosEtudiants[exo.idEtu] === undefined) {
        ExosEtudiants[exo.idEtu] = [];
        ListeEtudiants.push(exo.idEtu);
      }
      // On ajoute l'exercice à l'étudiant
      ExosEtudiants[exo.idEtu].push(exo);
    }
  });

  // On créer un tableau avec les étudiants et leurs exercices
  let ListeEtudiantsExos = [];
  Object.entries(ExosEtudiants).map(([idEtu, listeExos]) => {
    ListeEtudiantsExos.push({ idEtu: idEtu, listeExos: listeExos });
  });
  console.log('avant tri', ...ListeEtudiantsExos);

  // Trier ce tableau (par défaut alphabétique)
  triEtudiants(ListeEtudiantsExos, choixTri);
  console.log('après tri', ...ListeEtudiantsExos);

  console.log('listeEtudiantsExos avant appel', exercices);
  const listeIdSession = recupereSessions(exercices);

  const menuTri = [
    'alphabetique',
    'nbExercice',
    'dateDerniereSoumission',
    'tempsDepuisDernierExo',
    'difficulte',
  ];

  return (
    <div>
      {choixSessionSelect(listeIdSession, choixSession, handleChangeSession)}
      {choixTriSelect(menuTri, choixTri, handleChangeTri)}
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={12}
      >
        {construitListeEtudiants(ListeEtudiantsExos)}
      </Stack>
    </div>
  );
};

export default VisuResultatEtudiantComponent;
/**
 * Fonction qUI récupère toutes les sessions disponibles
 * @param listeEtudiantsExos - liste des exercices
 * @returns un tableau contenant le nom de chaque session trié dans l'ordre chronologique
 */

function recupereSessions(exercices) {
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

// TODO : verifier que les fonctions de tri fonctionnent correctement
function triEtudiants(listeEtudiantsExos, methode) {
  switch (methode) {
    case 'alphabetique':
      listeEtudiantsExos.sort(triIdAlphabetique);
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
}

/**
 * Fonction qUI compare le nombre d'exercices effectués par deux élèves
 * @param exosEtu1 - le premier étudiant
 * @param exosEtu2 - le deuxième étudiant
 * @returns 1 si le premier à fait moins d'exercice que le deuxième.
 *          -1 sinon
 *
 */
function compareNbExercice(exosEtu1, exosEtu2) {
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
function compareDateDerniereSoumission(exosEtu1, exosEtu2) {
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
function triParTempsDepuisDernierExo(exosEtu1, exosEtu2) {
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
function triIdAlphabetique(exosEtu1, exosEtu2) {
  if (exosEtu1.idEtu < exosEtu2.idEtu) {
    return -1;
  } else if (exosEtu1.idEtu > exosEtu2.idEtu) {
    return 1;
  } else {
    return 0;
  }
}

// fonction de tri en fonction du nombre d'exercice réussi et leur difficulté
// un exercice de difficulté réussi 5 rapporte 5 points
function triParDifficulte(exosEtu1, exosEtu2) {
  let pointsEtu1 = 0;
  let pointsEtu2 = 0;

  const listeExoEtu1 = exosEtu1.listeExos;
  const listeExoEtu2 = exosEtu2.listeExos;

  listeExoEtu1.map((exo) => {
    if (exo.estFini) {
      // ajouter sa difficulté au score
      pointsEtu1 += exo.difficulte;
    }
  });

  listeExoEtu2.map((exo) => {
    if (exo.estFini) {
      // ajouter sa difficulté au score
      pointsEtu2 += exo.difficulte;
    }
  });

  return pointsEtu1 - pointsEtu2;
}
