import React from 'react';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { getSessions } from '@stores/Sessions/sessionSlice';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Etudiant from './Etudiant';
import IconButton from '@mui/material/IconButton';
import CompareArrows from '@mui/icons-material/CompareArrows';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Box from '@mui/material/Box';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import * as triUtils from '../Utilitaires/Etudiant/TriEtudiant';
import { recupereSessions, recupereSeance } from '../Utilitaires/gestionSession';
import calculValExtremes from '../Utilitaires/CalculValExtremes';
import { useNavigate } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Grid from '@mui/material/Grid';
import MenuDeroulantSession from '../MenuDeroulantSession/MenuDeroulantSession';

function construitListeEtudiants(ListeEtudiantsExos) {
  const valExtremes = calculValExtremes(ListeEtudiantsExos);
  return ListeEtudiantsExos.map((objetIdEtuListeExo) => {
    // component="div" pour supprimer le warning (https://github.com/mui/material-ui/issues/19827)
    return (
      <Etudiant
        key={objetIdEtuListeExo.idEtu}
        idEtu={objetIdEtuListeExo.idEtu}
        valExtremes={valExtremes}
        listeExercices={objetIdEtuListeExo.listeExos}
      />
    );
  });
}

const arrowReverseTri = (reverseTri, handleReverseTri) => {
  return (
    <Box>
      <IconButton
        id="reversingArrow"
        onClick={handleReverseTri}
        label="rev"
        title="Inverser l'ordre du tri"
        sx={{
          '&:hover': {
            color: 'black',
          },
          color: reverseTri == 'false' ? 'black' : 'white',
          backgroundColor: reverseTri == 'false' ? 'white' : 'lightgray',
        }}
      >
        <CompareArrows sx={{ transform: 'rotate(90deg)' }} />
      </IconButton>
    </Box>
  );
};

const iconeFiltreExerciceValides = (exoValides, handleExoValides) => {
  const textToPrint =
    exoValides == 'all' ? 'Tous' : exoValides == 'valides' ? 'Réussis' : 'En cours';
  return (
    <Box orientation="row">
      <IconButton
        onClick={handleExoValides}
        sx={{ align: 'right' }}
        label="exV"
        title="!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      >
        <FilterAltIcon />
      </IconButton>
      <div id="textExoValides">{textToPrint}</div>
    </Box>
  );
};

const VisuResultatEtudiantComponent = () => {
  const sessions = useSelector(getSessions);
  const sessionStorageNameSession = 'idSes';
  const sessionStorageNameTri = 'tri';
  const sessionStorageSeance = 'idSeance';

  const [choixSession, setSession] = React.useState(
    sessionStorage.getItem(sessionStorageNameSession)
      ? sessionStorage.getItem(sessionStorageNameSession)
      : 'all',
  );
  const [seance, setSeance] = React.useState(
    sessionStorage.getItem(sessionStorageSeance)
      ? sessionStorage.getItem(sessionStorageSeance)
      : 'all',
  );
  const [choixTri, setTri] = React.useState(
    sessionStorage.getItem('tri') ? sessionStorage.getItem('tri') : 'alphabetique',
  );

  const [reverseTri, setReverse] = React.useState(
    sessionStorage.getItem('rev') ? sessionStorage.getItem('rev') : 'false',
  );

  const handleReverseTri = (event) => {
    const newValue = sessionStorage.getItem('rev') == 'true' ? 'false' : 'true';
    sessionStorage.setItem('rev', newValue);
    setReverse(newValue);
  };

  const [exoValides, setExoValides] = React.useState(
    sessionStorage.getItem('exV') ? sessionStorage.getItem('exV') : 'invalides',
  );

  const handleExoValides = (event) => {
    const newValue =
      sessionStorage.getItem('exV') == 'all'
        ? 'valides'
        : sessionStorage.getItem('exV') == 'valides'
        ? 'invalides'
        : 'all';
    sessionStorage.setItem('exV', newValue);
    setExoValides(newValue);
    document.getElementById('textExoValides').innerHTML =
      newValue == 'all' ? 'Tous' : newValue == 'valides' ? 'Réussis' : 'En cours';
  };

  // récupérer tous les exercices pour chaque  étudiant
  const exercices = useSelector(getExercices);

  let navigate = useNavigate();
  const redirectionResultat = () => {
    navigate('/avancement');
  };

  // collecter tous les exercices de chaque étudiant
  // clé : idEtu, valeur : listeExercices
  let ExosEtudiants = {};
  // tableau contenant tous les étudiants
  let ListeEtudiants = [];

  Object.values(exercices).map((exo) => {
    if (
      (exo.idSession == choixSession || choixSession == 'all') &&
      (exo.idSeance == seance || seance == 'all')
    ) {
      if (ExosEtudiants[exo.idEtu] === undefined) {
        ExosEtudiants[exo.idEtu] = [];
        ListeEtudiants.push(exo.idEtu);
      }
      // On ajoute l'exercice à l'étudiant
      ExosEtudiants[exo.idEtu].push(exo);
    }
  });

  // On créer un tableau avec les étudiants et leurs exercices
  let ListeEtudiantsExos = [];
  Object.entries(ExosEtudiants).map(([idEtu, listeExos]) => {
    ListeEtudiantsExos.push({ idEtu: idEtu, listeExos: listeExos });
  });

  // Trier ce tableau (par défaut alphabétique)
  ListeEtudiantsExos = triUtils.triEtudiants(ListeEtudiantsExos, choixTri, reverseTri, exoValides);

  const listeIdSession = recupereSessions(sessions);

  const listeIdSeance = recupereSeance(sessions);

  const menuTri = [
    'alphabetique',
    'nbExercice',
    'dateDerniereSoumission',
    'tempsDepuisDernierExo',
    'difficulte',
  ];

  return (
    <Box sx={{ marginLeft: '1em' }}>
      <Box
        sx={{
          position: 'relative',
          justifyContent: 'flex-start',
          display: 'inline-flex',
          width: '100%',
          marginTop: '1em',
        }}
      >
        <Stack direction="row" divider={<Divider orientation="horizontal" flexItem />}>
          <MenuDeroulantSession
            sessions={sessions}
            choixSession={choixSession}
            setSession={setSession}
            storageName={sessionStorageNameSession}
            nomArticle="Nom de session"
          />
          <MenuDeroulant
            listeId={listeIdSeance}
            choix={seance}
            setState={setSeance}
            storageName={sessionStorageSeance}
            nomArticle="Seance"
          />
          <MenuDeroulant
            listeId={menuTri}
            choix={choixTri}
            setState={setTri}
            storageName={sessionStorageNameTri}
            nomArticle="Tri"
          />
          {arrowReverseTri(reverseTri, handleReverseTri)}
          {iconeFiltreExerciceValides(exoValides, handleExoValides)}
          <IconButton
            onClick={redirectionResultat}
            title="Passer à la vue tableau"
            sx={{ align: 'right' }}
          >
            <FormatListNumberedIcon />
          </IconButton>
        </Stack>
      </Box>
      <Grid container spacing={2}>
        {construitListeEtudiants(ListeEtudiantsExos)}
      </Grid>
    </Box>
  );
};

export default VisuResultatEtudiantComponent;
