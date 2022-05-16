import React, { useEffect, useState } from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import DiagrammeCirculaireExercice from './DiagrammeCirculaireExercice';
import Box from '@mui/material/Box';
import CircularProgressWithLabel from '../VisuResultatExercice/CircularProgressWithLabel';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Item from '@mui/material/ListItem';
import calculScoreListeExo from '../Utilitaires/CalculScoreListeExo';
import compteNbExoValides from '../Utilitaires/CompteNbExoValides';

const construitListeDiagrammeExercices = (listeExercices) =>
  listeExercices.map((exercice, index) => {
    return (
      <Item key={index}>
        <DiagrammeCirculaireExercice exercice={exercice} />
      </Item>
    );
  });

const Etudiant = (props) => {
  const idEtu = props.idEtu;
  const listeExercices = props.listeExercices;
  const nbExoValides = compteNbExoValides(listeExercices);
  const scoreExo = calculScoreListeExo(listeExercices);
  const minValue = props.valExtremes.min;
  const maxValue = props.valExtremes.max;
  let navigate = useNavigate();
  const redirection = () => {
    navigate('/resultat/' + idEtu.toLowerCase());
  };

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ h2: { lineHeight: 0 }, marginBottom: '-10px' }}
    >
      <div height="100%" onClick={redirection}>
        <h2>
          {' '}
          idEtu={idEtu} {'  '}
        </h2>
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
        </Stack>
      </div>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        {construitListeDiagrammeExercices(listeExercices)}
      </Stack>
    </Stack>
  );
};

Etudiant.propTypes = {
  idEtu: PropTypes.string.isRequired,
  listeExercices: PropTypes.array.isRequired,
  valExtremes: PropTypes.object,
};

export default Etudiant;
