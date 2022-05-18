import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import VideoprojecteurGeneral from '@components/Videoprojecteur/VideoprojecteurGeneral/VideoprojecteurGeneral';
import VideoprojecteurDetail from '@components/Videoprojecteur/VideoprojecteurDetail/VideoprojecteurDetail';

const Videoprojecteur = () => {
  return (
    <Box>
      <Navigation />
      <h2 align="center"> état actuel de la séance</h2>
      <VideoprojecteurGeneral />
      <VideoprojecteurDetail />
    </Box>
  );
};

export default Videoprojecteur;
