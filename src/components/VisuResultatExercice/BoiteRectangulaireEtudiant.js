import React, { useEffect, useState } from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

// construire Box par étudiant

const BoiteRectangulaireEtudiant = (props) => {
  const exo = props.etudiantExo;
  const color = getColor(exo);
  let navigate = useNavigate();
  const estFini = exo.estFini;
  var interval;
  const redirection = () => {
    let uri = '/resultat/' + exo.idEtu.toLowerCase();
    navigate(uri);
  };

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
    <div onClick={redirection}>
      <Box
        sx={{
          minWidth: '150px',
          width: 'auto',

          backgroundColor: color,
          borderRadius: '15px',
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <h2> {exo.idEtu}</h2>
        <ul>
          <li>nb tentatives : {exo.tentatives.length}</li>
          {affichageTemps(exo)}
        </ul>
      </Box>
    </div>
  );
};
function affichageTemps(exo) {
  return exo.estFini ? (
    <li>
      temps :{' '}
      {Math.floor(
        (Date.parse(exo.tentatives[exo.tentatives.length - 1].dateSoumission) -
          Date.parse(exo.debut)) /
          60000,
      )}{' '}
      m
    </li>
  ) : exo.tentatives.length != 0 ? (
    <li>
      derniere soumission :{' '}
      {Math.floor(
        (Date.now() - Date.parse(exo.tentatives[exo.tentatives.length - 1].dateSoumission)) / 60000,
      )}{' '}
      m
    </li>
  ) : (
    <li>démarré depuis :{Math.floor((Date.now() - Date.parse(exo.debut)) / 60000)} m</li>
  );
}

function getTimeProportion(exo) {
  const tm = parseInt(exo.tempsMoyen) ?? 10;
  const ta =
    (Date.now() -
      Date.parse(
        exo.tentatives.length != 0
          ? exo.tentatives[exo.tentatives.length - 1].dateSoumission
          : exo.debut,
      )) /
    60000;
  return ta / (tm <= 0 ? 10 : tm);
}

function getColor(exo) {
  if (exo.estFini) {
    return '#41E251';
  }
  const c1 = [255, 255, 86];
  const c2 = [169, 0, 0];
  // tp mesure le temps par rapport au temps moyen entre 0 (vient de commencer) et 1 (y'a très longtemps)
  let tp = getTimeProportion(exo) / 2;
  tp = tp > 1 ? 1 : tp;
  // resultat entre 0 (vient de commencer et 1 y'a très longtemps)
  const cr = [
    Math.floor(c1[0] * (1 - tp) + c2[0] * tp),
    Math.floor(c1[1] * (1 - tp) + c2[1] * tp),
    Math.floor(c1[2] * (1 - tp) + c2[2] * tp),
  ];
  return '#' + ((1 << 24) + (cr[0] << 16) + (cr[1] << 8) + cr[2]).toString(16).slice(1);
}
BoiteRectangulaireEtudiant.propTypes = {
  etudiantExo: PropTypes.object.isRequired,
};

export default BoiteRectangulaireEtudiant;
