import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import VisuResultatExerciceComponent from '@components/VisuResultatExercice/VisuResultatExercice';

const VisuResultatExercice = () => {
  return (
    <Box>
      <Navigation />
      <VisuResultatExerciceComponent />
    </Box>
  );
};

export default VisuResultatExercice;
