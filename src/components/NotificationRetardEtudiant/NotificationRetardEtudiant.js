import React from 'react';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { getExercises } from '@stores/Exercices/exercicesSlice';
import PropTypes from 'prop-types';
import { recupereExerciceCourantEtudiant } from '../Utilitaires/Exercices';

/**
 *  Composant qui s'affiche si l'etudiant est en retard
 * @param {Json} props contient uniquement l'id de l'etudiant
 * @returns Si l'etudiant a passé plus de 2 fois le temps moyen de l'exo,
 * alors affiche une icon de retard
 */
const NotificationRetardEtudiant = (props) => {
  const idEtudiant = props.idEtudiant;
  const exercices = useSelector(getExercises);
  const exerciceCourant = recupereExerciceCourantEtudiant(exercices, idEtudiant);

  // useState utiliser pour réafficher le composant régulièrement
  const [time, setTime] = React.useState(Date.now());
  let interval;
  React.useEffect(() => {
    interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  let differenceTemps = 0;
  let retard = false;

  // On test si l'exercice courant existe au cas ou l'étudiant n'as aucun exercice non fini
  if (exerciceCourant) {
    differenceTemps = time - Date.parse(exerciceCourant.debut);
    retard = differenceTemps > exerciceCourant.tempsMoyen * 2 * 60000;
  }
  // affiche AccessAlarmIcon si l'etudiant à passé plus de  fois le temps moyen
  return <Box>{retard ? <AccessAlarmIcon /> : null}</Box>;
};

NotificationRetardEtudiant.propTypes = {
  idEtudiant: PropTypes.string.isRequired,
};

export default NotificationRetardEtudiant;
