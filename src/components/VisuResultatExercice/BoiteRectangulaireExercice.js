import React, { useEffect, useState } from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';

// construire Box par étudiant

const BoiteRectangulaireExercice = (props) => {
  const listeExo = props.listeExo;

  return (
    <div>
      <h2>{listeExo[0].nomExo}</h2>
      <ul>
        <li>nb étudiants : {listeExo.length}</li>
        <li>difficulté : {listeExo[0].difficulte}</li>
      </ul>
    </div>
  );
};

BoiteRectangulaireExercice.propTypes = {
  listeExo: PropTypes.array.isRequired,
};

export default BoiteRectangulaireExercice;
