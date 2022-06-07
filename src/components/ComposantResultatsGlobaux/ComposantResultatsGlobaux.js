import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { Box } from '@mui/system';
import Popover from '@mui/material/Popover';
import { Chip, Typography } from '@mui/material';

const ComposantResultatsGlobaux = () => {
  //Handlers
  const [exo, setExo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setExo(event.currentTarget.parentElement.attributes['data-field']);
    console.log('ex:Open', exo);
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handlePopoverClose = () => {
    setAnchorEl(null);
    console.log('ex:Close', exo);
  };

  //Initialisations
  const exercices = useSelector(getExercices);
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
        <Typography sx={{ p: 1 }}>{exo.nodeValue}</Typography>
      </Popover>
    </>
  );
};

ComposantResultatsGlobaux.propTypes = {};

export default ComposantResultatsGlobaux;
