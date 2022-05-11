import React, { useEffect, useState } from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import BoiteRectangulaireEtudiant from './BoiteRectangulaireEtudiant';
import BoiteRectangulaireExercice from './BoiteRectangulaireExercice';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';

const construitListeBoiteEtudiant = (listeEtudiants) =>
  listeEtudiants.map((etudiantExo, index) => {
    console.log('etudiantExo :', etudiantExo, 'listeExo :', listeEtudiants);
    return (
      <Item key={index}>
        <BoiteRectangulaireEtudiant etudiantExo={etudiantExo} />
      </Item>
    );
  });

const Exercice = (props) => {
  const idExo = props.idExo;
  const listeEtudiants = props.listeEtudiants;

  console.log(idExo, listeEtudiants);
  return (
    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
      <Item sx={{ width: '250px' }}>
        <BoiteRectangulaireExercice listeExo={listeEtudiants} />
      </Item>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        {construitListeBoiteEtudiant(listeEtudiants)}
      </Stack>
    </Stack>
  );
};

Exercice.propTypes = {
  idExo: PropTypes.string.isRequired,
  listeEtudiants: PropTypes.array.isRequired,
};

export default Exercice;
