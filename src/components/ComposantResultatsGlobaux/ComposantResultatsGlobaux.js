import React, { useState, useMemo, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ToolBar from './ToolBar';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { getSessions } from '@stores/Sessions/sessionSlice';
import { Box } from '@mui/material';
import PopperDetails from './PopperDetails';
import PropTypes from 'prop-types';
import ChipGridCells from './ChipGridCells';
const ComposantResultatsGlobaux = () => {
  // HOOKS & STATES
  const exercices = useSelector(getExercices);
  const sessions = useSelector(getSessions);
  let exoRef = useRef('');

  const [SeanceRef, SetSeanceRef] = useState('');
  const [anchorEl, setAnchorEl] = useState('');
  const [selected, setSelected] = useState('tous');
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedSeance, setSelectedSeance] = useState('');

  //STYLES
  const containerStyle = () => {
    return {
      backgroundColor: '',
      position: 'fixed',
      top: '1vh',
      bottom: '1vh',
      right: '0',
      width: '3vh',
    };
  };
  //Initialisations
  let CURRENTSESSION = sessions.find((s) => s.id === selectedSession);

  // MEMOIZED Datas

  const rows = useMemo(() => {
    const rows_etu = [];
    Object.values(exercices).forEach((exercice) => {
      let ok = false;
      console.log('selectedSeance', selectedSeance);
      //seance.groupe + ' - ' + seance.encadrant
      console.log(exercice.idSeance, '==', SeanceRef);
      if (exercice.idSeance === SeanceRef) {
        console.log('exercice', exercice);
        if (selected === 'tous') {
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
        }
        if (selected === 'finis') {
          if (exercice.estFini) {
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
          }
        }
        if (selected === 'en cours') {
          if (!exercice.estFini) {
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
          }
        }
        if (selected === 'aides') {
          console.log('myexo', exercice);
          if (exercice.aides.length > 0 && !exercice.estFini) {
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
          }
        }
      }
    });
    console.log(rows_etu, 'rows_etu');
    return rows_etu;
  }, [exercices, selected, selectedSeance, SeanceRef]);
  let tmp_columns = [
    {
      field: 'idEtu',
      headerName: 'id etudiant',
    },
  ];
  let columns_en_cours = [
    {
      field: 'idEtu',
      headerName: 'id etudiant',
    },
  ];
  let columns_finis = [
    {
      field: 'idEtu',
      headerName: 'id etudiant',
    },
  ];
  let columns_aides = [
    {
      field: 'idEtu',
      headerName: 'id etudiant',
    },
  ];
  const columns = useMemo(() => {
    if (CURRENTSESSION !== undefined && CURRENTSESSION.exercices !== undefined) {
      for (const exo of CURRENTSESSION.exercices) {
        // console.log('exo', exo);
        if (selected === 'aides') {
          columns_aides.push({
            field: exo.id,
            align: 'center',
            flex: 1,
            maxWidth: 75,
            headerName: exo.nom,
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
                      // exo.aides.length > 0,
                    )}
                  params={params}
                  variant="filled"
                  size="small"
                  label={params.value !== undefined ? '' + params.value : ''}
                />
              );
            },
          });
          return columns_aides;
        }
        if (selected === 'tous') {
          tmp_columns.push({
            field: '' + exo.id,
            headerName: '' + exo.nom,
            align: 'center',
            flex: 1,
            maxWidth: 75,

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
                  params={params}
                  variant="filled"
                  size="small"
                  label={params.value !== undefined ? '' + params.value : ''}
                />
              );
            },
          });
        }
        if (selected === 'en cours') {
          columns_en_cours.push({
            field: '' + exo.id,
            headerName: '' + exo.nom,
            align: 'center',
            flex: 1,
            maxWidth: 75,

            renderCell: (params) => {
              return (
                <ChipGridCells
                  exercices={Object.values(exercices)
                    .filter((e) => e.idExo === exo.id)
                    .find(
                      (e) =>
                        params.field == exo.id &&
                        e.idEtu === params.row.idEtu &&
                        exo.estFini == false &&
                        exo.aides.length > 0,
                    )}
                  params={params}
                  variant="filled"
                  size="small"
                  label={params.value !== undefined ? '' + params.value : ''}
                />
              );
            },
          });
          return columns_en_cours;
        }
        if (selected === 'finis') {
          columns_finis.push({
            field: '' + exo.id,
            headerName: '' + exo.nom,
            align: 'center',
            flex: 1,
            maxWidth: 75,
            renderCell: (params) => {
              return (
                <ChipGridCells
                  exercices={Object.values(exercices)
                    .filter((e) => e.idExo === exo.id)
                    .find(
                      (e) =>
                        params.field == exo.id &&
                        e.idEtu === params.row.idEtu &&
                        exo.estFini == true &&
                        exo.aides.length > 0,
                    )}
                  params={params}
                  variant="filled"
                  size="small"
                  label={params.value !== undefined ? '' + params.value : ''}
                />
              );
            },
          });
          return columns_finis;
        }
      }

      return tmp_columns;
    }
    return [];
  }, [exercices, sessions, CURRENTSESSION, selectedSeance, SeanceRef]);
  //MEMOIZED COMPONENTS
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

  //replace useState anchorEL and setAnchorEl with useReducer
  //@TODO : anchorEL to implement without useState
  // HANDLERS

  const handlePopoverClick = (params, event) => {
    console.log('paramsCLICK', event);
    if (event !== undefined) {
      exoRef.current = params;
      setAnchorEl(document.getElementById('container'));
    } else {
      console.log('else', params);
      if (params.defaultMuiPrevented == false && params.target.nodeName !== 'HTML') {
        console.log('else', 'true !');
        setAnchorEl(null);
        setAnchorEl(document.getElementById('container'));
      } else {
        setAnchorEl(null);
      }
    }
  };
  console.log('columns', columns);

  return (
    <Box item justifyContent="center" alignItems="center" container spacing={1}>
      <DataGrid
        disableColumnMenu={true}
        rowHeight={36}
        sx={{ display: 'flex', flexDirection: 'column-reverse' }}
        localeText={{
          toolbarFilters: 'FILTRER',
          toolbarExport: 'EXPORTER',
          toolbarColumns: 'COLONNES',
        }}
        components={{
          Footer: ToolBar,
        }}
        componentsProps={{
          footer: {
            _setSelected: setSelected,
            _selected: selected,
            _sessions: sessions,
            _selectedSession: selectedSession,
            _setSelectedSession: setSelectedSession,
            _selectedSeance: selectedSeance,
            _setSelectedSeance: setSelectedSeance,
            _SeanceRef: SeanceRef,
            _SetSeanceRef: SetSeanceRef,
          },
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              idEtu: true,
            },
          },
        }}
        rows={selectedSession !== '' ? rows : []}
        columns={selectedSession !== '' ? columns : []}
        autoHeight={true}
        autoWidth={true}
        headerHeight={36}
        density={'compact'}
        onCellClick={handlePopoverClick}
      />
      <Box id="container" sx={containerStyle}>
        {anchorEl !== null ? (
          <PopperDetailsMemo
            exercices={Object.values(exercices)}
            exo={exoRef.current === '' ? '' : exoRef.current}
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClick}
          />
        ) : (
          <></>
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
