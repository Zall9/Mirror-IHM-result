import React, { useEffect, useState } from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import getColor from '../Utilitaires/DegradeColorDansTemps';

// construire Box par étudiant

const BoiteRectangulaireEtudiant = (props) => {
  const exo = props.etudiantExo;
  const color = getColor(
    exo,
    '#FFFF56',
    '#FF6565',
    (exo) => getTimeProportion(exo) / 2,
    '#6EFB87',
    (exo) => exo.estFini,
  );
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
          margin: '3px',
          '&:hover': {
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <h2 align="center"> {exo.idEtu}</h2>
        <ul>
          <li>tentatives : {exo.tentatives.length}</li>
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
      temps :{' '}
      {Math.floor(
        (Date.now() - Date.parse(exo.tentatives[exo.tentatives.length - 1].dateSoumission)) / 60000,
      )}{' '}
      m
    </li>
  ) : (
    <li>temps :{Math.floor((Date.now() - Date.parse(exo.debut)) / 60000)} m</li>
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

BoiteRectangulaireEtudiant.propTypes = {
  etudiantExo: PropTypes.object.isRequired,
};

export default BoiteRectangulaireEtudiant;
