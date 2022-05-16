import React, { useEffect, useState } from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

// construire Box par étudiant

const BoiteRectangulaireExercice = (props) => {
  const listeExo = props.listeExo;

  let nbEtudiantReussite = 0;
  for (let exercice of listeExo) {
    if (exercice.estFini) {
      nbEtudiantReussite++;
    }
  }
  console.log(nbEtudiantReussite);
  const progress = (listeExo.length / props.nbEtu) * 100;
  const tauxReussite = (nbEtudiantReussite / listeExo.length) * 100;
  return (
    <div width="250px" height="100%">
      <h2>{listeExo[0].nomExo}</h2>
      <Box
        sx={{
          position: 'relative',
          justifyContent: 'space-around',
          display: 'block',
          width: '100%',
        }}
      >
        <Stack direction="row">
          <CircularProgressWithLabel
            value={listeExo[0].difficulte * 10}
            color="secondary"
            isAPercentage={false}
            textOver="difficulté de l'exercice"
          />
          <CircularProgressWithLabel
            value={progress}
            color="primary"
            isAPercentage={true}
            textOver="Proportion des étudiants de la session ayant au moins commencé cet exercice."
          />

          <CircularProgressWithLabel
            value={tauxReussite}
            color="inherit"
            isAPercentage={true}
            textOver="Proportion des étudiants ayant réussi cet exercice parmis ceux qui l'ont commencé."
          />
        </Stack>
      </Box>
    </div>
  );
};
/* <p>proportion des élèves ayant commencé ou fini cet exercice</p>
  <p>proportion des élèves ayant fini l&apos;exercice parmis ceux qui ont commencé</p>*/

BoiteRectangulaireExercice.propTypes = {
  listeExo: PropTypes.array.isRequired,
  nbEtu: PropTypes.number.isRequired,
};

export default BoiteRectangulaireExercice;
