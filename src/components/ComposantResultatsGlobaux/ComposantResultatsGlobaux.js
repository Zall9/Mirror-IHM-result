import React, { useState } from 'react';
import clsx from 'clsx';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { Box } from '@mui/system';
import Popover from '@mui/material/Popover';
import { Chip, List, ListItem, Typography } from '@mui/material';
const getExoFromIds = (idEtu, idExo, ListeExo) => {
  console.log(ListeExo.find((exo) => exo.idEtu == idEtu && exo.idExo == idExo));
  let res = ListeExo.find((exo) => exo.idEtu == idEtu && exo.idExo == idExo);
  if (res !== undefined && res !== null) {
    return res;
  }
  return -1;
};
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
        cellClassName: (params) => {
          if (params.value === true) {
            return '';
          }
          return clsx('super-app', {
            negative: params.value <= 3,
            normal: params.value <= 6 && params.value > 3,
            positive: params.value > 6,
          });
        },
        renderCell: (params) => {
          return (
            <Chip
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              variant="outlined"
              size="small"
              label={params.value}
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
      row_etu[exo.idExo] = exo.tentatives.length + 1;
    }
    rows_etu.push(row_etu);
  }

  //utils

  return (
    <>
      <Box
        sx={{
          height: 300,
          width: 1,
          '& .super-app-theme--cell': {
            backgroundColor: '#f5f6fa',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.negative': {
            backgroundColor: '#097504', //vert
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.positive': {
            backgroundColor: '#D10D04', //orange
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.normal': {
            backgroundColor: '#F96D0C', //rouge
            color: '#1a3e72',
            fontWeight: '600',
          },
        }}
      >
        <DataGrid
          rows={rows_etu}
          columns={columns}
          loading={rows_etu.length === 2}
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
      </Box>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
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
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <List>
          {console.log('exo', exo)}
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
          </List>
        </List>
      </Popover>
    </>
  );
};

ComposantResultatsGlobaux.propTypes = {};

export default ComposantResultatsGlobaux;
