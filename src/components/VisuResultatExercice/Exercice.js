import React from 'react';
import PropTypes from 'prop-types';
import BoiteRectangulaireEtudiant from './BoiteRectangulaireEtudiant';
import BoiteRectangulaireExercice from './BoiteRectangulaireExercice';

import Stack from '@mui/material/Stack';
import Item from '@mui/material/ListItem';

/**
 * Fonction qui tri les exercices d'étudiants en fonction de leur réussite et de leur dernière soummission
 * @param exoEtu1 - exercice de l'étudiant 1
 * @param exoEtu1 - exercice de l'étudiant 2
 * @returns positif si exoEtu2 a été terminé avant ou si les deux
 *  etudiants n'ont pas fini l'exercice et que l'étudiant 1 a fait une soumission plus récente
 *          négatif sinon
 */
function compareEtudiant(exoEtu1, exoEtu2) {
  if (exoEtu1.estFini && !exoEtu2.estFini) {
    return 1;
  }
  if (exoEtu2.estFini && !exoEtu1.estFini) {
    return -1;
  }

  if (exoEtu1.tentatives.length == 0) {
    return 1;
  }
  if (exoEtu2.tentatives.length == 0) {
    return -1;
  }

  return (
    exoEtu1.tentatives[exoEtu1.tentatives.length - 1].dateSoumission -
    exoEtu2.tentatives[exoEtu2.tentatives.length - 1].dateSoumission
  );
}

const construitListeBoiteEtudiant = (listeEtudiants) =>
  listeEtudiants.map((etudiantExo, index) => {
    return (
      <Item key={index}>
        <BoiteRectangulaireEtudiant etudiantExo={etudiantExo} />
      </Item>
    );
  });

const Exercice = (props) => {
  const idExo = props.idExo;
  const listeEtudiants = props.listeEtudiants;

  listeEtudiants.sort(compareEtudiant);

  return (
    <Stack direction="row">
      <Item sx={{ width: '250px' }}>
        <BoiteRectangulaireExercice listeExo={listeEtudiants} nbEtu={props.nbEtu} />
      </Item>
      <Stack direction="row">{construitListeBoiteEtudiant(listeEtudiants)}</Stack>
    </Stack>
  );
};

Exercice.propTypes = {
  idExo: PropTypes.string.isRequired,
  listeEtudiants: PropTypes.array.isRequired,
  nbEtu: PropTypes.number.isRequired,
};

export default Exercice;
//###########################################################################
