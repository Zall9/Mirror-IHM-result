import React, { useEffect, useState } from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';

import { Redirect } from 'react-router-dom';

// construire Box par étudiant

const BoiteRectangulaireEtudiant = (props) => {
  const exo = props.etudiantExo;
  const color = getColor(exo);

  return (
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: '30px',
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <EtudiantCliquable idEtu={exo.idEtu} />
      <ul>
        <li>nb tentatives : {exo.tentatives.length}</li>
        <li>
          derniere soumission :
          {Date.now() - Date.parse(exo.tentatives[exo.tentatives.length - 1].dateSoumission)} s
        </li>
      </ul>
    </Box>
  );
};

function getColor(exo) {
  if (exo.tentatives.length < 4) {
    return '#FFFF56';
  }
  if (exo.tentatives.length < 8) {
    return '#FF8C00';
  }
  return '#FF4500';
}
BoiteRectangulaireEtudiant.propTypes = {
  etudiantExo: PropTypes.object.isRequired,
};

export default BoiteRectangulaireEtudiant;
