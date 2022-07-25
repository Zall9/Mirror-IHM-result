import React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import Exercice from './Exercice/Exercice';
import PropTypes from 'prop-types';

function recupereNbEtudiant(exercices) {
  let etudiants = [];
  exercices.map((exo) => {
    if (!etudiants.includes(exo.idEtu)) {
      etudiants.push(exo.idEtu);
    }
  });
  return etudiants.length;
}

/**
 * Liste des lignes contenant chacune un exercice avec les étudiants ayant commencé cet exercice
 */
const ExercicesListe = ({ ListeExos, exercices }) => {
  return (
    <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />}>
      {ListeExos.map((objetIdListeExo, index) => {
        // component="div" pour supprimer le warning (https://github.com/mui/material-ui/issues/19827)
        return (
          <Item key={index} component="div">
            <Exercice
              listeEtudiants={objetIdListeExo.listeEtus}
              nbEtu={recupereNbEtudiant(exercices)}
            />
          </Item>
        );
      })}
    </Stack>
  );
};

ExercicesListe.propTypes = {
  ListeExos: PropTypes.array.isRequired,
  exercices: PropTypes.array.isRequired,
};

export default ExercicesListe;
