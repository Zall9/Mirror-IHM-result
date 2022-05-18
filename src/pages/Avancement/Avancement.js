import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import AvancementComponent from '@components/AvancementComponent/AvancementComponent';

const Avancement = () => {
  return (
    <Box>
      <Navigation />
      <AvancementComponent />
    </Box>
  );
};

export default Avancement;
