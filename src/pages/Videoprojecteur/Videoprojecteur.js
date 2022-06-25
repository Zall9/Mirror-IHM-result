import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import VideoprojecteurGeneral from '@components/Videoprojecteur/VideoprojecteurGeneral/VideoprojecteurGeneral';
import VideoprojecteurDetail from '@components/Videoprojecteur/VideoprojecteurDetail/VideoprojecteurDetail';

const Videoprojecteur = () => {
  return (
    <Box>
      <Navigation />
      <VideoprojecteurGeneral />
      <VideoprojecteurDetail />
    </Box>
  );
};

export default Videoprojecteur;
