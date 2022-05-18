import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import { getExercices } from '@stores/Exercices/exercicesSlice';

async function lancerExport(choix) {
  //Recuperation des exercices
  const exercices = await axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices');
  if (exercices) {
    const choisis = exercices.data.exercices.filter((exo) => exo.idSession === choix);
    downloadObjectAsJson(choisis);
  }
}

/**
 * crée un élément de lien, définit l'attribut href sur l'URI de données, définit l'attribut de
 * téléchargement sur le nom du fichier, ajoute le lien au corps, clique sur le lien, puis supprime le
 * lien du corps
 * @param exos - les données que vous souhaitez télécharger
 */
function downloadObjectAsJson(exos) {
  //const data = res.data.exercices;
  const dataStr = JSON.stringify(exos);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', `session-${exos[0].idSession}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/**
 * Une fonction qui renvoie un composant.
 */
const ExportResultat = () => {
  //variables
  var sessionStorageNameSession = 'idSes';
  var sessionStorageNameSeance = 'idSeance';
  var sessions = useSelector(getExercices)
    .map((exo) => exo.idSession)
    .filter((id, index, self) => self.indexOf(id) === index);
  //hooks
  var seances = useSelector(getExercices).map((exo) => exo.idSeance);
  //permets de stocker dans le cache session la valeur selectionnée dans le menu déroulant
  const [choix, setChoix] = React.useState(
    sessionStorage.getItem(sessionStorageNameSession)
      ? sessionStorage.getItem(sessionStorageNameSession)
      : '',
  );
  const [seance, setSeance] = React.useState(
    sessionStorage.getItem(sessionStorageNameSeance)
      ? sessionStorage.getItem(sessionStorageNameSeance)
      : '',
  );

  return (
    <div id="MaDiv">
      <MenuDeroulant
        Items={sessions}
        state={choix}
        setState={setChoix}
        storageName={sessionStorageNameSession}
        name="Session"
      />
      <MenuDeroulant
        Items={seances}
        state={seance}
        setState={setSeance}
        storageName={sessionStorageNameSeance}
      />
      <Button variant="contained" color="primary" onClick={() => lancerExport(choix)}>
        Exporter les resultats
      </Button>
    </div>
  );
};

export default ExportResultat;
