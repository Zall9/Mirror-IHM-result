import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mockReactRedux } from 'mock-react-redux';
import ResultatCompletEtudiant from '@components/ResultatCompletEtudiant/ResultatCompletEtudiant';
import { getExercises } from '../../services/stores/Exercices/exercicesSlice';

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

jest.mock('../../components/ResultatCompletEtudiant/RowResultatComplet/RowResultatComplet', () => {
  // eslint-disable-next-line react/prop-types
  return function DummyRow({ row }) {
    return (
      <tr>
        {/* eslint-disable-next-line react/prop-types */}
        <th data-testid={'mocked-row'}>{row.nomExo}</th>
      </tr>
    );
  };
});

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
  jest.resetAllMocks();
});

it('test du component RowResultatComplet.js avec données', async () => {
  mockReactRedux().give(getExercises, donnees);
  // render du component
  await act(async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResultatCompletEtudiant idEtu={donnees[0].idEtu} />} />
        </Routes>
      </BrowserRouter>,

      container,
    );
  });

  // On récupère le composant mocké
  const row = document.querySelector('[data-testid=mocked-row]');
  // On vérifie qu'on lui passe les bon paramètres
  expect(row.textContent).toContain(donnees[0].nomExo);
});
