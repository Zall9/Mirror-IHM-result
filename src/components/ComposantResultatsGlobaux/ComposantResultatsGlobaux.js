import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { Box } from '@mui/system';
import { List, ListItem, ListItemText } from '@mui/material';

const ComposantResultatsGlobaux = () => {
  const exercices = useSelector(getExercices);

  //let tabExo = [];
  let tabEtu = [];
  for (const exo of exercices) {
    if (!tabEtu.includes(exo.idEtu)) {
      tabEtu.push(exo.idEtu);
    }
  }

  let columns = [
    { field: 'idEtu', headerName: 'id etudiant', width: 180 },
    {
      field: 'exos',
      headerName: 'exos en cours',

      width: exercices.length * exercices.length,
      renderCell: (params) => {
        console.log(params);
        return (
          <List disablePadding={true} sx={{ display: 'flex' }}>
            {params.value.map((exo) => (
              <ListItemText key={exo.id}>{exo.nomExo}</ListItemText>
            ))}
          </List>
        );
      },
    },
  ];
  let rows_etu = [];

  for (const etu of tabEtu) {
    rows_etu.push({
      id: etu,
      idEtu: etu,
      exos: exercices.filter((exo) => exo.idEtu == etu),
    });
  }
  console.log(rows_etu);
  return (
    <DataGrid
      rows={rows_etu}
      columns={columns}
      loading={rows_etu.length === 0}
      // rowHeight={50}
      // rowWidth={15000}
      autoHeight={true}
      autoWidth={true}
      headerHeight={0}
      density={'compact'}
      initialState={{
        sorting: {
          sortModel: [{ field: 'idEtu', sort: 'desc' }],
        },
      }}
    />
  );
};

ComposantResultatsGlobaux.propTypes = {};
export default ComposantResultatsGlobaux;
