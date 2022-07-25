import React from 'react';
import PropTypes from 'prop-types';
import DiagrammeCirculaireExercice from './DiagrammeCirculaireExercice';
import CircularProgressWithLabel from '@components/CircularProgressWithLabel/CircularProgressWithLabel';

import { useNavigate } from 'react-router-dom';
import calculScoreListeExo from '../LEGACY-Utilitaires/CalculScoreListeExo';
import compteNbExoValides from '../LEGACY-Utilitaires/CompteNbExoValides';
import { etudiantParser, etudiantUnParser } from '../LEGACY-Utilitaires/Etudiant/etudiantParser';
import PanToolIcon from '@mui/icons-material/PanTool';
import { Divider, IconButton, Stack } from '@mui/material';
import axios from 'axios';
import { Grid, Box } from '@mui/material';
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
  const idEtu = props.idEtu;
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

  let actualize = false;
  const remetAZero = () => {
    // trouver le bon exo
    for (const exo of listeExercices) {
      if (!exo.estFini) {
        axios.put(import.meta.env.VITE_SRVRESULT_URL + '/exercices/' + exo.id + '/aides').then();
      }
    }
    actualize = !actualize;
  };

  const [time, setTime] = React.useState(Date.now());
  var interval;

  React.useEffect(() => {
    interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Divider orientation="horizontal" flexItem sx={{ margin: '1em' }} />
      </Grid>
      <Grid container>
        <Grid item xs={3}>
          <Grid container>
            <Grid item xs={5}>
              <Box onClick={redirection}>
                <h2>{etudiantParser(idEtu)}</h2>
              </Box>
            </Grid>
            <Grid item xs={2} sx={{ my: 1.6 }}>
              <CircularProgressWithLabel
                value={nbExoValides}
                color="secondary"
                isAPercentage={false}
                textOver="Nombre d'exercices réussis."
                mustBe100percent={true}
              />
            </Grid>
            <Grid item xs={2} sx={{ my: 1.6 }}>
              <CircularProgressWithLabel
                value={scoreExo}
                color="primary"
                isAPercentage={false}
                textOver="Score par rapport au score maximum."
                minValue={minValue}
                maxValue={maxValue}
              />
            </Grid>
            <Grid item xs={2} sx={{ my: 1.6 }}>
              <IconButton onClick={remetAZero}>
                <PanToolIcon
                  sx={{
                    color: { color },
                    // animation: `${shakeAnimation} 0.7s ease-out 0s infinite alternate;`,
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item xs={1} sx={{ my: 2.5 }}>
              <NotificationRetardEtudiant idEtudiant={idEtu} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9} sx={{ display: 'flex' }}>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row">{construitListeDiagrammeExercices(listeExercices)}</Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

Etudiant.propTypes = {
  idEtu: PropTypes.string.isRequired,
  listeExercices: PropTypes.array.isRequired,
  valExtremes: PropTypes.object,
};

export default Etudiant;
