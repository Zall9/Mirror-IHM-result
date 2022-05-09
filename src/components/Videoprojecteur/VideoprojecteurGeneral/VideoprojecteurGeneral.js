import * as React from 'react';

import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const VideoprojecteurGeneral = () => {
  const exercices = useSelector(getExercices);
  /*
  let tabEtu = [];
  for (const exo of exercices) {
    if (!tabEtu.includes(exo.idEtu)) {
      // pas sur de la syntaxe
      etudiants.push({ nomEtu: exo.idEtu, nbValid: 0 });
    }
  } // tabEtu contient une liste de tous les étudiants avec un nbExercice validé, pour l'instant à 0

  for (const etu of tabEtu) {
    etu.nbValid = exercices.filter(
      (exercice) => exercice.idEtu == etu.nomEtu && exercice.estFini == True,
    ).length;
  }
  // tabEtu contient une liste de tous les étudiants avec un nbExercice validé, pour l'instant à 0

  // récuperer celui qui a fait le plus d'exercices
  const maxExo = 0;
  for (const etu of tabEtu) {
    if (etu.nbValid > max) {
      maxExo = etu.nbValid;
    }
  }

  // creer un tableau à l'indice 0, le nb de personnes ayant fait 0 exercices ...
  const result = [];
  for (let i = 0; i < maxExo + 1; i++) {
    result.push(tabEtu.filter((etudiant) => etudiant.nbValid == i).length);
  }
*/
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // Crée un dicionnaire  avec pour chaque etudiant le nombre d'exercice qu'ils ont faits

  let etuParExerciceDico = exercices.reduce((acc, exercice) => {
    if (exercice.estFini) {
      if (acc[exercice.idEtu]) {
        acc[exercice.idEtu] += 1;
      } else {
        acc[exercice.idEtu] = 1;
      }
    }
    return acc;
  }, {});

  // Crée un dictionaire ou pour nombre d'exercice réaliser on compte le nombre d'étudiant
  let nbEtudiantParNombreExercicesFini = {};

  for (let idEtu in etuParExerciceDico) {
    if (nbEtudiantParNombreExercicesFini[etuParExerciceDico[idEtu]]) {
      nbEtudiantParNombreExercicesFini[etuParExerciceDico[idEtu]] += 1;
    } else {
      nbEtudiantParNombreExercicesFini[etuParExerciceDico[idEtu]] = 1;
    }
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', margin: '2vw' }}>
      {Object.entries(nbEtudiantParNombreExercicesFini).map(([nbExoFini, nbEtu]) => (
        <ListItem key={nbExoFini} disableGutters>
          <ListItemText primary={` ${nbEtu} étudiants ont validé ${nbExoFini} exercices`} />
        </ListItem>
      ))}
    </List>
  );
};

export default VideoprojecteurGeneral;
