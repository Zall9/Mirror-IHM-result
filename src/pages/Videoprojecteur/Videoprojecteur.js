import React, { useEffect } from 'react';
import Navigation from '@components/NavigationBar/NavigationBar';
import { Box } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setExercices } from '@stores/Exercices/exercicesSlice';
import VideoprojecteurGeneral from '@components/Videoprojecteur/VideoprojecteurGeneral/VideoprojecteurGeneral';
import VideoprojecteurDetail from '@components/Videoprojecteur/VideoprojecteurDetail/VideoprojecteurDetail';

const initExercices = (dispatch) => {
  axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices').then((res) => {
    console.log('GETTING EXERCICES');
    dispatch(setExercices(res.data.exercices));
  });
  console.log('INIT PAGE');
};

const Videoprojecteur = () => {
  const dispatch = useDispatch();
  console.log(useSelector((state) => state.exercices.data));

  useEffect(() => {
    initExercices(dispatch);
  }, []);

  return (
    <Box>
      <Navigation />
      <h2 align="center"> état actuel de la séance</h2>
      <VideoprojecteurGeneral />
      <VideoprojecteurDetail />
    </Box>
  );
};

export default Videoprojecteur;
