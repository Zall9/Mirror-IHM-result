import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from '@pages/Accueil/Accueil';
import Login from '@pages/Login/Login';
import LoginCallback from '@pages/LoginCallback/LoginCallback';
import Resultat from '@pages/Resultat/Resultat';
import NotFound from '@pages/NotFound/NotFound';
import ResultatEtudiant from '@pages/ResultatEtudiant/ResultatEtudiant';
import Avancement from '@pages/Avancement/Avancement';
import Videoprojecteur from '@pages/Videoprojecteur/Videoprojecteur';
import VisuResultatEtudiant from '@pages/VisuResultatEtudiant/VisuResultatEtudiant';
import VisuResultatExercice from '@pages/VisuResultatExercice/VisuResultatExercice';

import { initSocketConnection } from '@services/socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions, setSession } from '@stores/Sessions/sessionSlice';
import { setExercises, getExercises } from '@stores/Exercices/exercicesSlice';
import axios from 'axios';
import AuthLayout from '@components/AuthLayout/AuthLayout';
import PageResultatsGlobaux from '@pages/PageResultatsGlobaux/ComposantResultatsGlobaux';

const initExercices = (dispatch) => {
  axios.get(import.meta.env.VITE_SRVRESULT_URL + '/exercices').then((res) => {
    dispatch(setExercises(res.data.exercices));
  });
};

const initSessions = (dispatch) => {
  axios.get(import.meta.env.VITE_SRVEXO_URL + '/sessions?populate=true').then((res) => {
    dispatch(setSession(res.data.sessions));
    initSocketConnection(dispatch);
  });
};

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initExercices(dispatch);
    initSessions(dispatch);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route element={<AuthLayout redirect="/login" />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/resultat/:etu" element={<ResultatEtudiant />} />
          <Route path="/resultat" element={<Resultat />} />
          <Route path="/avancement" element={<Avancement />} />
          <Route path="/videoprojecteur" element={<Videoprojecteur />} />
          <Route path="/visuresultatetudiant" element={<VisuResultatEtudiant />} />
          <Route path="/visuresultatexercice" element={<VisuResultatExercice />} />
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
