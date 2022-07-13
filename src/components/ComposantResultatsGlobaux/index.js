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
const GlobalResults = () => {
  // HOOKS & STATES
  const exercises = useSelector(getExercices);
  const sessions = useSelector(getSessions);
  console.log('sessions', sessions);
  const exerciseRef = useRef({});
  const [SeanceRef, SetSeanceRef] = useState('');
  const [anchorElPopper, setAnchorElPopper] = useState();
  const [selected, setSelected] = useState('tous');

  const [selectedSession, setSelectedSession] = useState('');
  const [selectedSeance, setSelectedSeance] = useState('');

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
  let CURRENT_SESSION = sessions.find((s) => s.id === selectedSession);

  // MEMOIZED Datas

  /**  Fonction mémorisée utilisée pour générer des lignes pour la grille de données.
   * @param {Object} studentsRows - Ligne de données
   * @param {Object} exercise - L'exercice
   * @param {Object} ok - un boolean
   *
   **/
  const generateRows = useCallback(
    (studentsRows, exercise, ok) => {
      studentsRows.forEach((studentRow) => {
        if (studentRow.idEtu === exercise.idEtu) {
          ok = true;
          studentRow[exercise.idExo] = exercise.tentatives.length;
        }
      });
      if (!ok) {
        let studentRow = { id: exercise.idEtu, idEtu: exercise.idEtu };
        studentRow[exercise.idExo] = exercise.tentatives.length;
        studentsRows.push(studentRow);
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
            if (exercice.estFini) {
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
    if (CURRENT_SESSION && CURRENT_SESSION.exercices) {
      for (const exo of CURRENT_SESSION.exercices) {
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
                  exercise={Object.values(exercises)
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
                  exercise={Object.values(exercises)
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
                  exercise={Object.values(exercises)
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
                  exercise={Object.values(exercises)
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
  }, [exercises, sessions, CURRENT_SESSION, selectedSeance, SeanceRef]);
  //MEMOIZED COMPONENTS

  //replace useState anchorElPopper and setAnchorElPopper with useReducer
  //@TODO : anchorElPopper to implement without useState

  // HANDLERS

  const handlePopoverClick = (params, event) => {
    console.log('paramsCLICK', event);
    if (event && event.currentTarget) {
      exerciseRef.current = params;
      setAnchorElPopper(document.getElementById('container'));
    } else {
      if (params.defaultMuiPrevented == false && params.target.nodeName !== 'HTML') {
        setAnchorElPopper(null);
        setAnchorElPopper(document.getElementById('container'));
      } else {
        setAnchorElPopper(null);
      }
    }
  };
  console.log('columns', columns);
  console.log('CURRENT', CURRENT_SESSION);
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
          {anchorElPopper != null ? (
            <PopperDetails
              exercise={Object.values(exercises)}
              session={CURRENT_SESSION}
              exo={exerciseRef.current}
              anchorEl={anchorElPopper}
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
    exercise: PropTypes.any,
    exo: PropTypes.any,
    anchorElPopper: PropTypes.any,
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
export default GlobalResults;
