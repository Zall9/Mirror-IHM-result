import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Row from '@components/ResultatCompletEtudiant/RowResultatComplet/RowResultatComplet';

const dataVide = {
  history: [],
};

const data = {
  exo: '507f1f77bcf86cd799439011',
  nomExo: 'boucle en C',
  nbTenta: 1,
  temps: 50, // temps en minutes
  difficulte: 5,
  themes: 'boucle',
  history: [
    {
      dateSoumission: '2022-04-11T17:17:39.135Z',
      tempsSoumission: 50,
      logErreurs: 'error segmentation ...',
      soumissionNumber: 1,
    },
  ],
};

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

// On test que le component est bien rendu sans données (meme si proptypes affiche une erreur dans ce cas)
// L'erreur de proptypes dans ce test est normal car le component est rendu sans données
it('test du component RowResultatComplet.js sans données', async () => {
  // render du component
  await act(async () => {
    render(<Row row={dataVide} />, container);
  });

  // test qu'il n'y a pas de données
  expect(container.textContent).toContain('');

  // On récupère le bouton
  const button = document.querySelector('[data-testid=button-open-row]');

  // On click sur le bouton
  await act(async () => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  // test que les titres sont bien affichées apres le click
  expect(container.textContent).toContain('History');
  expect(container.textContent).toContain('Heure soumission');
  expect(container.textContent).toContain('Temps Soumission (en ms)');
  expect(container.textContent).toContain('Resultat Soumission');
});

// On test que le component est bien rendu avec des données
it('test du component RowResultatComplet.js avec données', async () => {
  // render du component
  await act(async () => {
    render(<Row row={data} />, container);
  });

  // test qu'il n'y a pas de données
  expect(container.textContent).toContain('');

  // On récupère le bouton
  const button = document.querySelector('[data-testid=button-open-row]');

  // On click sur le bouton
  await act(async () => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  // test que les titres sont bien affichées apres le click
  expect(container.textContent).toContain('History');
  expect(container.textContent).toContain('Heure soumission');
  expect(container.textContent).toContain('Temps Soumission (en ms)');
  expect(container.textContent).toContain('Resultat Soumission');

  // test que les données sont bien affichées
  expect(container.textContent).toContain(data.history[0].dateSoumission);
  expect(container.textContent).toContain(data.nomExo);
});
