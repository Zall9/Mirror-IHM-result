import React from 'react';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

const HelloComponent = () => {
  // const [data, setData] = useState([]);
  const exercices = useSelector((state) => state.exercices.data);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '50px',
      }}
    >
      Hello World !!
      {exercices.map((exo, key) => {
        return <Box key={key}>{exo.nomExo}</Box>;
      })}
    </Box>
  );
};
export default HelloComponent;
