import React from 'react';
import { Box } from '@mui/material';

const HelloComponent = () => {
  // const [data, setData] = useState([]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '50px',
      }}
    >
      Hello World !!
    </Box>
  );
};
export default HelloComponent;
