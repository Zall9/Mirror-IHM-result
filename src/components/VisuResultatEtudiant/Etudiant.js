import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DiagrammeCirculaireExercice from './DiagrammeCirculaireExercice';
import CircularProgressWithLabel from '../VisuResultatExercice/CircularProgressWithLabel';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import calculScoreListeExo from '../Utilitaires/CalculScoreListeExo';
import compteNbExoValides from '../Utilitaires/CompteNbExoValides';

import PanToolIcon from '@mui/icons-material/PanTool';
import { IconButton } from '@mui/material';
import { jsx, css, keyframes } from '@emotion/react';
import axios from 'axios';

const construitListeDiagrammeExercices = (listeExercices) =>
  listeExercices.map((exercice, index) => {
    return (
      <Item key={index}>
        <DiagrammeCirculaireExercice exercice={exercice} display={false} />
      </Item>
    );
  });

const iconeMainDemandeAide = (listeExercices, remetAZero) => {
  // const shakeAnimation = () => keyframes`
  //   0% { transform: translate3d(0,0,0); },
  //   50% { transform: rotate(0deg) },
  //   100% { transform: rotate(30deg) },
  // `;

  const color =
    listeExercices
      .map((exo) => {
        if (
          exo.aides
            .map((aide) => {
              if (aide.resolue == false) {
                return 1;
              }
            })
            .filter((value) => value == 1).length != 0
        ) {
          return 1;
        }
      })
      .filter((value) => value == 1).length != 0
      ? '#CC0000'
      : '#CCCCCC';
  return (
    <IconButton onClick={remetAZero}>
      <PanToolIcon
        sx={{
          color: { color },
          // animation: `${shakeAnimation} 0.7s ease-out 0s infinite alternate;`,
        }}
      />
    </IconButton>
  );
};

const Etudiant = (props) => {
  const idEtu = props.idEtu;
  const listeExercices = props.listeExercices;
  const nbExoValides = compteNbExoValides(listeExercices);
  const scoreExo = calculScoreListeExo(listeExercices);
  const minValue = props.valExtremes.min;
  const maxValue = props.valExtremes.max;
  let actualize = 0;
  function remetAZero() {
    // trouver le bon exo
    for (const exo of listeExercices) {
      if (!exo.estFini) {
        axios.put(process.env.REACT_APP_SRVRESULT_URL + '/exercices/' + exo.id + '/aides').then();
      }
    }
    actualize++;
  }

  let navigate = useNavigate();
  const redirection = () => {
    navigate('/resultat/' + idEtu.toLowerCase());
  };

  const [time, setTime] = useState(Date.now());
  var interval;

  useEffect(() => {
    interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ h2: { lineHeight: 0 }, marginRight: '-10px' }}
    >
      <div display="block flow">
        <div onClick={redirection}>
          <h2 align="center">
            {' '}
            {idEtu} {'  '}
          </h2>
        </div>
        <Stack direction="row">
          <CircularProgressWithLabel
            value={nbExoValides}
            color="secondary"
            isAPercentage={false}
            textOver="Nombre d'exercices réussis."
            mustBe100percent={true}
          />
          <CircularProgressWithLabel
            value={scoreExo}
            color="primary"
            isAPercentage={false}
            textOver="Score par rapport au score maximum."
            minValue={minValue}
            maxValue={maxValue}
          />
          {iconeMainDemandeAide(listeExercices, remetAZero)}
        </Stack>
      </div>
      <div>
        <Stack direction="column" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
          {construitListeDiagrammeExercices(listeExercices)}
        </Stack>
      </div>
    </Stack>
  );
};

Etudiant.propTypes = {
  idEtu: PropTypes.string.isRequired,
  listeExercices: PropTypes.array.isRequired,
  valExtremes: PropTypes.object,
};

export default Etudiant;
