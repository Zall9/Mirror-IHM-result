import React from 'react';
import { Box, selectClasses } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectData } from '@stores/Exercices/exercicesSlice';

const HelloComponent = () => {
  // const [data, setData] = useState([]);
  const exercices = useSelector(selectData);

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
