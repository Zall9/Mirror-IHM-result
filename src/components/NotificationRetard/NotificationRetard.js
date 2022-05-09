import * as React from 'react';
import { Badge, IconButton, Box, Menu, MenuItem, Button } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';

/**
 * compte le nombre d'étudiant qui ont passé plus de 2 fois le temps moyen de l'exo
 * @param {Array(exercice)} exercices
 * @returns {number}
 */
function countRetard(exercices) {
  let count = exercices
    .map((acc, exercice) => {
      if (acc.tempsMoyen != 0 && Date.now() - Date.parse(acc.debut) > acc.tempsMoyen * 2) {
        return 1;
      } else {
        return 0;
      }
    })
    .reduce((partialSum, a) => partialSum + a, 0);
  return count;
}

function idRetardataire(exercices) {
  let id = exercices.map((acc, exercice) => {
    if (acc.tempsMoyen != 0 && Date.now() - Date.parse(acc.debut) > acc.tempsMoyen * 2) {
      return acc.idEtu;
    }
  });
  console.log(id);
  return id;
}

/**
 * bouton de notification avec un affichage du nombre d'étudiant en retard
 * @returns {JSX.Element}
 */
const NotificationRetard = () => {
  let navigate = useNavigate();

  const exercices = useSelector(getExercices);
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

  console.log(openInfo);

  return (
    <Box>
      <IconButton onClick={ouvrirInfo}>
        <Badge badgeContent={countRetard(exercices)} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={openInfo} open={Boolean(openInfo)} onClose={fermerInfo}>
        {idRetardataire(exercices).map((id) => {
          return (
            <MenuItem key={id}>
              <Button onClick={redirection}>{id}</Button>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default NotificationRetard;
