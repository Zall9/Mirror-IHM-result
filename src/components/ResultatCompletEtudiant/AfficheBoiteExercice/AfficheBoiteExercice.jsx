import React from 'react';
import BoiteRectangulaireExercicePourUnEtudiant from './BoiteRectangulaireExercicePourUnEtudiant/BoiteRectangulaireExercicePourUnEtudiant';
import { Stack } from '@mui/material';
import Item from '@mui/material/ListItem';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getExercises } from '@stores/Exercices/exercicesSlice';

function EtudiantSession(exercices, idSession) {
  const etudiants = [];
  exercices.map((exo) => {
    if (exo.idSession == idSession && !etudiants.includes(exo.idEtu)) {
      etudiants.push(exo.idEtu);
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

const AfficheBoiteExercice = ({ listeExercices }) => {
  // recuperer les exercices faits par l'étudiant
  // parcourir les exercices
  // récupérer les paramètres de cet exercice
  const exercices = useSelector(getExercises);
  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
      {listeExercices.map((exercice, index) => (
        <Item key={index} component="div">
          <BoiteRectangulaireExercicePourUnEtudiant
            Exo={exercice}
            ExoClasse={calculParametresMoyens(exercice.idExo, exercices, exercice.idSession)}
          />
        </Item>
      ))}
    </Stack>
  );
};

AfficheBoiteExercice.propTypes = {
  listeExercices: PropTypes.array.isRequired,
};

export default AfficheBoiteExercice;
