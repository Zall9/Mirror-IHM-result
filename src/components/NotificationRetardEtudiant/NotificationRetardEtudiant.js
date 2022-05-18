import React from 'react';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import PropTypes from 'prop-types';
import { recupereExerciceCourantEtudiant } from '../Utilitaires/Exercices';

const NotificationRetardEtudiant = (props) => {
  const idEtudiant = props.idEtudiant;
  const exercices = useSelector(getExercices);
  const exerciceCourant = recupereExerciceCourantEtudiant(exercices, idEtudiant);
  const [time, setTime] = React.useState(Date.now());

  let interval;

  React.useEffect(() => {
    interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  var differenceTemps = time - Date.parse(exerciceCourant.debut);

  var retard = differenceTemps > exerciceCourant.tempsMoyen * 2 * 60000;

  return <Box>{retard ? <AccessAlarmIcon /> : null}</Box>;
};

NotificationRetardEtudiant.propTypes = {
  idEtudiant: PropTypes.string.isRequired,
};

export default NotificationRetardEtudiant;
