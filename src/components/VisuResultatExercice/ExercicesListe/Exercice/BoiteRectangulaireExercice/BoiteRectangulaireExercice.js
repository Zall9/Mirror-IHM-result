import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import CircularProgressWithLabel from '@components/CircularProgressWithLabel/CircularProgressWithLabel';
import Box from '@mui/material/Box';

/**
 * Entête de la ligne d'exercice, permettant de décrire les infos générales sur celui-ci
 */
const BoiteRectangulaireExercice = (props) => {
  const listeExo = props.listeExo;

  let nbEtudiantReussite = 0;
  for (let exercice of listeExo) {
    if (exercice.estFini) {
      nbEtudiantReussite++;
    }
  }
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
            value={listeExo[0].difficulte}
            color="secondary"
            isAPercentage={false}
            textOver="Difficulté de l'exercice"
            minValue={0}
            maxValue={10}
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
