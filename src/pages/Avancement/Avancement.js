import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import AvancementComponent from '@components/AvancementComponent/AvancementComponent';

const Avancement = () => {
  return (
    <Box>
      <Navigation />
      <h2 align="center"> état actuel des étudiants</h2>
      <AvancementComponent />
    </Box>
  );
};

export default Avancement;
