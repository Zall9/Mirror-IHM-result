import React from 'react';
import EtudiantCliquable from '../EtudiantCliquable/EtudiantCliquable'; //TODO ALIAS SUR LE COMPONENT
import PropTypes from 'prop-types';
import DiagrammeCirculaireExercice from './DiagrammeCirculaireExercice';

import { Stack, Box, Divider } from '@mui/material';
import Item from '@mui/material/ListItem';
import NotificationRetardEtudiant from '../NotificationRetardEtudiant/NotificationRetardEtudiant';

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
  const listeExerices = props.listeExercices;

  return (
    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
      <Item sx={{ width: '250px' }}>
        <Box>
          <EtudiantCliquable idEtu={idEtu} />
        </Box>
        <NotificationRetardEtudiant idEtudiant={idEtu} />
      </Item>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        {construitListeDiagrammeExercices(listeExerices)}
      </Stack>
    </Stack>
  );
};

Etudiant.propTypes = {
  idEtu: PropTypes.string.isRequired,
  listeExercices: PropTypes.array.isRequired,
};

export default Etudiant;
