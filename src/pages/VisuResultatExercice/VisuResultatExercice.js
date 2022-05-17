import React, { useEffect } from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setExercices } from '@stores/Exercices/exercicesSlice';
import { useParams } from 'react-router-dom';
import VisuResultatExerciceComponent from '@components/VisuResultatExercice/VisuResultatExerciceComponent';

const initExercices = (dispatch) => {
  axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices').then((res) => {
    dispatch(setExercices(res.data.exercices));
  });
};

const VisuResultatExercice = () => {
  const dispatch = useDispatch();
  useSelector((state) => state.exercices.data);

  useEffect(() => {
    initExercices(dispatch);
  }, []);

  return (
    <Box>
      <Navigation />
      <VisuResultatExerciceComponent />
    </Box>
  );
};

export default VisuResultatExercice;
