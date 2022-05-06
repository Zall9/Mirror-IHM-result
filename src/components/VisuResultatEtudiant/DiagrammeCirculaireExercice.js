import React, { useEffect } from 'react';
import DiagrammeCirculaire from '../DiagrammeCirculaire/DiagrammeCirculaire'; //TODO ALIAS SUR LE COMPONENT

import { useSelector } from 'react-redux';

function majTemps(debut, tempsMoyen) {
  let date = new Date();
  let temps = date.getTime() - debut;
  let ratioTemps = Math.floor(temps / tempsMoyen);
  let ratioResteTemps = Math.floor((tempsMoyen - temps) / tempsMoyen);

  let data = [ratioTemps, ratioResteTemps];
  return data;
}

const DiagrammeCirculaireExercice = (props) => {
  //TODO: utiliser useSelector pour récupérer les données du store pour un exo ?
  const exercice = props.exercice;
  const debut = exercice.debut;
  const tempsMoyen = exercice.tempsMoyen;
  const estFini = exercice.estFini;

  let textValidation = estFini ? '✔' : '✖';
  let colorValidation = estFini ? '#00ff00' : '#FFA500';

  let optionsElementCentralAEnvoyer = {
    text: textValidation,
    color: colorValidation, // Par défaut #000000
    fontStyle: 'Arial', // Par défaut Arial
    sidePadding: 1, // Par défaut 20 (pourcentage de padding)
    minFontSize: false, // Par défaut 20 px, false pour qu'il n'y ait pas de min.
    maxFontSize: 800, // Par défaut 75 px.
  };
  const typeDiagrammeAEnvoyer = 'doughnut';

  //TODO: Comment faire ?
  const dataAEnvoyer = [];
  setInterval(majTemps, 1000, debut, tempsMoyen);

  const tailleAEnvoyer = 80;
  const titreAEnvoyer = 'Temps écoulé';
  const couleurAEnvoyer = ['#00ff00'];
  const clickCallbackAEnvoyer = null;
  const idAEnvoyer = 'diagrammeCirculaireExercice';
  const booleanIsInteractiveAEnvoyer = false;
  const labelsAEnvoyer = ['Temps écoulé', 'Temps restant'];

  return (
    <DiagrammeCirculaire
      //definition des props
      datas={dataAEnvoyer}
      taille={tailleAEnvoyer}
      typeDiagramme={typeDiagrammeAEnvoyer}
      titre={titreAEnvoyer}
      couleurs={couleurAEnvoyer}
      clickCallback={clickCallbackAEnvoyer}
      booleanIsInteractive={booleanIsInteractiveAEnvoyer}
      id={idAEnvoyer}
      labels={labelsAEnvoyer}
      optionsElementCentral={optionsElementCentralAEnvoyer}
    />
  );
};

DiagrammeCirculaireExercice.propTypes = {
  exercice: PropTypes.object.isRequired,
};

export default DiagrammeCirculaireExercice;
