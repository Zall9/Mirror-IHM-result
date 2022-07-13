import React from 'react';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import Row from './RowResultatComplet/RowResultatComplet';
import Box from '@mui/material/Box';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import AfficheBoiteExercice from './AfficheBoiteExercice/AfficheBoiteExercice';

const ResultatCompletEtudiant = (param /*, seance*/) => {
  const idEtu = param.idEtu;

  const exercices = useSelector(getExercices).filter((exo) => exo.idEtu == idEtu);
  exercices.sort(triTab);

  // tri les résultats en fonction du fait qu'il soit fini ou non et de la date des soumissions
  function triTab(exercice1, exercice2) {
    if (exercice1.estFini == false) {
      return -1;
    }
    if (exercice2.estFini == false) {
      return 1;
    }
    return exercice2.debut.valueOf() - exercice1.debut.valueOf();
  }

  function createData(exo, nomExo, nbTenta, temps, difficulte, themes, history) {
    return {
      exo,
      nomExo,
      nbTenta,
      temps,
      difficulte,
      themes,
      history,
    };
  }

  function calculTempsMinutes(debut, fin) {
    return Math.floor((Date.parse(debut) - Date.parse(fin)) / 60000);
  }

  const rows = [];
  let i = 0;
  let temps = 0;
  for (const exercice of exercices) {
    if (exercice.estFini == true) {
      temps = calculTempsMinutes(
        exercice.tentatives[exercice.tentatives.length - 1].dateSoumission,
        exercice.debut,
      );
    } else {
      temps = calculTempsMinutes(Date(), exercice.debut);
    }
    const tentative = [];
    for (let i = 0; i < exercice.tentatives.length; i++) {
      if (i == 0) {
        tentative.push({
          dateSoumission: exercice.tentatives[i].dateSoumission,
          logErreurs: exercice.tentatives[i].logErreurs,
          tempsSoumission: calculTempsMinutes(
            exercice.tentatives[i].dateSoumission,
            exercice.debut,
          ),
          soumissionNumber: i,
        });
      } else {
        tentative.push({
          dateSoumission: exercice.tentatives[i].dateSoumission,
          logErreurs: exercice.tentatives[i].logErreurs,
          tempsSoumission: calculTempsMinutes(
            exercice.tentatives[i].dateSoumission,
            exercice.tentatives[i - 1].dateSoumission,
          ),
          soumissionNumber: i,
        });
      }
    }
    rows.push(
      createData(
        i == 0 ? 'En Cours' : i.toString(),
        exercice.nomExo,
        exercice.tentatives.length,
        temps,
        exercice.difficulte,
        exercice.themes.join(' '),
        tentative,
      ),
    );
    i++;
  }

  //Calcul nb etudiants de la session

  let scoreSeance = 0;
  exercices.map((exo) => {
    if (exo.estFini) {
      scoreSeance += exo.difficulte;
    }
  });
  return (
    <Box>
      <h2 align="center"> Score : {scoreSeance}</h2>
      <h2>progression résumée : </h2>
      <AfficheBoiteExercice listeExercices={exercices} />

      <h2>progression détaillée :</h2>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">
                <h2>Exercice</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Nom Exo</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Nb Tentatives</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Temps passé (en m)</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Difficulté</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Thèmes</h2>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.exo} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultatCompletEtudiant;
