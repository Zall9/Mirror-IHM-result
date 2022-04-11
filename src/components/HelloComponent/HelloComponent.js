import React from 'react';
import { Box, selectClasses, Grid } from '@mui/material';
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
      <Grid>
        {exercices.map((exo, key) => {
          return (
            <Grid item key={key}>
              Nom de l&apos;exo {exo.nomExo}
              tentatives : {exo.tentatives.length}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default HelloComponent;
