import React, { useEffect } from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setExercices } from '@stores/Exercices/exercicesSlice';
import { useParams } from 'react-router-dom';
import VisuResultatExerciceComponent from '@components/VisuResultatExercice/VisuResultatExerciceComponent';

console.log('début page');
const initExercices = (dispatch) => {
  console.log('début');
  axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices').then((res) => {
    console.log('GETTING EXERCICES');
    dispatch(setExercices(res.data.exercices));
  });
  console.log('INIT PAGE');
};

const VisuResultatEtudiant = () => {
  const dispatch = useDispatch();
  console.log(useSelector((state) => state.exercices.data));

  useEffect(() => {
    initExercices(dispatch);
  }, []);

  return (
    <Box>
      <Navigation />

      <h2 align="center"> État actuel de la séance (vue par exercice) : </h2>

      <VisuResultatExerciceComponent />
    </Box>
  );
};

export default VisuResultatExercice;
