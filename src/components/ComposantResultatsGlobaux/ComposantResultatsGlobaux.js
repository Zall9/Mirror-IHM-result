import React, { useState, useMemo, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { getSessions } from '@stores/Sessions/sessionSlice';
import { Box } from '@mui/material';
import PopperDetails from './PopperDetails';
import PropTypes from 'prop-types';
import ChipGridCells from './ChipGridCells';

const ComposantResultatsGlobaux = () => {
  const exercices = useSelector(getExercices);
  const sessions = useSelector(getSessions);
  // console.log('sess', sessions);
  const containerStyle = () => {
    return {
      backgroundColor: '',
      position: 'fixed',
      top: '1px',
      right: '0',
      width: '3vh',
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
        // console.log('exo', exo);
        tmp_columns.push({
          field: '' + exo.id,
          headerName: '' + exo.nom,
          width: 120,
          renderCell: (params) => {
            return (
              <ChipGridCells
                exercices={Object.values(exercices)
                  .filter((e) => e.idExo === exo.id)
                  .find(
                    (e) =>
                      params.field == exo.id &&
                      e.idEtu === params.row.idEtu &&
                      exo.aides.length > 0,
                  )}
                // onClick={(e) => {
                //   e.stopPropagation();
                // }}
                params={params}
                variant="filled"
                size="medium"
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
  let exoRef = useRef('');

  const [anchorEl, setAnchorEl] = useState(null);
  //replace useState anchorEL and setAnchorEl with useReducer
  //@TODO : anchorEL to implement without useState

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  // console.log('myref', exoRef);
  // console.log('rows', rows);
  // console.log('columns', columns);
  return (
    <Box item justifyContent="center" alignItems="center" container spacing={1}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight={true}
        autoWidth={true}
        headerHeight={36}
        density={'compact'}
        onCellClick={(params, event) => {
          // console.log('params', params);
          // console.log('event', event);
          if (params.formattedValue != '') {
            exoRef.current = params;
            setAnchorEl(document.getElementById('container'));
          }
        }}
      />
      <Box id="container" sx={containerStyle}>
        {anchorEl !== null ? (
          <PopperDetailsMemo
            exercices={Object.values(exercices)}
            exo={exoRef.current === '' ? '' : exoRef.current}
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
export default React.memo(ComposantResultatsGlobaux);
