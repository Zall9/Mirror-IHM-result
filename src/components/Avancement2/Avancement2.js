import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';

const Avancement2 = () => {
  const columns = [
    { field: 'id', headerName: 'id Etudiant', width: 150 },
    { field: 'nbExoValid', headerName: 'nb exo valide', type: 'number', width: 130 },
    { field: 'nomExo', headerName: 'exo en cours', width: 180 },
    { field: 'tpsExo', headerName: 'temps passe', type: 'number', width: 130 },
    { field: 'nbTentatives', headerName: 'tentatives', type: 'number', width: 130 },
    { field: 'themes', headerName: 'themes', sortable: false, width: 250 },
    { field: 'difficulte', headerName: 'difficultes', type: 'number', width: 130 },
  ];
  console.log(columns);

  // récupérer tous les résultats
  const exercices = useSelector(getExercices);
  // collecter tous les étudiants
  let etudiants = [];
  for (const exo of exercices) {
    if (!etudiants.includes(exo.idEtu)) {
      etudiants.push(exo.idEtu);
    }
  }

  console.log(etudiants);
  // faire un tableau id etudiant
  let avancement = [];
  // faire un tableau id etudiant / avec le nb d'exercices validés
  // et des informations sur l'exercice courant : nb de tentative / le temps passé / nom exo / thèmes / difficultés

  for (const etudiant of etudiants) {
    console.log(etudiant);
    console.log(exercices);
    const exoEnCours = exercices.filter((exo) => exo.idEtu == etudiant && exo.estFini == false);
    console.log(exoEnCours);

    avancement.push({
      id: etudiant,
      nbExoValid: exercices.filter((exo) => exo.idEtu == etudiant && exo.estFini == true).length,
      tpsExo: Date.now().valueOf() - stringDateToTimestamp(exoEnCours[0].debut) ?? 0,
      nbTentatives: exoEnCours[0].tentatives.length,
      nomExo: exoEnCours[0].nomExo,
      themes: exoEnCours[0].themes.join(),
      difficulte: exoEnCours[0].difficulte ?? 0,
    });
  }
  const rows = avancement;
  console.log(rows);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

////////////////////////// FONCTIONS ANNEXES //////////////////////////////////////////////
function collectEtudiantIds(exercices) {
  const etus = new Set();
  return exercices.filter((item) => {
    let k = key(item);
    return etus.has(k.idEtu) ? false : etus.add(k.idEtu);
  });
}

function tempsSoumissionToString(temps) {
  console.log(temps);
  return temps;
}
filtreResultat;
function stringDateToTimestamp(stringDate) {
  return Date.parse(stringDate).valueOf();
}

// filtre les résultats d'un étudiant
function filtreResultat(exercice, idEtu) {
  console.log(exercice.idEtu);
  console.log(idEtu);
  if (exercice.idEtu == idEtu) {
    return true;
  }
  return false;
}

export default Avancement2;
