import React, { useState } from 'react';
import clsx from 'clsx';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { Box } from '@mui/system';
import Popover from '@mui/material/Popover';
import { Chip, List, ListItem, Typography } from '@mui/material';
import FriseChrono from './FriseChrono';
const ComposantResultatsGlobaux = () => {
  const exercices = useSelector(getExercices);
  //Handlers

  const [exo, setExo] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setExo(event.currentTarget.parentElement.attributes['data-field']);
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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
              onClick={handlePopoverOpen}
              // onMouseEnter={handlePopoverOpen}
              // onMouseLeave={handlePopoverClose}
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
        // cellClassName: (params) => {
        //   if (params.value === true) {
        //     return '';
        //   }
        //   return clsx('super-app', {
        //     negative: params.value <= 3,
        //     normal: params.value <= 6 && params.value > 3,
        //     positive: params.value > 6,
        //   });
        // },
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

  //utils

  const getExoFromIds = (idEtu, idExo, ListeExo) => {
    let res = ListeExo.find((exo) => exo.idEtu == idEtu && exo.idExo == idExo);
    if (res !== undefined && res !== null) {
      return res;
    }
    return -1;
  };
  return (
    <Box>
      {/* <Box
        sx={{
          height: 300,
          width: 1,
          '& .super-app-theme--cell': {
            backgroundColor: '#f5f6fa',
            color: '#000000',
            fontWeight: '600',
          },
          '& .super-app.negative': {
            backgroundColor: '#097504', //vert
            color: '#000000',
            fontWeight: '600',
          },
          '& .super-app.positive': {
            backgroundColor: '#D10D04', //orange
            color: '#0000000=',
            fontWeight: '600',
          },
          '& .super-app.normal': {
            backgroundColor: '#F96D0C', //rouge
            color: '#000000',
            fontWeight: '600',
          },
        }}
      > */}
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
      {/* </Box> */}
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        PaperProps={{
          style: { width: 'auto' },
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transitionDuration={'auto'}
        disableAutoFocus={false}
        disableEnforceFocus={false}
        onClose={handlePopoverClose}
        disableScrollLock={true}
      >
        {exo == '' ||
        getExoFromIds(exo.ownerElement.parentElement.dataset.id, exo.nodeValue, exercices) == -1 ? (
          ''
        ) : (
          <ListItem>
            <FriseChrono
              exo={
                getExoFromIds(exo.ownerElement.parentElement.dataset.id, exo.nodeValue, exercices)
                  .tentatives
              }
            ></FriseChrono>
          </ListItem>
        )}
        <List sx={{ width: '100%', height: '100%' }}>
          <ListItem sx={{ display: 'flex' }}>
            <Typography variant="h6">
              {exo === '' ? '' : exo.ownerElement.parentElement.dataset.id}
            </Typography>
          </ListItem>
          <List sx={{ display: 'flex' }}>
            <ListItem>
              <Typography>
                {exo === ''
                  ? ''
                  : getExoFromIds(
                      exo.ownerElement.parentElement.dataset.id,
                      exo.nodeValue,
                      exercices,
                    ).nomExo}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography sx={{ p: 1 }}>
                {exo === ''
                  ? ''
                  : getExoFromIds(
                      exo.ownerElement.parentElement.dataset.id,
                      exo.nodeValue,
                      exercices,
                    ).difficulte}
              </Typography>
            </ListItem>
          </List>

          <List>
            <ListItem>
              <Typography variant="h6">Tentatives:</Typography>
            </ListItem>
            <ListItem sx={{ display: 'inline-block', overflow: 'auto' }}>
              {exo === '' ||
              getExoFromIds(exo.ownerElement.parentElement.dataset.id, exo.nodeValue, exercices) ==
                -1
                ? ''
                : getExoFromIds(
                    exo.ownerElement.parentElement.dataset.id,
                    exo.nodeValue,
                    exercices,
                  ).tentatives.map((tentative) => (
                    <Box key={tentative.id + 'Box'}>
                      <ListItem key={tentative.id + 'dateSoumission'}>
                        {tentative.dateSoumission}
                      </ListItem>
                      <ListItem key={tentative.id + 'Logs'}>
                        <Typography key={tentative.id}>{tentative.logErreurs}</Typography>
                      </ListItem>
                      <ListItem key={tentative.id + 'code'}>{tentative.reponseEtudiant}</ListItem>
                    </Box>
                  ))}
            </ListItem>
          </List>
        </List>
      </Popover>
    </Box>
  );
};

ComposantResultatsGlobaux.propTypes = {};

export default ComposantResultatsGlobaux;
