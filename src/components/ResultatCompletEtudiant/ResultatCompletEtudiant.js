import React from 'react';
import { useSelector } from 'react-redux';
import { selectData } from '@stores/Exercices/exercicesSlice';
import PropTypes from 'prop-types';
import Row from './Row';

import {
  makeStyles,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
} from '@mui/material';

const ResultatCompletEtudiant = (idEtu /*, seance*/) => {
  // const [data, setData] = useState([]);
  const exercices = useSelector(selectData).filter(filtreResultat(idEtu /*, seance*/));
  exercices.sort(triTab);

  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  // filtre les résultats TODO : sessions
  function filtreResultat(idEtu, /*seance,*/ exercice) {
    if (exercice.idEtu == idEtu /*&& exercice.idSession == seance*/) {
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
      temps = exercice.tentatives[-1].dateSoumission.valueOf() - exercice.debut.valueOf();
    } else {
      temps = Date.now().valueOf() - exercice.debut.valueOf();
    }
    rows.append(
      createData(
        i == 0 ? 'En Cours' : i,
        exercice.nomExo,
        exercice.tentatives.length,
        temps,
        exercice.difficulte,
        exercice.themes.join(' '),
        exercice.tentatives,
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
