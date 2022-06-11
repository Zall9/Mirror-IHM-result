import React, { useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { Box, Chip, Grid } from '@mui/material';

import PopperDetails from './PopperDetails';

const ComposantResultatsGlobaux = () => {
  const exercices = useSelector(getExercices);
  //Handlers

  const [exo, setExo] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    if (event.currentTarget.parentElement.attributes['data-field'].ownerElement.innerText != '') {
      setExo(event.currentTarget.parentElement.attributes['data-field']);
      setAnchorEl(document.getElementById('container'));
    }
  };
  const handlePopoverClose = () => {
    console.log('handlePopoverCloseComponentRes', anchorEl);
    setAnchor(null);
  };
  const open = Boolean(anchorEl);

  //Initialisations
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
  let columns = [
    {
      field: 'idEtu',
      headerName: 'id etudiant',
      width: 180,
      cellClassName: 'super-app-theme--cell',
    },
  ];
  for (const exo of exercices) {
    if (!columns.find((col) => col.field === exo.idExo)) {
      columns.push({
        field: exo.idExo,
        headerName: exo.idExo,
        renderCell: (params) => {
          return (
            <Chip
              onMouseEnter={handlePopoverOpen}
              variant="outlined"
              size="medium"
              label={params.value}
              sx={{
                width: '50%',
                height: '100%',
                margin: 'auto',
                backgroundColor:
                  params.value <= '3'
                    ? '#097504'
                    : params.value <= 6 && params.value > 3
                    ? '#F96D0C'
                    : params.value > 6
                    ? '#D10D04'
                    : '#ffffff',
              }}
            />
          );
        },
      });
    }
  }

  let exoEtus = [];
  for (const etu of tabEtu) {
    exoEtus.push({
      id: etu,
      idEtu: etu,
      exos: exercices.filter((exo) => exo.idEtu == etu),
    });
  }

  let rows_etu = [];
  for (const etu of exoEtus) {
    let row_etu = {
      id: etu.idEtu,
      idEtu: etu.idEtu,
    };
    for (const exo of etu.exos) {
      row_etu[exo.idExo] = exo.tentatives.length;
    }
    rows_etu.push(row_etu);
  }

  return (
    <Box item justifyContent="center" alignItems="center" container spacing={1}>
      <DataGrid
        rows={rows_etu}
        columns={columns}
        loading={rows_etu.length == 0}
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
      <Box
        id="container"
        sx={{
          width: '750vh',
          backgroundColor: '',
          position: 'fixed',
          top: '75vh !important',
          left: '75vh !important',
        }}
      ></Box>
      <PopperDetails
        exercices={exercices}
        exo={exo === '' ? '' : exo}
        anchorEl={anchorEl}
        handlePopoverClose={handlePopoverClose}
      ></PopperDetails>
      {/* </Box> */}
    </Box>
  );
};

ComposantResultatsGlobaux.propTypes = {};

export default ComposantResultatsGlobaux;
