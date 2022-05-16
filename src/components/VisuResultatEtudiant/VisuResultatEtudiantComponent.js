import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import Etudiant from './Etudiant';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import * as triUtils from '../Utilitaires/TriEtudiant';
import { recupereSessions } from '../Utilitaires/SessionsFromExercice';
const construitListeEtudiants = (ListeEtudiantsExos) =>
  ListeEtudiantsExos.map((objetIdEtuListeExo, index) => {
    // component="div" pour supprimer le warning (https://github.com/mui/material-ui/issues/19827)
    return (
      <Item key={index} component="div">
        <Etudiant idEtu={objetIdEtuListeExo.idEtu} listeExercices={objetIdEtuListeExo.listeExos} />
      </Item>
    );
  });

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

  // Trier ce tableau (par défaut alphabétique)
  triUtils.triEtudiants(ListeEtudiantsExos, choixTri);

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
