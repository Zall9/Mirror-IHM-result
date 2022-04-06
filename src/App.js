import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hello from '@pages/Hello/Hello';
import NotFound from '@pages/NotFound/NotFound';
import { initSocketConnection } from '@services/socket/socket';

export default function App() {
  useEffect(() => {
    initSocketConnection();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hello />} />
          {/* <Route path="/hello" element={<Hello />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
