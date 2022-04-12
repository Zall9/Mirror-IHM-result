import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from '@pages/Accueil/Accueil';
import Resultat from '@pages/Resultat/Resultat';
import NotFound from '@pages/NotFound/NotFound';
import ResultatEtudiant from '@pages/ResultatEtudiant/ResultatEtudiant';
import { initSocketConnection } from '@services/socket/socket';
import { useDispatch } from 'react-redux';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initSocketConnection(dispatch);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/resultatEtudiant/:etu" exact component={ResultatEtudiant} />
          <Route path="/resultat" element={<Resultat />} />
          {/* <Route path="/hello" element={<Hello />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
