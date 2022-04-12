import * as React from 'react';
import {
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@mui/material';

// import redux/store
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';

const TableEtudiantExerciceComponent = () => {
  const exercices = useSelector(getExercices);

  let etudiantTrie = exercices.reduce((acc, exercice) => {
    if (acc[exercice.idEtu]) {
      acc[exercice.idEtu].push(exercice);
    } else {
      acc[exercice.idEtu] = [exercice];
    }
    return acc;
  }, {});

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Étudiant</TableCell>
            <TableCell>Exercices</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(etudiantTrie).map(([idEtu, exercices]) => (
            <TableRow key={idEtu} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {idEtu}
              </TableCell>
              <TableCell>
                {exercices.map((exercice, key) => (
                  <Box key={key}>{exercice.nomExo}</Box>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {console.log(etudiantTrie)}
    </TableContainer>
  );
};

export default TableEtudiantExerciceComponent;
