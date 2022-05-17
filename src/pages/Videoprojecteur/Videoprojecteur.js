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
    dispatch(setExercices(res.data.exercices));
  });
};

const Videoprojecteur = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initExercices(dispatch);
  }, []);

  return (
    <Box>
      <Navigation />
      <VideoprojecteurGeneral />
      <VideoprojecteurDetail />
    </Box>
  );
};

export default Videoprojecteur;
