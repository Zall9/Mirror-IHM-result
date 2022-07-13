import React, { useState, useMemo, useRef, useCallback } from 'react';
import { DataGrid, frFR } from '@mui/x-data-grid';
import ToolBar from './ToolBar';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { getSessions } from '@stores/Sessions/sessionSlice';
import { Box } from '@mui/material';
import PopperDetails from './PopperDetails';
import PropTypes from 'prop-types';
import ChipGridCell from './ChipGridCell';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme(frFR);
const ComposantResultatsGlobaux = () => {
  // HOOKS & STATES
  const exercises = useSelector(getExercices);
  const sessions = useSelector(getSessions);
  console.log('sessions', sessions);
  const exerciseRef = useRef({});
  const [SeanceRef, SetSeanceRef] = useState('');
  const [anchorEl, setAnchorEl] = useState();
  const [selected, setSelected] = useState('tous');

  const [selectedSession, setSelectedSession] = useState('');
  const [selectedSeance, setSelectedSeance] = useState(''); //on laisse

  //STYLES
  const containerStyle = {
    backgroundColor: '',
    position: 'fixed',
    top: '1vh',
    right: '0',
    bottom: '1vh',
    width: '3vh',
  };

  //Initialisations
  let CURRENTSESSION = sessions.find((s) => s.id === selectedSession);

  // MEMOIZED Datas

  const generateRows = useCallback(
    (rows_etu, exercice, ok) => {
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
    },
    [exercises, SeanceRef, selected],
  );

  const rows = useMemo(() => {
    const rows_etu = [];
    Object.values(exercises).forEach((exercice) => {
      let ok = false;
      if (exercice.idSeance === SeanceRef) {
        switch (selected) {
          case 'finis':
            if (exercice.tentatives.length > 0) {
              generateRows(rows_etu, exercice, ok);
            }
            break;
          case 'en cours':
            if (!exercice.estFini) {
              generateRows(rows_etu, exercice, ok);
            }
            break;
          case 'aides':
            if (exercice.aides.length > 0 && !exercice.estFini) {
              generateRows(rows_etu, exercice, ok);
            }
            break;
          default:
            generateRows(rows_etu, exercice, ok);
        }
      }
    });
    console.log(rows_etu, 'rows_etu');
    return rows_etu;
  }, [exercises, selected, selectedSeance, SeanceRef]);

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
    if (CURRENTSESSION && CURRENTSESSION.exercices) {
      for (const exo of CURRENTSESSION.exercices) {
        if (selected === 'aides') {
          columns_aides.push({
            field: exo.id,
            align: 'center',
            flex: 1,
            maxWidth: 75,
            hideSortIcons: true,
            headerName: exo.nom,
            renderCell: (params) => {
              return (
                <ChipGridCell
                  exercises={Object.values(exercises)
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
          return columns_aides;
        }
        if (selected === 'tous') {
          tmp_columns.push({
            field: '' + exo.id,
            headerName: '' + exo.nom,
            align: 'center',
            flex: 1,
            hideSortIcons: true,
            maxWidth: 75,
            renderCell: (params) => {
              return (
                <ChipGridCell
                  exercises={Object.values(exercises)
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
            hideSortIcons: true,

            maxWidth: 75,

            renderCell: (params) => {
              return (
                <ChipGridCell
                  exercises={Object.values(exercises)
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
            hideSortIcons: true,

            maxWidth: 75,
            renderCell: (params) => {
              return (
                <ChipGridCell
                  exercises={Object.values(exercises)
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
  }, [exercises, sessions, CURRENTSESSION, selectedSeance, SeanceRef]);
  //MEMOIZED COMPONENTS

  //replace useState anchorEL and setAnchorEl with useReducer
  //@TODO : anchorEL to implement without useState

  // HANDLERS

  const handlePopoverClick = (params, event) => {
    console.log('paramsCLICK', event);
    if (event && event.currentTarget) {
      exerciseRef.current = params;
      setAnchorEl(document.getElementById('container'));
    } else {
      if (params.defaultMuiPrevented == false && params.target.nodeName !== 'HTML') {
        setAnchorEl(null);
        setAnchorEl(document.getElementById('container'));
      } else {
        setAnchorEl(null);
      }
    }
  };
  console.log('columns', columns);
  console.log('CURRENT', CURRENTSESSION);
  return (
    <Box item justifyContent="center" alignItems="center" container spacing={1}>
      <ThemeProvider theme={theme}>
        <DataGrid
          disableColumnMenu={true}
          disableColumnFilter={true}
          disableToolPanel={true}
          disableSelectionOnClick={true}
          disableColumnSelector={true}
          sx={{ display: 'flex', flexDirection: 'column-reverse' }}
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          components={{
            Footer: ToolBar,
          }}
          componentsProps={{
            footer: {
              setSelected,
              selected,
              sessions,
              selectedSession,
              setSelectedSession,
              selectedSeance,
              setSelectedSeance,
              SetSeanceRef,
            },
          }}
          rows={selectedSession !== '' ? rows : []}
          columns={selectedSession !== '' ? columns : []}
          loading={rows.length == 0}
          autoHeight={true}
          autoWidth={true}
          headerHeight={36}
          rowHeight={36}
          density={'compact'}
          onCellClick={handlePopoverClick}
        />
      </ThemeProvider>
      <div id="container" style={containerStyle}></div>
      {
        <>
          {anchorEl != null ? (
            <PopperDetails
              exercises={Object.values(exercises)}
              session={CURRENTSESSION}
              exo={exerciseRef.current}
              anchorEl={anchorEl}
              handlePopoverClose={handlePopoverClick}
            />
          ) : (
            <></>
          )}
        </>
      }
    </Box>
  );
  PopperDetailsMemo.propTypes = {
    exercises: PropTypes.any,
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
