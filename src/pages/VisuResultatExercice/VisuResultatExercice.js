import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import VisuResultatExerciceComponent from '@components/VisuResultatExercice/VisuResultatExerciceComponent';

const VisuResultatExercice = () => {
  return (
    <Box>
      <Navigation />
      <VisuResultatExerciceComponent />
    </Box>
  );
};

export default VisuResultatExercice;
