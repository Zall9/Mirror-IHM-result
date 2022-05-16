import React from 'react';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import Etudiant from '@components/VisuResultatEtudiant/Etudiant';
import BoiteRectangulaireExercicePourUnEtudiant from './BoiteRectangulaireExercicePourUnEtudiant';
import Row from './RowResultatComplet/RowResultatComplet';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import Item from '@mui/material/ListItem';

const ResultatCompletEtudiant = (param /*, seance*/) => {
  // const [data, setData] = useState([]);
  const idEtu = param.idEtu;
  const exercices = useSelector(getExercices).filter(filtreResultat);
  exercices.sort(triTab);

  // filtre les résultats TODO : sessions
  function filtreResultat(exercice) {
    if (exercice.idEtu == idEtu) {
      return true;
    }
    return false;
  }

  // tri les résultats en fonction du fait qu'il soit fini ou non et de la date des soumissions
  function triTab(exercice1, exercice2) {
    if (exercice1.estFini == false) {
      return -1;
    }
    if (exercice2.estFini == false) {
      return 1;
    }
    return exercice2.debut.valueOf() - exercice1.debut.valueOf();
  }

  function createData(exo, nomExo, nbTenta, temps, difficulte, themes, history) {
    return {
      exo,
      nomExo,
      nbTenta,
      temps,
      difficulte,
      themes,
      history,
    };
  }

  function calculTempsMinutes(debut, fin) {
    return Math.floor((Date.parse(debut) - Date.parse(fin)) / 60000);
  }

  const rows = [];
  let i = 0;
  let temps = 0;
  for (const exercice of exercices) {
    if (exercice.estFini == true) {
      temps = calculTempsMinutes(
        exercice.tentatives[exercice.tentatives.length - 1].dateSoumission,
        exercice.debut,
      );
    } else {
      temps = calculTempsMinutes(Date(), exercice.debut);
    }
    const tentative = [];
    for (let i = 0; i < exercice.tentatives.length; i++) {
      if (i == 0) {
        tentative.push({
          dateSoumission: exercice.tentatives[i].dateSoumission,
          logErreurs: exercice.tentatives[i].logErreurs,
          tempsSoumission: calculTempsMinutes(
            exercice.tentatives[i].dateSoumission,
            exercice.debut,
          ),
          soumissionNumber: i,
        });
      } else {
        tentative.push({
          dateSoumission: exercice.tentatives[i].dateSoumission,
          logErreurs: exercice.tentatives[i].logErreurs,
          tempsSoumission: calculTempsMinutes(
            exercice.tentatives[i].dateSoumission,
            exercice.tentatives[i - 1].dateSoumission,
          ),
          soumissionNumber: i,
        });
      }
    }
    rows.push(
      createData(
        i == 0 ? 'En Cours' : i.toString(),
        exercice.nomExo,
        exercice.tentatives.length,
        temps,
        exercice.difficulte,
        exercice.themes.join(' '),
        tentative,
      ),
    );
    i++;
  }

  //Calcul nb etudiants de la session
  function EtudiantSession(exercices, idSession) {
    const etudiants = [];
    exercices.map((exo) => {
      if (exo.idSession == idSession && !etudiants.includes(exo.idEtu)) {
        etudiants.push(idEtu);
      }
    });
    return etudiants.length;
  }

  // Cré l'objet des paramètres "moyen" de la session a transmettre à la boite exercice
  function calculParametresMoyens(idExo, exercices, idSession) {
    let nbTentasReussi = 0;
    let temps = 0;
    let tpsEtu = 0;
    let nbTentaEtu = 0;
    let nbEtu = 0;
    let nbEtuValide = 0;
    let tpsMin = Infinity;
    let tpsMax = 0;
    let nbTentaMin = Infinity;
    let nbTentaMax = 0;
    let nbEtuSession = EtudiantSession(exercices, idSession);
    exercices.filter(filtreResultatExercice);

    // fitre les mêmes exercices et la meme session
    function filtreResultatExercice(exercice) {
      if (exercice.idExo == idExo && exercice.idSession == idSession) {
        return true;
      }
      return false;
    }
    // construit le parametre
    exercices.map((exo) => {
      nbEtu++;
      if (exo.estFini) {
        tpsEtu =
          Date.parse(exo.tentatives[exo.tentatives.length - 1].dateSoumission) -
          Date.parse(exo.debut);
        temps += tpsEtu;
        nbEtuValide++;
        nbTentaEtu = exo.tentatives.length;
        nbTentasReussi += nbTentaEtu;
        nbTentaMax = nbTentaMax > nbTentaEtu ? nbTentaMax : nbTentaEtu;
        nbTentaMin = nbTentaMin < nbTentaEtu ? nbTentaMin : nbTentaEtu;
        tpsMin = tpsMin > tpsEtu ? tpsEtu : tpsMin;
        tpsMax = tpsMax < tpsEtu ? tpsEtu : tpsMax;
      }
    });
    return {
      nbEtu: nbEtuSession,
      nbEtuValide: nbEtuValide,
      tpsMoy: temps / nbEtu,
      tpsMin: tpsMin,
      tpsMax: tpsMax,
      tentaMoy: nbTentasReussi / nbEtuValide,
      tentaMin: nbTentaMin,
      tentaMax: nbTentaMax,
    };
  }

  function afficheBoiteExercice(listeExercices) {
    // recuperer les exercices faits par l'étudiant
    // parcourir les exercices
    // récupérer les paramètres de cet exercice
    console.log('liste Exercices', listeExercices);
    const exercices = useSelector(getExercices);
    console.log(exercices);
    console.log('fonction affiche boite exercice');
    return listeExercices.map((exercice, index) => {
      const parametres = calculParametresMoyens(exercice.idExo, exercices, exercice.idSession);
      console.log('exercices', exercice);
      console.log('parametres', parametres);
      return (
        <Item key={index} component="div" width-min>
          <BoiteRectangulaireExercicePourUnEtudiant Exo={exercice} ExoClasse={parametres} />
        </Item>
      );
    });
  }
  let scoreSeance = 0;
  exercices.map((exo) => {
    if (exo.estFini) {
      scoreSeance += exo.difficulte;
    }
  });

  return (
    <Box>
      <h2 align="center"> Score : {scoreSeance}</h2>
      <h2>progression résumée : </h2>
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
        {afficheBoiteExercice(exercices)}
      </Stack>

      <h2>progression détaillée :</h2>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">
                <h2>Exercice</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Nom Exo</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Nb Tentatives</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Temps passé (en m)</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Difficulté</h2>
              </TableCell>
              <TableCell align="center">
                <h2>Thèmes</h2>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.exo} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
function tempsSoumissionToString(temps) {
  return temps;
}

function stringDateToTimestamp(stringDate) {
  return Date.parse(stringDate).valueOf();
}

export default ResultatCompletEtudiant;
