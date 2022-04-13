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
    console.log('etudiant', etudiant);
    let tempsExo, nomExercice, themesExercice, difficulteExercice, nombreTentatives;
    const exoEnCours = exercices.filter((exo) => exo.idEtu == etudiant && exo.estFini == false);
    if (exoEnCours.length == 0) {
      // cas ou un étudiant n'a pas d'exercice en cours
      tempsExo = 0;
      nombreTentatives = -1;
      nomExercice = 'aucun';
      themesExercice = 'aucun';
      difficulteExercice = -1;
    } else {
      // cas ou un étudiant a un exercice en cours
      tempsExo = Date.now().valueOf() - stringDateToTimestamp(exoEnCours[0].debut);
      nomExercice = exoEnCours[0].nomExo;
      nombreTentatives = exoEnCours[0].tentatives.length;
      themesExercice = exoEnCours[0].themes.join();
      difficulteExercice = exoEnCours[0].difficulte ?? 0;
    }
    console.log('exoEncours');
    console.log(exoEnCours);

    avancement.push({
      id: etudiant,
      nbExoValid: exercices.filter((exo) => exo.idEtu == etudiant && exo.estFini == true).length,
      tpsExo: tempsExo,
      nbTentatives: nombreTentatives,
      nomExo: nomExercice,
      themes: themesExercice,
      difficulte: difficulteExercice,
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
