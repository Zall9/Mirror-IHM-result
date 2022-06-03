import React, { useRef, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { Box } from '@mui/system';
import { List, ListItem, ListItemText } from '@mui/material';

const HoveredItem = (props) => {
  let exo = props._getExo();
  return (
    <div>
      {exo && (
        <div>
          <h2>Only visible when hovering</h2>
        </div>
      )}
    </div>
  );
};

const ComposantResultatsGlobaux = () => {
  //Handlers
  const [exo, setExo] = useState(null);
  const _getExo = (_) => exo;
  const _setExo = (exo) => setExo(exo);

  //Initialisations
  const exercices = useSelector(getExercices);
  console.log(exercices);
  let tabEtu = [];
  let tabExo = [];

  for (const exo of exercices) {
    if (!tabEtu.includes(exo.idEtu)) {
      tabEtu.push(exo.idEtu);
    }
    if (!tabExo.includes(exo.nomExo)) {
      tabExo.push(exo.nomExo);
    }
  }

  // let columns = [
  //   { field: 'idEtu', headerName: 'id etudiant', width: 180 },
  //   {
  //     field: 'exos',
  //     headerName: 'exos en cours',
  //     width: exercices.length,
  //     renderCell: (params) => {
  //       return (
  //         <List disablePadding={true} sx={{ display: 'flex' }}>
  //           {params.value.map((exo) => (
  //             <ListItemText
  //               onMouseOver={() => _setExo(exo)}
  //               onMouseOut={() => _setExo(null)}
  //               key={exo.id}
  //             >
  //               {exo.nomExo}
  //             </ListItemText>
  //           ))}
  //         </List>
  //       );
  //     },
  //   },
  // ];
  let columns = [{ field: 'idEtu', headerName: 'id etudiant', width: 180 }];
  for (const exo of exercices) {
    if (!columns.find((col) => col.field === exo.idExo)) {
      columns.push({
        field: exo.idExo,
        headerName: '',
        renderCell: (params) => {
          return (
            <Box
              sx={{ margin: 0, padding: 0, backgroundColor: '#ff000011', width: 100, height: 100 }}
            >
              {console.log(params.value)}
            </Box>
          );
        },
      });
    }
  }
  let rows_etu = [];

  for (const etu of tabEtu) {
    rows_etu.push({
      id: etu,
      idEtu: etu,
      exos: exercices.filter((exo) => exo.idEtu == etu),
    });
  }

  return (
    <>
      <HoveredItem _setExo={_setExo} _getExo={_getExo} />
      <DataGrid
        rows={rows_etu}
        columns={columns}
        loading={rows_etu.length === 0}
        autoHeight={true}
        autoWidth={true}
        headerHeight={36}
        density={'compact'}
        initialState={{
          sorting: {
            sortModel: [{ field: 'idEtu', sort: 'desc' }],
          },
        }}
      />
    </>
  );
};

ComposantResultatsGlobaux.propTypes = {};
HoveredItem.propTypes = {
  boolean: PropTypes.bool,
  exoRef: PropTypes.string,
  _getExo: PropTypes.func,
  _setExo: PropTypes.func,
};

export default ComposantResultatsGlobaux;
