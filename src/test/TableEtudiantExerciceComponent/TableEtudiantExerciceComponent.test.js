import React from 'react';
import { mockReactRedux } from 'mock-react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TableEtudiantExerciceComponent from '@components/TableEtudiantExerciceComponent/TableEtudiantExerciceComponent';
import { getExercices } from '../../services/stores/Exercices/exercicesSlice';

let donnees = [
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
});

afterEach(() => {
  // nettoie en sortie de test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('test du component TableEtudiantExerciceComponent.js sans données', async () => {
  // mock du store redux
  mockReactRedux().give(getExercices, []);

  // render du component
  await act(async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableEtudiantExerciceComponent />} />
        </Routes>
      </BrowserRouter>,
      container,
    );
  });

  // test
  expect(container.textContent).toContain('Étudiant');
  expect(container.textContent).toContain('Exercices');
});

it('test du component TableEtudiantExerciceComponent.js avec données', async () => {
  // mock du store redux
  mockReactRedux().give(getExercices, donnees);

  // render du component
  await act(async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TableEtudiantExerciceComponent />} />
        </Routes>
      </BrowserRouter>,
      container,
    );
  });

  // test
  expect(container.textContent).toContain('Étudiant');
  expect(container.textContent).toContain('Exercices');
  // vérifier que les données sont bien affichées
  expect(container.textContent).toContain('boucle en C');
});
