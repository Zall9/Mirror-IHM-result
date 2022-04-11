import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import store from '@stores/store';
import { Provider } from 'react-redux';

import HelloComponent from '@components/HelloComponent/HelloComponent';

let container = null;
beforeEach(() => {
  // met en place un élément DOM comme cible de rendu
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // nettoie en sortie de test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('test du component HelloComponent.js', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <HelloComponent />
      </Provider>,
      container,
    );
  });
});
