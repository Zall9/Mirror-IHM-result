import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from '@pages/Accueil/Accueil';
import Login from '@pages/Login/Login';
import LoginCallback from '@pages/LoginCallback/LoginCallback';
import NotFound from '@pages/NotFound/NotFound';

import { initSocketConnection } from '@services/socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions, setSession } from '@stores/Sessions/sessionSlice';
import { setExercises, getExercises } from '@stores/Exercises/exercisesSlice';
import axios from 'axios';
import AuthLayout from '@components/AuthLayout/AuthLayout';
import PageResultatsGlobaux from '@pages/PageResultatsGlobaux/ComposantResultatsGlobaux';

/**
 * obtient les exercices du serveur resultat, puis définit les exercices dans le store
 */
const initExercises = (dispatch) => {
  axios.get(import.meta.env.VITE_SRVRESULT_URL + '/exercices').then((res) => {
    dispatch(setExercises(res.data.exercices));
  });
};

/**
 * obtient les sessions du serveur exercice, puis définit les sessions dans le store
 */
const initSessions = (dispatch) => {
  axios.get(import.meta.env.VITE_SRVEXO_URL + '/sessions?populate=true').then((res) => {
    dispatch(setSession(res.data.sessions));
    initSocketConnection(dispatch);
  });
};

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initExercises(dispatch);
    initSessions(dispatch);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route element={<AuthLayout redirect="/login" />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/PageResultatsGlobaux" element={<PageResultatsGlobaux />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
