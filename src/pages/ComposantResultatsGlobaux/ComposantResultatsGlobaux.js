import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import ComposantResultatGlobaux from '@components/ComposantResultatsGlobaux/ComposantResultatsGlobaux';
const Avancement = () => {
  return (
    <Box>
      <Navigation />
      <ComposantResultatGlobaux />
    </Box>
  );
};

export default Avancement;
