import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mockReactRedux } from 'mock-react-redux';
import PourcentEtuParDifficulte from '@components/PourcentEtuParDifficulte/PourcentEtuParDifficulte';
import { getExercices } from '../../services/stores/Exercices/exercicesSlice';

const dataVerfication = {
  couleurs: ['rgb(252, 232, 232)', 'rgb(23, 3, 3)'],
  datas: [1, 1],
  id: 'pourcentEtuParDifficulte',
  labels: ['Difficulté : 1', 'Difficulté : 10'],
  taille: 25,
  titre: "Pourcentage d'étudiants par difficulté",
  typeDiagramme: 'pie',
};

const data = [
  {
    idExo: '507f1f77bcf86cd799439011',
    nomExo: 'boucle en C',
    idEtu: '45fds4657dsffg56sg5d4cx2',
    idSession: '623a34f35f35bcc5773e0445',
    nomSession: 'pas_de_session',
    estFini: false,
    langage: 'C',
    themes: ['boucle', 'fonction', 'condition', 'trie'],
    difficulte: 1,
    tempsMoyen: 0,
    tempsMaximum: 0,
    debut: '2022-04-11T17:15:22.288Z',
    tentatives: [
      {
        validationExercice: false,
        logErreurs: 'error segmentation ...',
        dateSoumission: '2022-04-14T06:34:31.234Z',
        reponseEtudiant: 'int a=1; for (int i=0 ; i<n;i++) {a=a*i;}',
      },
    ],
  },
  {
    idExo: '507f1f77bcf86cd799439012',
    nomExo: 'boucle en C++',
    idEtu: '45fds4657dsffg56sg5d4cx3',
    idSession: '623a34f35f35bcc5773e0445',
    nomSession: 'pas_de_session',
    estFini: false,
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
        dateSoumission: '2022-04-14T06:34:31.234Z',
        reponseEtudiant: 'int a=1; for (int i=0 ; i<n;i++) {a=a*i;}',
      },
    ],
  },
];

jest.mock('../../components/DiagrammeCirculaire/DiagrammeCirculaire', () => {
  // eslint-disable-next-line react/prop-types
  return function DummyDiagrammeCirculaire(props) {
    return (
      <div data-testid="mock-diagramme">
        {/* eslint-disable-next-line react/prop-types */}
        {props.titre}

        {/* eslint-disable-next-line react/prop-types */}
        {props.typeDiagramme}

        {/* eslint-disable-next-line react/prop-types */}
        {props.taille}

        {/* eslint-disable-next-line react/prop-types */}
        {props.couleurs.map((couleur) => couleur)}

        {/* eslint-disable-next-line react/prop-types */}
        {props.labels.map((label) => label)}

        {/* eslint-disable-next-line react/prop-types */}
        {props.datas.map((data) => data)}

        {/* eslint-disable-next-line react/prop-types */}
        {props.id}
      </div>
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

it('test du component PourcentEtuParDifficulte.js avec données', async () => {
  mockReactRedux().give(getExercices, data);
  // render du component
  await act(async () => {
    render(<PourcentEtuParDifficulte />, container);
  });

  const mockedDiagramme = document.querySelector('[data-testid=mock-diagramme]');

  expect(mockedDiagramme.textContent).toContain(dataVerfication.id);
  expect(mockedDiagramme.textContent).toContain(dataVerfication.titre);
  expect(mockedDiagramme.textContent).toContain(dataVerfication.typeDiagramme);
  expect(mockedDiagramme.textContent).toContain(dataVerfication.taille.toString());
  expect(mockedDiagramme.textContent).toContain(dataVerfication.couleurs[0]);
  expect(mockedDiagramme.textContent).toContain(dataVerfication.couleurs[1]);
  expect(mockedDiagramme.textContent).toContain(dataVerfication.labels[0]);
  expect(mockedDiagramme.textContent).toContain(dataVerfication.labels[1]);
  expect(mockedDiagramme.textContent).toContain(dataVerfication.datas[0].toString());
  expect(mockedDiagramme.textContent).toContain(dataVerfication.datas[1].toString());
});
