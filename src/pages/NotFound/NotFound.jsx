import React from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
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
        <Typography variant="h2">Erreur 404;</Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
