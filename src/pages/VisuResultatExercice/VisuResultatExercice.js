import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import VisuResultatExerciceComponent from '@components/VisuResultatExercice/VisuResultatExerciceComponent';

const VisuResultatExercice = () => {
  return (
    <Box>
      <Navigation />

      <h2 align="center"> État actuel de la séance (vue par exercice) : </h2>

      <VisuResultatExerciceComponent />
    </Box>
  );
};

export default VisuResultatExercice;
