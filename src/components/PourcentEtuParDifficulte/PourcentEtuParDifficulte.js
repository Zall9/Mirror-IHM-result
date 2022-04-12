import React, { useEffect } from 'react';

// import redux/store
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';

const PourcentEtuParDifficulte = () => {
  const exercices = useSelector(getExercices);
  // const total = 'total';
  /* Création d'un dictionnaire avec le nombre d'exercices par difficulté et compte le nombre d'étudiants par exercices non temrinés */
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
  return <div>{JSON.stringify(difficulteDico)}</div>; /** TODO: Affichage graphique et stylisé */
};

export default PourcentEtuParDifficulte;
