import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { useSelector } from 'react-redux';
import { getExercises } from '@stores/Exercises/exercisesSlice';
import { useNavigate } from 'react-router-dom';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import IconButton from '@mui/material/IconButton';

const VideoprojecteurDetail = () => {
  const columns = [
    { field: 'nomExo', headerName: 'exo en cours', width: 180 },
    { field: 'nbValid', headerName: 'nb étu validé', sortable: true, type: 'number', width: 130 },
    { field: 'nbEnCours', headerName: 'nb étu en cours', type: 'number', width: 130 },
    { field: 'themes', headerName: 'themes', sortable: false, width: 250 },
    { field: 'difficulte', headerName: 'difficultes', type: 'number', width: 130 },
  ];

  // récupérer tous les résultats
  const exercices = useSelector(getExercises);
  // collecter uniquement les exercices via leur nom
  let tabExo = [];
  for (const exo of exercices) {
    if (!tabExo.includes(exo.nomExo)) {
      tabExo.push(exo.nomExo);
    }
  }

  // faire un tableau contenant les informations à afficher
  let globalExo = [];
  // faire un tableau nomExo / avec le nb de fois ou il a été validés
  // le nb de fois en cours /  thèmes / difficultés
  let i = 0;
  for (const exo of tabExo) {
    const exoTmp = exercices.filter((exercice) => exercice.nomExo == exo)[0];
    i++;
    globalExo.push({
      id: i,
      nomExo: exo,
      nbValid: exercices.filter((exercice) => exercice.nomExo == exo && exercice.estFini == true)
        .length,
      nbEnCours: exercices.filter((exercice) => exercice.nomExo == exo && exercice.estFini == false)
        .length,
      themes: exoTmp.themes.join(),
      difficulte: exoTmp.difficulte,
    });
  }
  const rows = globalExo;

  let navigate = useNavigate();
  const redirectionResultat = () => {
    navigate('/visuresultatexercice');
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <IconButton
        onClick={redirectionResultat}
        title="Passer à la vue graph"
        sx={{ align: 'right' }}
      >
        <EqualizerIcon />
      </IconButton>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        initialState={{
          sorting: {
            sortModel: [{ field: 'nbValid', sort: 'desc' }],
          },
        }}
      />
    </div>
  );
};

export default VideoprojecteurDetail;
