import React from 'react';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/ListItem';
import BoiteRectangulaireEtudiant from './BoiteRectangulaireEtudiant/BoiteRectangulaireEtudiant';
import PropTypes from 'prop-types';
import { etudiantParser } from '../../../../LEGACY-Utilitaires/Etudiant/etudiantParser';
/**
 * Liste des cartes étudiants participant / ayant participé à un exercice donné
 */
const ListeBoiteEtudiant = ({ listeEtudiants }) => {
  return (
    <Stack direction="row">
      {listeEtudiants.map((etudiantExo, index) => {
        return (
          <Item key={index}>
            <BoiteRectangulaireEtudiant etudiantExo={etudiantExo} />
          </Item>
        );
      })}
    </Stack>
  );
};

ListeBoiteEtudiant.propTypes = {
  listeEtudiants: PropTypes.array.isRequired,
};

export default ListeBoiteEtudiant;
