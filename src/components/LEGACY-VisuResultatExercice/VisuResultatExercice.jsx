import React from 'react';
import { useSelector } from 'react-redux';
import { getExercises } from '@stores/Exercises/exercisesSlice';
import { getSessions } from '@stores/Sessions/sessionSlice';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ArrowReverseTri from './ArrowReverseTri/ArrowReverseTri';
import ExercicesListe from './ExercicesListe/ExercicesListe';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import { recupereSessions, recupereSeance } from '../LEGACY-Utilitaires/gestionSession';
import { triEtudiants } from '@components/Utilitaires/Exercices/TriEtudiants';
//###########################################################################

// ==============================================================================================================debut
// renvoyer un composant par exercice
const VisuResultatExercice = () => {
  const sessions = useSelector(getSessions);

  const [choixSession, setSession] = React.useState(
    sessionStorage.getItem('idSes') ? sessionStorage.getItem('idSes') : '',
  );

  const [choixTri, setTri] = React.useState(
    sessionStorage.getItem('tri') ? sessionStorage.getItem('tri') : 'alphabetique',
  );

  const handleChangeTri = (event) => {
    sessionStorage.setItem('tri', event.target.value);
    setTri(event.target.value);
  };

  const [reverseTri, setReverse] = React.useState(
    sessionStorage.getItem('rev') ? sessionStorage.getItem('rev') : 'false',
  );

  const handleReverseTri = (event) => {
    const newValue = sessionStorage.getItem('rev') == 'true' ? 'false' : 'true';
    sessionStorage.setItem('rev', newValue);
    setReverse(newValue);
  };

  const sessionStorageSeance = 'idSeance';

  const [seance, setSeance] = React.useState(
    sessionStorage.getItem(sessionStorageSeance)
      ? sessionStorage.getItem(sessionStorageSeance)
      : 'all',
  );

  let navigate = useNavigate();
  const redirectionResultat = () => {
    navigate('/videoprojecteur');
  };

  // récupérer tous les exercices
  const exercices = useSelector(getExercises);
  const idSession = choixSession;

  // filtre suivant difficulté
  // récupéré toutes les difficultés des exercices
  // ajouter une checkbox pour chaque difficulté
  // on considere qu'elles sont toutes cochées de base
  // si on décoche cela supprime les exercices correspondant

  // filtre suivant

  // collecter tous les étudiants de chaque exercice
  // clé : idExo, valeur : listeEtudiants
  let ExosEtudiants = {};
  // tableau contenant tous les exercices pour pouvoir les trier
  let ListeExercices = [];

  exercices.map((exo) => {
    if (
      (exo.idSession === choixSession || choixSession === 'all') &&
      (exo.idSeance === seance || seance === 'all')
    ) {
      if (ExosEtudiants[exo.idExo] === undefined) {
        ExosEtudiants[exo.idExo] = [];
        ListeExercices.push(exo.idExo);
      }
      // On ajoute l'exercice à l'étudiant
      ExosEtudiants[exo.idExo].push(exo);
    }
  });

  // On créer un tableau avec les exercices et leurs étudiants
  let ListeExosEtudiants = [];
  Object.entries(ExosEtudiants).map(([idExo, listeEtus]) => {
    ListeExosEtudiants.push({ idExo: idExo, listeEtus: listeEtus });
  });

  // Trier ce tableau (par défaut alphabétique)
  triEtudiants(ListeExosEtudiants, choixTri, reverseTri);

  const listeIdSession = recupereSessions(sessions);
  const listeIdSeance = recupereSeance(sessions);

  const menuTri = [
    'alphabetique',
    'nbExercice',
    'nbExerciceNonValide',
    'nbExerciceValide',
    'dateDerniereSoumission',
    'difficulte',
  ];

  return (
    <div>
      <Box
        sx={{
          position: 'relative',
          justifyContent: 'flex-start',
          display: 'inline-flex',
          width: '100%',
        }}
      >
        <MenuDeroulant
          listeId={listeIdSession}
          choix={choixSession}
          setState={setSession}
          nomArticle={'idSes'}
          name={'Session'}
        />

        <MenuDeroulant
          listeId={listeIdSeance}
          choix={seance}
          setState={setSeance}
          storageName={sessionStorageSeance}
          name="Seance"
        />

        <MenuDeroulant
          listeId={menuTri}
          choix={choixTri}
          setState={setTri}
          nomArticle={'tri'}
          name={'Tri'}
        />

        <ArrowReverseTri reverseTri={reverseTri} handleReverseTri={handleReverseTri} />

        <IconButton
          onClick={redirectionResultat}
          title="Passer à la vue tableau"
          sx={{ align: 'right' }}
        >
          <FormatListNumberedIcon />
        </IconButton>
      </Box>
      <ExercicesListe ListeExos={ListeExosEtudiants} exercices={exercices} />
    </div>
  );
};

export default VisuResultatExercice;
