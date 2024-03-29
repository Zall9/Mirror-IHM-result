import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Button,
} from '@mui/material';

// import redux/store
import { useSelector } from 'react-redux';
import { getExercises } from '@stores/Exercises/exercisesSlice';
import { etudiantParser, etudiantUnParser } from '@components/Utilitaires/Etudiant/etudiantParser';

const TableEtudiantExercice = () => {
  const exercices = useSelector(getExercises);
  let navigate = useNavigate();

  let etudiantTrie = exercices.reduce((acc, exercice) => {
    if (acc[exercice.idEtu]) {
      acc[exercice.idEtu].push(exercice);
    } else {
      acc[exercice.idEtu] = [exercice];
    }
    return acc;
  }, {});

  const redirection = (event) => {
    let uri = '/resultat/' + etudiantUnParser(event.currentTarget.innerText.toLowerCase());
    navigate(uri);
  };

  return (
    <Paper style={{ width: '100%' }}>
      <TableContainer>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Étudiant</TableCell>
              <TableCell>Exercices</TableCell>

              {/* {exercices.map((exercice, key) => (
              <TableCell key={key + 'title'}>{'Exercices' + key}</TableCell>
            ))} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(etudiantTrie).map(([idEtu, exercices]) => (
              <TableRow key={idEtu} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Button onClick={redirection} sx={{ textTransform: 'none   !important' }}>
                    {etudiantParser(idEtu)}
                  </Button>
                </TableCell>
                {exercices.map((exercice, key) => (
                  <TableCell key={key} style={{ minWidth: 10 }}>
                    {exercice.nomExo}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableEtudiantExercice;
