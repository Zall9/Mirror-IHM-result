import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import HelloComponent from '@components/HelloComponent/HelloComponent';

const Hello = () => {
  return (
    <Box>
      <Navigation />
      <HelloComponent />
    </Box>
  );
};

export default Hello;
