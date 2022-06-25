import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import AvancementComponent from '@components/Avancement/Avancement';

const Avancement = () => {
  return (
    <Box>
      <Navigation />
      <AvancementComponent />
    </Box>
  );
};

export default Avancement;
