import React from 'react';
import PropTypes from 'prop-types';
import DiagrammeCirculaireExercice from './DiagrammeCirculaireExercice';
import CircularProgressWithLabel from '@components/CircularProgressWithLabel/CircularProgressWithLabel';

import { useNavigate } from 'react-router-dom';
import calculScoreListeExo from '../Utilitaires/CalculScoreListeExo';
import compteNbExoValides from '../Utilitaires/CompteNbExoValides';
import { etudiantParser, etudiantUnParser } from '../Utilitaires/Etudiant/etudiantParser';
import PanToolIcon from '@mui/icons-material/PanTool';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { Stack, Divider } from '@mui/material';
import Item from '@mui/material/ListItem';
import NotificationRetardEtudiant from '../NotificationRetardEtudiant/NotificationRetardEtudiant';

const construitListeDiagrammeExercices = (listeExercices) =>
  listeExercices.map((exercice, index) => {
    return (
      <Item key={index}>
        <DiagrammeCirculaireExercice exercice={exercice} display={false} />
      </Item>
    );
  });

const Etudiant = (props) => {
  const idEtu = etudiantParser(props.idEtu);
  const listeExercices = props.listeExercices;
  const nbExoValides = compteNbExoValides(listeExercices);
  const scoreExo = calculScoreListeExo(listeExercices);
  const minValue = props.valExtremes.min;
  const maxValue = props.valExtremes.max;

  let navigate = useNavigate();
  const redirection = () => {
    navigate('/resultat/' + etudiantUnParser(idEtu.toLowerCase()));
  };

  // const shakeAnimation = () => keyframes`
  //   0% { transform: translate3d(0,0,0); },
  //   50% { transform: rotate(0deg) },
  //   100% { transform: rotate(30deg) },
  // `;
  function remetAZero() {
    // trouver le bon exo
    for (const exo of listeExercices) {
      if (!exo.estFini) {
        axios
          .get(process.env.REACT_APP_SRVRESULT_URL + '/aides/resolve', {
            params: { idExo: exo.idExo, idEtu: exo.idEtu, idSession: exo.idSession },
          })
          .then();
      }
    }
  }
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
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ h2: { lineHeight: 0 }, marginBottom: '-10px' }}
    >
      <div display="block flow">
        <div onClick={redirection}>
          <h2>
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
          <IconButton onClick={remetAZero}>
            <PanToolIcon
              sx={{
                color: { color },
                // animation: `${shakeAnimation} 0.7s ease-out 0s infinite alternate;`,
              }}
            />
          </IconButton>
          <NotificationRetardEtudiant idEtudiant={idEtu} />
        </Stack>
      </div>
      <div>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
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
