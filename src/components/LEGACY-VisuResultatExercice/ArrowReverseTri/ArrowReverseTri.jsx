import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CompareArrows from '@mui/icons-material/CompareArrows';
import React from 'react';
import Box from '@mui/material/Box';

/**
 * Double flèche qui permet de changer le sens du tri
 */
const ArrowReverseTri = ({ reverseTri, handleReverseTri }) => {
  return (
    <Box>
      <IconButton
        id="reversingArrow"
        onClick={handleReverseTri}
        label="rev"
        title="Inverser l'ordre du tri"
        sx={{
          '&:hover': {
            color: 'black',
          },
          color: reverseTri == 'false' ? 'black' : 'white',
          backgroundColor: reverseTri == 'false' ? 'white' : 'lightgray',
        }}
      >
        <CompareArrows sx={{ transform: 'rotate(90deg)' }} />
      </IconButton>
    </Box>
  );
};

ArrowReverseTri.propTypes = {
  reverseTri: PropTypes.string.isRequired,
  handleReverseTri: PropTypes.func.isRequired,
};

export default ArrowReverseTri;
