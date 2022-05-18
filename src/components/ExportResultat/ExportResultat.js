import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import { recupereSeance, recupereSessions } from '../Utilitaires/gestionSession';
import { getSessions } from '@stores/Sessions/sessionSlice';

async function lancerExport(choix) {
  //Recuperation des exercices
  const exercices = await axios.get(process.env.REACT_APP_SRVRESULT_URL + '/exercices');
  if (exercices) {
    const choisis =
      choix === 'all'
        ? exercices.data.exercices
        : exercices.data.exercices.filter((exo) => exo.idSession === choix);
    downloadObjectAsJson(choisis, choix);
  }
}

/**
 * crée un élément de lien, définit l'attribut href sur l'URI de données, définit l'attribut de
 * téléchargement sur le nom du fichier, ajoute le lien au corps, clique sur le lien, puis supprime le
 * lien du corps
 * @param exos - les données que vous souhaitez télécharger
 */
function downloadObjectAsJson(exos, choix) {
  //const data = res.data.exercices;
  const dataStr = JSON.stringify(exos);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', `session-${choix}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/**
 * Une fonction qui renvoie un composant.
 */
const ExportResultat = () => {
  //variables
  const sessionStorageNameSession = 'idSes';
  const sessionStorageNameSeance = 'idSeance';

  const sessions = useSelector(getSessions);

  const sessionsId = recupereSessions(sessions);
  //hooks
  const seancesId = recupereSeance(sessions);
  //permets de stocker dans le cache session la valeur selectionnée dans le menu déroulant
  const [choix, setChoix] = React.useState(
    sessionStorage.getItem(sessionStorageNameSession)
      ? sessionStorage.getItem(sessionStorageNameSession)
      : 'all',
  );
  const [seance, setSeance] = React.useState(
    sessionStorage.getItem(sessionStorageNameSeance)
      ? sessionStorage.getItem(sessionStorageNameSeance)
      : '',
  );

  return (
    <div id="MaDiv">
      <MenuDeroulant
        listeId={sessionsId}
        choix={choix}
        setState={setChoix}
        nomArticle={sessionStorageNameSession}
        name="Session"
      />
      <MenuDeroulant
        listeId={seancesId}
        choix={seance}
        setState={setSeance}
        nomArticle={sessionStorageNameSeance}
        name="Seance"
      />
      <Button variant="contained" color="primary" onClick={() => lancerExport(choix)}>
        Exporter les resultats
      </Button>
    </div>
  );
};

export default ExportResultat;
