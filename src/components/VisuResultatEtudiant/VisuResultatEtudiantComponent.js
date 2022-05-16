import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import Etudiant from './Etudiant';
import IconButton from '@mui/material/IconButton';
import CompareArrows from '@mui/icons-material/CompareArrows';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import Box from '@mui/material/Box';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import * as triUtils from '../Utilitaires/TriEtudiant';
import { recupereSessions } from '../Utilitaires/SessionsFromExercice';
import calculValExtremes from '../Utilitaires/CalculValExtremes';
import { useNavigate } from 'react-router-dom';

function construitListeEtudiants(ListeEtudiantsExos) {
  const valExtremes = calculValExtremes(ListeEtudiantsExos);
  return ListeEtudiantsExos.map((objetIdEtuListeExo, index) => {
    // component="div" pour supprimer le warning (https://github.com/mui/material-ui/issues/19827)
    return (
      <Item key={index} component="div">
        <Etudiant
          idEtu={objetIdEtuListeExo.idEtu}
          valExtremes={valExtremes}
          listeExercices={objetIdEtuListeExo.listeExos}
        />
      </Item>
    );
  });
}

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

const VisuResultatEtudiantComponent = (props) => {
  const sessionStorageNameSession = 'idSes';
  const sessionStorageNameTri = 'tri';

  const [choixSession, setSession] = React.useState(
    sessionStorage.getItem(sessionStorageNameSession)
      ? sessionStorage.getItem(sessionStorageNameSession)
      : '',
  );
  const [choixTri, setTri] = React.useState(
    sessionStorage.getItem('tri') ? sessionStorage.getItem('tri') : 'alphabetique',
  );

  const [reverseTri, setReverse] = React.useState(
    sessionStorage.getItem('rev') ? sessionStorage.getItem('rev') : 'false',
  );

  const handleReverseTri = (event) => {
    const newValue = sessionStorage.getItem('rev') == 'true' ? 'false' : 'true';
    sessionStorage.setItem('rev', newValue);
    setReverse(newValue);
  };

  // récupérer tous les exercices pour chaque  étudiant
  const exercices = useSelector(getExercices);
  const idSession = choixSession;

  let navigate = useNavigate();
  const redirectionResultat = () => {
    navigate('/avancement');
  };

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

  // Trier ce tableau (par défaut alphabétique)
  triUtils.triEtudiants(ListeEtudiantsExos, choixTri, reverseTri);

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
      <Box
        sx={{
          position: 'relative',
          justifyContent: 'flex-start',
          display: 'inline-flex',
          width: '100%',
        }}
      >
        <MenuDeroulant
          Items={listeIdSession}
          state={choixSession}
          setState={setSession}
          storageName={sessionStorageNameSession}
          name="Session"
        />
        <MenuDeroulant
          Items={menuTri}
          state={choixTri}
          setState={setTri}
          storageName={sessionStorageNameTri}
          name="Tri"
        />
        {arrowReverseTri(reverseTri, handleReverseTri)}
        <IconButton
          onClick={redirectionResultat}
          title="Passer à la vue tableau"
          sx={{ align: 'right' }}
        >
          <FormatListNumberedIcon />
        </IconButton>
      </Box>

      <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={0}>
        {construitListeEtudiants(ListeEtudiantsExos)}
      </Stack>
    </div>
  );
};

export default VisuResultatEtudiantComponent;
