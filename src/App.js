import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from '@pages/Accueil/Accueil';
import Resultat from '@pages/Resultat/Resultat';
import NotFound from '@pages/NotFound/NotFound';
import ResultatEtudiant from '@pages/ResultatEtudiant/ResultatEtudiant';
import Avancement from '@pages/Avancement/Avancement';
import Videoprojecteur from '@pages/Videoprojecteur/Videoprojecteur';
import VisuResultatEtudiant from '@pages/VisuResultatEtudiant/VisuResultatEtudiant';
import VisuResultatExercice from '@pages/VisuResultatExercice/VisuResultatExercice';
import ComposantResultatsGlobaux from '@pages/ComposantResultatsGlobaux/ComposantResultatsGlobaux';
import { initSocketConnection } from '@services/socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { getSessions, setSession } from '@stores/Sessions/sessionSlice';
import { setExercices } from '@stores/Exercices/exercicesSlice';
import axios from 'axios';

const initExercices = (dispatch) => {
  axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices').then((res) => {
    dispatch(setExercices(res.data.exercices));
  });
};

const initSessions = (dispatch) => {
  axios.get(process.env.REACT_APP_SRVEXO_URL + '/sessions').then((res) => {
    dispatch(setSession(res.data.sessions));
  });
};

export default function App() {
  const dispatch = useDispatch();
  const sessions = useSelector(getSessions);

  useEffect(() => {
    initExercices(dispatch);
    initSocketConnection(dispatch, sessions);
    initSessions(dispatch);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/resultat/:etu" element={<ResultatEtudiant />} />
          <Route path="/resultat" element={<Resultat />} />
          <Route path="/avancement" element={<Avancement />} />
          <Route path="/videoprojecteur" element={<Videoprojecteur />} />
          <Route path="/visuresultatetudiant" element={<VisuResultatEtudiant />} />
          <Route path="/visuresultatexercice" element={<VisuResultatExercice />} />
          <Route path="/ComposantResultatsGlobaux" element={<ComposantResultatsGlobaux />} />
          {/* <Route path="/hello" element={<Hello />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
