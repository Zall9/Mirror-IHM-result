import * as React from 'react';
import { Badge, IconButton, Box, Menu, MenuItem, Button } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getExercises } from '@stores/Exercices/exercicesSlice';

/**
 * compte le nombre d'étudiant qui ont passé plus de 2 fois le temps moyen de l'exo
 * @param {Array(exercice)} exercices
 * @returns {number}
 */
function countRetard(exercices, time) {
  return idRetardataire(exercices, time).length;
}

/**
 * créer un tableau avec les id des etudiants en retard
 * @param {Array(exercice)} exercices
 * @returns {Array(idEtu)}
 */
function idRetardataire(exercices, time) {
  let id = Object.values(exercices).map((exercice) => {
    if (
      exercice.tempsMoyen != 0 &&
      time - Date.parse(exercice.debut) > exercice.tempsMoyen * 2 * 60000
    ) {
      return exercice.idEtu;
    }
  });
  return id;
}

/**
 * bouton de notification avec un affichage du nombre d'étudiant en retard
 * @returns {JSX.Element}
 */
const NotificationRetard = () => {
  const [time, setTime] = React.useState(Date.now());

  let navigate = useNavigate();
  let interval;

  React.useEffect(() => {
    interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const exercices = useSelector(getExercises);
  const [openInfo, setOpenInfo] = React.useState(null);
  const fermerInfo = (event) => {
    setOpenInfo(null);
  };
  const ouvrirInfo = (event) => {
    setOpenInfo(event.currentTarget);
  };

  const redirection = (event) => {
    let uri = '/resultat/' + event.currentTarget.innerText.toLowerCase();
    navigate(uri);
  };

  return (
    <Box>
      <IconButton onClick={ouvrirInfo}>
        <Badge badgeContent={countRetard(exercices, time)} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={openInfo} open={Boolean(openInfo)} onClose={fermerInfo}>
        {idRetardataire(exercices, time).map((id, key) => {
          return (
            <MenuItem key={key}>
              <Button onClick={redirection}>{id}</Button>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default NotificationRetard;
