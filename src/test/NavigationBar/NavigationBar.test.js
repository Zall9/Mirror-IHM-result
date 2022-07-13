import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import store from '@stores/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavigationBar from '@components/NavigationBar/NavigationBar';

let container = null;
beforeEach(() => {
  // met en place un élément DOM comme cible de rendu
  container = document.createElement('div');
  document.body.appendChild(container);
  jest.resetAllMocks();
});

afterEach(() => {
  // nettoie en sortie de test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('test du component NavigationBar.js', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavigationBar />} />
          </Routes>
        </BrowserRouter>
      </Provider>,
      container,
    );
  });
  expect(container.textContent).toContain('Accueil');
});
