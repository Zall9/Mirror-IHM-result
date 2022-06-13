import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { Box, Chip } from '@mui/material';

import PopperDetails from './PopperDetails';
const ComposantResultatsGlobaux = () => {
  const exercices = useSelector(getExercices);
  //Handlers
  const [exo, setExo] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [playOnce, setPlayOnce] = useState(true);
  const [rows_etu, setRows_etu] = useState([]);
  const [columns, setColumns] = useState([]);
  const handlePopoverOpen = (event) => {
    if (event.currentTarget.parentElement.attributes['data-field'].ownerElement.innerText != '') {
      setExo(event.currentTarget.parentElement.attributes['data-field']);
      setAnchorEl(document.getElementById('container'));
    }
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  //Initialisations

  let tabEtu = [];
  let tabExo = [];
  let exoEtus = [];

  const initDatas = (tabEtu, tabExo, columns, exoEtus, rows_etu, exercices) => {
    let tmp_columns = [
      {
        field: 'idEtu',
        headerName: 'id etudiant',
        width: 120,
        cellClassName: 'super-app-theme--cell',
      },
    ];
    let tmp_rows_etu = [];

    exoEtus = [];
    for (const exo of exercices) {
      if (!tabEtu.includes(exo.idEtu)) {
        tabEtu.push(exo.idEtu);
      }
      if (!tabExo.includes(exo.nomExo)) {
        tabExo.push(exo.nomExo);
      }
    }
    for (const exo of exercices) {
      if (!tmp_columns.find((col) => col.field === exo.idExo)) {
        tmp_columns.push({
          field: exo.idExo,
          headerName: exo.idExo,
          width: 81,
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
    for (const etu of tabEtu) {
      exoEtus.push({
        id: etu,
        idEtu: etu,
        exos: exercices.filter((exo) => exo.idEtu == etu),
      });
    }
    for (const etu of exoEtus) {
      let row_etu = {
        id: etu.idEtu,
        idEtu: etu.idEtu,
      };
      for (const exo of etu.exos) {
        row_etu[exo.idExo] = exo.tentatives.length;
      }
      tmp_rows_etu.push(row_etu);
    }
    setColumns(tmp_columns);
    setRows_etu(tmp_rows_etu);
  };

  useEffect(() => {
    initDatas(tabEtu, tabExo, columns, exoEtus, rows_etu, exercices);
    //setPlayOnce(!playOnce);
  }, [exercices]);
  return (
    <Box item justifyContent="center" alignItems="center" container spacing={1}>
      {
        <DataGrid
          onCellClick={(params, event) => (event.defaultMuiPrevented = true)}
          rows={rows_etu}
          columns={columns}
          loading={rows_etu.length < 1}
          autoHeight={true}
          autoWidth={true}
          headerHeight={36}
          isCellEditable={() => false}
          density={'compact'}
          columnThreshold={0}
          columnBuffer={0}
          initialState={{
            sorting: {
              sortModel: [{ field: 'idEtu', sort: 'desc' }],
            },
          }}
        />
      }
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
      {anchorEl !== null ? (
        <PopperDetails
          exercices={exercices}
          exo={exo === '' ? '' : exo}
          anchorEl={anchorEl}
          handlePopoverClose={handlePopoverClose}
        ></PopperDetails>
      ) : (
        ''
      )}
    </Box>
  );
};

export default ComposantResultatsGlobaux;
