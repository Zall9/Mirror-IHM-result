import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hello from '@pages/Hello/Hello';
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
          <Route path="/" element={<Hello />} />
          <Route path="/resultatEtudiant/:etu" exact component={ResultatEtudiant} />
          {/* <Route path="/hello" element={<Hello />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
