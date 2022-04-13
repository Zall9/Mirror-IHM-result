import React from 'react';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import Row from './RowResultatComplet/RowResultatComplet';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const ResultatCompletEtudiant = (param /*, seance*/) => {
  // const [data, setData] = useState([]);
  const idEtu = param.idEtu;
  const exercices = useSelector(getExercices).filter(filtreResultat);
  exercices.sort(triTab);

  // filtre les résultats TODO : sessions
  function filtreResultat(exercice) {
    console.log(exercice.tentatives);
    if (exercice.idEtu == idEtu) {
      return true;
    }
    return false;
  }

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

  const rows = [];
  let i = 0;
  let temps = 0;
  for (const exercice of exercices) {
    if (exercice.estFini == true) {
      temps =
        exercice.tentatives[exercice.tentatives.length - 1].dateSoumission.valueOf() -
        exercice.debut.valueOf();
    } else {
      temps = Date.now().valueOf() - exercice.debut.valueOf();
    }
    console.log(exercice);
    const tentative = [];
    for (let i = 0; i < exercice.tentatives.length; i++) {
      if (i == 0) {
        tentative.push({
          dateSoumission: exercice.tentatives[i].dateSoumission,
          logErreurs: exercice.tentatives[i].logErreurs,
          tempsSoumission:
            exercice.tentatives[i].dateSoumission.valueOf() - exercice.debut.valueOf(),
        });
      } else {
        tentative.push({
          dateSoumission: exercice.tentatives[i].dateSoumission,
          logErreurs: exercice.tentatives[i].logErreurs,
          tempsSoumission:
            exercice.tentatives[i].dateSoumission.valueOf() -
            exercice.tentatives[i - 1].dateSoumission.valueOf(),
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

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Exercice</TableCell>
            <TableCell align="right">Nom Exo</TableCell>
            <TableCell align="right">nb tentatives</TableCell>
            <TableCell align="right">temps passé</TableCell>
            <TableCell align="right">difficulté</TableCell>
            <TableCell align="right">thèmes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultatCompletEtudiant;
