import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { Box, Chip } from '@mui/material';
import PopperDetails from './PopperDetails';
import PropTypes from 'prop-types';
import ChipGridCells from './ChipGridCells';
const ComposantResultatsGlobaux = () => {
  let exercices = useSelector(getExercices);
  // let exercices = Object.values(exercicez);

  const containerStyle = useMemo(() => {
    let style = {
      width: '750vh',
      backgroundColor: '',
      position: 'fixed',
      top: '75vh !important',
      left: '75vh !important',
    };
    return style;
  }, []);

  let tmp_columns = [
    {
      field: 'idEtu',
      headerName: 'id etudiant',
      width: 120,
    },
  ];
  const rows_etu = useMemo(() => {
    let tabEtu = [];
    let exoEtus = [];
    for (const exo of Object.values(exercices)) {
      if (!tabEtu.includes(exo.idEtu)) {
        tabEtu.push(exo.idEtu);
      }
    }
    let tmp_rows_etu = [];
    for (const etu of tabEtu) {
      exoEtus.push({
        id: etu,
        idEtu: etu,
        exos: Object.values(exercices).filter((exo) => exo.idEtu == etu),
      });
    }
    // console.log('exoEtu', exoEtus);
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
    return tmp_rows_etu;
  }, [exercices]);
  const updateRows = (value, id, field) => {
    const item = rows.find((item) => item.id === id);
    item[field] = value;
    console.log('ziz', rows);
  };
  const columns = useMemo(() => {
    for (const exo of Object.values(exercices)) {
      if (!tmp_columns.find((col) => col.field === exo.idExo)) {
        tmp_columns.push({
          field: exo.idExo,
          headerName: exo.idExo,
          width: 81,
          renderCell: (params) => {
            // console.log('params', params);
            return (
              <ChipGridCells
                exercices={exercices}
                onMouseEnter={handlePopoverOpen}
                variant="outlined"
                size="small"
                label={params.value !== undefined ? params.value : ''}
              />
            );
          },
        });
      }
    }
    return tmp_columns;
  }, [exercices]);

  const PopperDetailsMemo = React.memo(function renderPoppers(props) {
    return (
      <PopperDetails
        exercices={props.exercices}
        exo={props.exo === '' ? '' : props.exo}
        anchorEl={props.anchorEl}
        handlePopoverClose={props.handlePopoverClose}
      />
    );
  });
  //Handlers

  const [exo, setExo] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  // const [rows_etu, setRows_etu] = useState([]);
  // const [columns, setColumns] = useState([]);
  // let columns = [];
  // let rows_etu = [];

  const handlePopoverOpen = (event) => {
    if (event.currentTarget.parentElement.attributes['data-field'].ownerElement.innerText != '') {
      setExo(event.currentTarget.parentElement.attributes['data-field']);
      setAnchorEl(document.getElementById('container'));
    }
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // columns !== tmp_columns ? (columns = tmp_columns) : (columns = columns);
  // rows_etu !== tmp_rows_etu ? (rows_etu = tmp_rows_etu) : (rows_etu = rows_etu);
  return (
    <Box item justifyContent="center" alignItems="center" container spacing={1}>
      <DataGrid
        rows={rows_etu}
        columns={columns}
        autoHeight={true}
        autoWidth={true}
        headerHeight={36}
        density={'compact'}
      />
      {/* <DataGridMemo rows={rows_etu} columns={columns} /> */}
      <Box id="container" sx={containerStyle}></Box>
      {anchorEl !== null ? (
        <PopperDetailsMemo
          exercices={Object.values(exercices)}
          exo={exo === '' ? '' : exo}
          anchorEl={anchorEl}
          handlePopoverClose={handlePopoverClose}
        />
      ) : (
        ''
      )}
    </Box>
  );
  PopperDetailsMemo.propTypes = {
    exercices: PropTypes.any,
    exo: PropTypes.any,
    anchorEl: PropTypes.any,
    handlePopoverClose: PropTypes.any,
  };
  DataGridMemo.propTypes = {
    rows: PropTypes.any,
    columns: PropTypes.any,
  };
  ChipMemo.propTypes = {
    label: PropTypes.any,
    onMouseEnter: PropTypes.any,
    variant: PropTypes.any,
    size: PropTypes.any,
    sx: PropTypes.any,
    backgroundColor: PropTypes.any,
  };
};
export default ComposantResultatsGlobaux;
