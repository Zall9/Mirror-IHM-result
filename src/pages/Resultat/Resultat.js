import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import TableEtudiantExerciceComponent from '@components/TableEtudiantExerciceComponent/TableEtudiantExerciceComponent';
import PourcentEtuParDifficulte from '@components/PourcentEtuParDifficulte/PourcentEtuParDifficulte';

const Resultat = () => {
  return (
    <Box>
      <Navigation />
      <TableEtudiantExerciceComponent />
      <PourcentEtuParDifficulte />
    </Box>
  );
};

export default Resultat;
