import React, { useEffect } from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setExercices } from '@stores/Exercices/exercicesSlice';
import TableEtudiantExerciceComponent from '@components/TableEtudiantExerciceComponent/TableEtudiantExerciceComponent';
import PourcentEtuParDifficulte from '@components/PourcentEtuParDifficulte/PourcentEtuParDifficulte';

const initExercices = (dispatch) => {
  axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices').then((res) => {
    console.log('GETTING EXERCICES');
    dispatch(setExercices(res.data.exercices));
  });
  console.log('INIT PAGE');
};

const Resultat = () => {
  const dispatch = useDispatch();
  console.log(useSelector((state) => state.exercices.data));
  useEffect(() => {
    initExercices(dispatch);
  }, []);

  return (
    <Box>
      <Navigation />
      <TableEtudiantExerciceComponent />
      <PourcentEtuParDifficulte />
    </Box>
  );
};

export default Resultat;
