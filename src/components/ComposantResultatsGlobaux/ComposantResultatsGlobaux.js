import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { getSessions } from '@stores/Sessions/sessionSlice';
import { Box } from '@mui/material';
import PopperDetails from './PopperDetails';
import PropTypes from 'prop-types';
import ChipGridCells from './ChipGridCells';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
const ComposantResultatsGlobaux = () => {
  const exercices = useSelector(getExercices);
  const sessions = useSelector(getSessions);
  const containerStyle = () => {
    return {
      backgroundColor: '',
      position: 'fixed',
      top: '25px',
      right: '0',
    };
  };

  let tmp_columns = [
    {
      field: 'idEtu',
      headerName: 'id etudiant',
      width: 120,
    },
  ];

  const rows = useMemo(() => {
    const rows_etu = [];
    Object.values(exercices).forEach((exercice) => {
      let ok = false;
      rows_etu.forEach((row_etu) => {
        if (row_etu.idEtu === exercice.idEtu) {
          ok = true;
          row_etu[exercice.idExo] = exercice.tentatives.length;
        }
      });
      if (!ok) {
        let row_etu = { id: exercice.idEtu, idEtu: exercice.idEtu };
        row_etu[exercice.idExo] = exercice.tentatives.length;
        rows_etu.push(row_etu);
      }
    });
    return rows_etu;
  }, [exercices]);

  const columns = useMemo(() => {
    if (sessions.length != 0) {
      for (const exo of sessions[0].exercices) {
        tmp_columns.push({
          field: '' + exo,
          headerName: '' + exo,
          width: 81,
          renderCell: (params) => {
            return (
              <ChipGridCells
                exercices={exercices}
                onMouseEnter={handlePopoverOpen}
                variant="outlined"
                size="small"
                label={params.value !== undefined ? '' + params.value : ''}
              />
            );
          },
        });
      }
      return tmp_columns;
    }
    return [];
  }, [exercices, sessions]);

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

  const handlePopoverOpen = (event) => {
    if (event.currentTarget.parentElement.attributes['data-field'].ownerElement.innerText != '') {
      setExo(event.currentTarget.parentElement.attributes['data-field']);
      setAnchorEl(document.getElementById('container'));
    }
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box item justifyContent="center" alignItems="center" container spacing={1}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        autoWidth={true}
        headerHeight={36}
        density={'compact'}
      />
      <Box id="container" sx={containerStyle}>
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
