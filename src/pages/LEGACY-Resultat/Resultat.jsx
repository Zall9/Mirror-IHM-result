import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import TableEtudiantExercice from '@components/TableEtudiantExercice/TableEtudiantExercice';
import PourcentEtuParDifficulte from '@components/PourcentEtuParDifficulte/PourcentEtuParDifficulte';

const Resultat = () => {
  return (
    <Box>
      <Navigation />
      <TableEtudiantExercice />
      <PourcentEtuParDifficulte />
    </Box>
  );
};

export default Resultat;
