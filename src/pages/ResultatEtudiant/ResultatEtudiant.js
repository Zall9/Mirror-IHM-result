import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import ResultatCompletEtudiant from '@components/ResultatCompletEtudiant/ResultatCompletEtudiant';
import { useParams } from 'react-router-dom';
import etudiantParser from '../../components/Utilitaires/Etudiant/etudiantParser';
const ResultatEtudiant = () => {
  return (
    <Box>
      <Navigation />
      <h2 align="center"> Carte de l&apos;étudiant : {useParams().etu}</h2>
      <ResultatCompletEtudiant idEtu={useParams().etu} />
    </Box>
  );
};

export default ResultatEtudiant;
