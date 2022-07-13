import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import ResultatCompletEtudiant from '@components/ResultatCompletEtudiant/ResultatCompletEtudiant';
import { useParams } from 'react-router-dom';
import { etudiantParser } from '../../components/Utilitaires/Etudiant/etudiantParser';
const ResultatEtudiant = () => {
  var idEtu = useParams().etu;
  const etudiant = etudiantParser(idEtu);
  return (
    <Box>
      <Navigation />
      <h2 align="center"> Carte de l&apos;étudiant : {etudiant}</h2>
      <ResultatCompletEtudiant idEtu={idEtu} />
    </Box>
  );
};

export default ResultatEtudiant;
