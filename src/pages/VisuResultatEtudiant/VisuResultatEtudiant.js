import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import VisuResultatEtudiantComponent from '@components/VisuResultatEtudiant/VisuResultatEtudiantComponent';

const VisuResultatEtudiant = () => {
  //TODO : Choisir la session (pour l instant session1) :
  return (
    <Box>
      <Navigation />

      <h2 align="center"> État actuel de la séance : </h2>

      <VisuResultatEtudiantComponent />
    </Box>
  );
};

export default VisuResultatEtudiant;
