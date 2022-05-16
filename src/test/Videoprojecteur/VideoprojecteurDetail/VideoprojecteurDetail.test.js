import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mockReactRedux } from 'mock-react-redux';

import VideoprojecteurDetail from '@components/Videoprojecteur/VideoprojecteurDetail/VideoprojecteurDetail';
import { getExercices } from '@stores/Exercices/exercicesSlice';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const donnees = [
  {
    idExo: '507f1f77bcf86cd799439011',
    nomExo: 'boucle en C',
    idEtu: '45fds4657dsffg56sg5d4cx2',
    idSession: '623a34f35f35bcc5773e0445',
    nomSession: 'pas_de_session',
    estFini: true,
    langage: 'C',
    themes: ['boucle', 'fonction', 'condition', 'trie'],
    difficulte: 10,
    tempsMoyen: 0,
    tempsMaximum: 0,
    debut: '2022-04-11T17:15:22.288Z',
    tentatives: [
      {
        validationExercice: false,
        logErreurs: 'error segmentation ...',
        dateSoumission: '2022-04-11T17:17:39.135Z',
        reponseEtudiant: 'int a=1; for (int i=0 ; i<n;i++) {a=a*i;}',
      },
    ],
    __v: 0,
  },
];

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

it('test du component VideoprojecteurDetail.js', async () => {
  mockReactRedux().give(getExercices, donnees);

  await act(async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VideoprojecteurDetail />} />
        </Routes>
      </BrowserRouter>,
      container,
    );
  });
  expect(container.textContent).toContain(donnees[0].nomExo);
});
