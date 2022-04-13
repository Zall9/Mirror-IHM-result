import React, { useEffect } from 'react';
import DiagrammeCirculaire from '../DiagrammeCirculaire/DiagrammeCirculaire'; //TODO ALIAS SUR LE COMPONENT
// import redux/store
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';

const PourcentEtuParDifficulte = () => {
  const exercices = useSelector(getExercices);
  /* Création d'un dictionnaire avec le nombre d'exercices par difficulté et compte le nombre d'étudiants par exercices non terminés */
  let difficulteDico = exercices.reduce(
    (acc, exercice) => {
      if (exercice.estFini == false) {
        if (acc[exercice.difficulte]) {
          acc[exercice.difficulte] += 1;
        } else {
          acc[exercice.difficulte] = 1;
        }
        acc.total += 1;
      }
      return acc;
    },
    { total: 0 },
  );

  /*Création d'un tableau de couleurs pour déssiner le pie chart*/
  const COLORS = [
    'rgb(252, 232, 232)', // difficulté 1
    'rgb(247, 186, 186)', // difficulté 2
    'rgb(242, 140, 140)', // difficulté 3
    'rgb(237, 94, 94)', // difficulté 4
    'rgb(232, 48, 48)', // difficulté 5
    'rgb(206, 23, 23)', // difficulté 6
    'rgb(178, 18, 18)', // difficulté 7
    'rgb(115, 13, 13)', // difficulté 8
    'rgb(69, 8, 8)', // difficulté 9
    'rgb(23, 3, 3)', // difficulté 10
  ];
  let couleurAEnvoyer = [];
  let labelsAEnvoyer = [];
  let dataAEnvoyer = [];

  /* Boucler à travers le dico d'exo et pousser les valeurs dans le tableau. */
  for (let difficulte in difficulteDico) {
    if (difficulte != 'total') {
      dataAEnvoyer.push(difficulteDico[difficulte]);
      couleurAEnvoyer.push(COLORS[difficulte - 1]);
      labelsAEnvoyer.push('Difficulté : ' + difficulte);
    }
  }
  let titreAEnvoyer = "Pourcentage d'étudiants par difficulté";
  let typeDiagrammeAEnvoyer = 'pie';
  let clickCallbackAEnvoyer = function () {
    console.log('prout');
  };
  let idAEnvoyer = 'pourcentEtuParDifficulte';
  let booleanIsInteractiveAEnvoyer = true;
  let tailleAEnvoyer = 25; //pourcentage de la taille par raport a la largeur de l'element pere
  return (
    <DiagrammeCirculaire
      //definition des props
      datas={dataAEnvoyer}
      taille={tailleAEnvoyer}
      typeDiagramme={typeDiagrammeAEnvoyer}
      titre={titreAEnvoyer}
      couleurs={couleurAEnvoyer}
      clickCallback={clickCallbackAEnvoyer}
      booleanIsInteractive={booleanIsInteractiveAEnvoyer}
      id={idAEnvoyer}
      labels={labelsAEnvoyer}
    />
  );
};

export default PourcentEtuParDifficulte;
