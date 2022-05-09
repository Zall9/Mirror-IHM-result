import React, { useEffect, useState } from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import DiagrammeCirculaireExercice from './DiagrammeCirculaireExercice';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';

const construitListeDiagrammeExercices = (listeExercices) =>
  listeExercices.map((exercice, index) => {
    console.log('Exo :', exercice, 'listeExo :', listeExercices);
    return (
      <Item key={index}>
        <DiagrammeCirculaireExercice exercice={exercice} />
      </Item>
    );
  });

const Etudiant = (props) => {
  const idEtu = props.idEtu;
  const listeExerices = props.listeExercices;

  return (
    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
      <Item sx={{ width: '250px' }}>
        <EtudiantCliquable idEtu={idEtu} />
      </Item>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        {construitListeDiagrammeExercices(listeExerices)}
      </Stack>
    </Stack>
  );
};

Etudiant.propTypes = {
  idEtu: PropTypes.string.isRequired,
  listeExercices: PropTypes.array.isRequired,
};

export default Etudiant;
