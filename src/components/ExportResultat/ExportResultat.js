import { Button } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import { getExercices } from '@stores/Exercices/exercicesSlice';

/**
 * Callback: Télécharge les données dans un fichier json
 */

function downloadObjectAsJson(dicoSession, choix) {
  axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices').then(
    (res) => {
      console.log('ici');
      //const data = res.data.exercices;
      const dataStr = JSON.stringify(dicoSession[choix]);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const link = document.createElement('a');
      link.setAttribute('href', dataUri);
      link.setAttribute('download', 'exercices.json');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    (err) => {
      console.log(err);
    },
    () => {
      console.log('done');
    },
  );
}
const ExportResultat = () => {
  //variables
  var sessionStorageNameSession = 'idSes';
  //Recuperation des exercices dans le store
  var exercices = useSelector(getExercices);
  //hooks
  const [choix, setChoix] = React.useState(
    sessionStorage.getItem(sessionStorageNameSession)
      ? sessionStorage.getItem(sessionStorageNameSession)
      : '',
  );
  //construction d'un tableau contenant les sessions
  var dicoSession = {};
  var cpt = 0;
  var listeExercices = [];
  var listeSession = [];
  //je recupere les sessions et les places dans le tableau
  exercices.map((exo) => {
    console.log(exo);
    if (listeSession.includes(exo.idSession) == false) {
      listeSession.push(exo.idSession);
    }
  });
  //je place maintenant les exercices
  // dans un dictionnaire
  // clé valeur avec pour clé idSession et pour valeur un tableau d'exercices
  exercices.map((exo) => {
    if (dicoSession[exo.idSession] === undefined) {
      dicoSession[exo.idSession] = [];
    }
    dicoSession[exo.idSession].push(exo);
  });
  console.log(dicoSession);
  console.log(listeSession);
  return (
    <div>
      <MenuDeroulant
        Items={listeSession}
        state={choix}
        setState={setChoix}
        storageName={sessionStorageNameSession}
        name="Session"
      />
      <Button
        onClick={downloadObjectAsJson(dicoSession, choix)}
        variant="contained"
        color="primary"
      >
        Exporter les resultats
      </Button>
    </div>
  );
};

export default ExportResultat;
