import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import Exercice from './Exercice';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CompareArrows from '@mui/icons-material/CompareArrows';
import { useNavigate } from 'react-router-dom';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

// renvoyer un composant par exercice
const construitListeExercices = (ListeExos, exercices) =>
  ListeExos.map((objetIdListeExo, index) => {
    // component="div" pour supprimer le warning (https://github.com/mui/material-ui/issues/19827)
    return (
      <Item key={index} component="div">
        <Exercice
          idExo={objetIdListeExo.idExo}
          listeEtudiants={objetIdListeExo.listeEtus}
          nbEtu={recupereNbEtudiant(exercices)}
        />
      </Item>
    );
  });

const choixSessionSelect = (listeIdSession, choixSession, handleChangeSession) => {
  return (
    <Box>
      <FormControl sx={{ minWidth: 200 }}>
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
    <Box sx={{ minWidth: 200 }}>
      <FormControl>
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

const arrowReverseTri = (reverseTri, handleReverseTri) => {
  return (
    <Box>
      <IconButton
        id="reversingArrow"
        onClick={handleReverseTri}
        label="rev"
        title="Inverser l'ordre du tri"
        sx={{
          '&:hover': {
            color: 'black',
          },
          color: reverseTri == 'false' ? 'black' : 'white',
          backgroundColor: reverseTri == 'false' ? 'white' : 'lightgray',
        }}
      >
        <CompareArrows sx={{ transform: 'rotate(90deg)' }} />
      </IconButton>
    </Box>
  );
};

const VisuResultatExerciceComponent = (props) => {
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

  const [reverseTri, setReverse] = React.useState(
    sessionStorage.getItem('rev') ? sessionStorage.getItem('rev') : 'false',
  );

  const handleReverseTri = (event) => {
    const newValue = sessionStorage.getItem('rev') == 'true' ? 'false' : 'true';
    sessionStorage.setItem('rev', newValue);
    setReverse(newValue);
  };

  let navigate = useNavigate();
  const redirectionResultat = () => {
    navigate('/videoprojecteur');
  };

  useEffect(() => {}, [choixSession, choixTri, reverseTri]);
  // récupérer tous les exercices
  const exercices = useSelector(getExercices);
  const idSession = choixSession;

  // filtre suivant difficulté
  // récupéré toutes les difficultés des exercices
  // ajouter une checkbox pour chaque difficulté
  // on considere qu'elles sont toutes cochées de base
  // si on décoche cela supprime les exercices correspondant

  // filtre suivant

  // collecter tous les étudiants de chaque exercice
  // clé : idExo, valeur : listeEtudiants
  let ExosEtudiants = {};
  // tableau contenant tous les exercices pour pouvoir les trier
  let ListeExercices = [];

  exercices.map((exo) => {
    if (exo.idSession == idSession) {
      if (ExosEtudiants[exo.idExo] === undefined) {
        ExosEtudiants[exo.idExo] = [];
        ListeExercices.push(exo.idExo);
      }
      // On ajoute l'exercice à l'étudiant
      ExosEtudiants[exo.idExo].push(exo);
    }
  });

  // On créer un tableau avec les exercices et leurs étudiants
  let ListeExosEtudiants = [];
  Object.entries(ExosEtudiants).map(([idExo, listeEtus]) => {
    ListeExosEtudiants.push({ idExo: idExo, listeEtus: listeEtus });
  });

  // Trier ce tableau (par défaut alphabétique)
  triEtudiants(ListeExosEtudiants, choixTri, reverseTri);

  const listeIdSession = recupereSessions(exercices);

  const menuTri = [
    'alphabetique',
    'nbExercice',
    'nbExerciceNonValide',
    'nbExerciceValide',
    'dateDerniereSoumission',
    'difficulte',
  ];

  return (
    <div>
      <Box
        sx={{
          position: 'relative',
          justifyContent: 'flex-start',
          display: 'inline-flex',
          width: '100%',
        }}
      >
        {choixSessionSelect(listeIdSession, choixSession, handleChangeSession)}

        {choixTriSelect(menuTri, choixTri, handleChangeTri)}

        {arrowReverseTri(reverseTri, handleReverseTri)}

        <IconButton
          onClick={redirectionResultat}
          title="Passer à la vue tableau"
          sx={{ align: 'right' }}
        >
          <FormatListNumberedIcon />
        </IconButton>
      </Box>
      <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />}>
        {construitListeExercices(ListeExosEtudiants, exercices)}
      </Stack>
    </div>
  );
};

export default VisuResultatExerciceComponent;

//###########################################################################

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

function recupereNbEtudiant(exercices) {
  let etudiants = [];
  exercices.map((exo) => {
    if (!etudiants.includes(exo.idEtu)) {
      etudiants.push(exo.idEtu);
    }
  });
  return etudiants.length;
}

// TODO : verifier que les fonctions de tri fonctionnent correctement
function triEtudiants(listeExercicesEtudiants, methode, reverseTri) {
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
