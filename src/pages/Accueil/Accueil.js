import React, { useEffect } from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box, Typography } from '@mui/material';
// import HelloComponent from '@components/HelloComponent/HelloComponent';
import { useDispatch } from 'react-redux';

const Accueil = () => {
  return (
    <Box>
      <Navigation />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '50px',
        }}
      >
        <Typography variant="h2">Bienvenue sur LaWeb</Typography>
      </Box>
    </Box>
  );
};

export default Accueil;
