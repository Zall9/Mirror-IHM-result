import React, { useEffect, useState } from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import IconButton from '@mui/material/IconButton';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

// construire Box par étudiant

/* props :
  Exo : exercice de l'étudiant  

  ExoClasse {nbEtu : nbEtuSession , nbEtuValide : nbEtudeValide,
        tpsMoy : temps/nbEtu, tpsMin : tpsMin, tpsMax : tpsMax, 
        tentaMoy : TentaMoy/nbEtuValide ,tentaMin : nbTentasMin, tentaMax : nbTentasMax }*/

const BoiteRectangulaireExercicePourUnEtudiant = (props) => {
  const exo = props.Exo;
  const exoClasse = props.ExoClasse;
  const proportionTenta =
    ((exo.tentatives.length - exoClasse.tentaMin) / (exoClasse.tentaMax - exoClasse.tentaMin)) *
    100;
  var proportionTemps;
  if (exo.tentatives.length != 0) {
    proportionTemps =
      ((Date.parse(exo.tentatives[exo.tentatives.length - 1].dateSoumission) -
        Date.parse(exo.debut) -
        exoClasse.tpsMin) /
        (exoClasse.tpsMax - exoClasse.tpsMin)) *
      100;
  }

  const color = getColor(exo);
  const estFini = exo.estFini;
  var interval;

  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    if (estFini) {
      clearInterval(interval);
    } else {
      interval = setInterval(() => setTime(Date.now()), 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return (
    <div>
      <Box
        sx={{
          backgroundColor: color,
          paddingLeft: '3px',
          paddingRight: '6px',
          paddingBottom: '1px',
          borderRadius: '20px',
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
          minWidth: '200px',
          maxWidth: '300px',
        }}
      >
        <h2 align="center"> {exo.nomExo}</h2>
        <ul>
          <li>difficulté : {exo.difficulte}</li>
          <li>nb tentatives : {exo.tentatives.length}</li>
          <LinearProgressWithLabel value={proportionTenta} />
          {affichageTemps(exo, proportionTemps)}
        </ul>
      </Box>
    </div>
  );
};
function affichageTemps(exo, proportionTemps) {
  return exo.estFini ? (
    <li>
      temps :{' '}
      {Math.floor(
        (Date.parse(exo.tentatives[exo.tentatives.length - 1].dateSoumission) -
          Date.parse(exo.debut)) /
          60000,
      )}{' '}
      m
      <LinearProgressWithLabel value={proportionTemps} />
    </li>
  ) : (
    ''
  );
}

function getColor(exo) {
  if (exo.estFini) {
    return '#9ED66D';
  } else {
    return '#F47337';
  }
}

BoiteRectangulaireExercicePourUnEtudiant.propTypes = {
  // l'exercice de l'étudiant
  Exo: PropTypes.object.isRequired,
  /* un bilan par exercice de la classe
  object contenant  : nb : le nombre d'élève de la session
                      nbReussite : le nombre d'étudiant ayant réussi cet exercice
                      tpsMoy : le temps moyen de réussitte
                      tmpsMin et tmpsMax
                      tentaMoy : le nombre de tentative moyen
                      tentaMin et tentaMax*/

  ExoClasse: PropTypes.object.isRequired,
};

export default BoiteRectangulaireExercicePourUnEtudiant;
