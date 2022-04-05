import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hello from '@pages/Hello/Hello';
import NotFound from './pages/NotFound/NotFound';

export default function App() {
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
