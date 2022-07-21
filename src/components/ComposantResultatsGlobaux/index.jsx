import React, { useState, useMemo, useRef, useCallback } from 'react';
import { DataGrid, frFR } from '@mui/x-data-grid';
import ToolBar from './ToolBar';
import { useSelector } from 'react-redux';
import { getExercises } from '@stores/Exercices/exercicesSlice';
import { getSessions } from '@stores/Sessions/sessionSlice';
import { Box, Typography } from '@mui/material';
import PopperDetails from './PopperDetails';
import PropTypes from 'prop-types';
import ChipGridCell from './ChipGridCell';
import { LANGUAGES_CONTENT } from './internationalization.js';
import CurrentExerciseGridCell from './CurrentExerciseGridCells';
import ColumnsHeader from './ColumnsHeader';

const GlobalResults = () => {
  // HOOKS & STATES
  const exercises = useSelector(getExercises);
  const sessions = useSelector(getSessions);
  console.debug('sessions', sessions);
  const exerciseRef = useRef({});
  const [seance, setSeance] = useState(''); //id
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
    [exercises, seance, selected],
  );

  const rows = useMemo(() => {
    const rows_etu = [];
    Object.values(exercises).forEach((exercice) => {
      let ok = false;
      if (exercice.idSeance === seance) {
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
    console.debug(rows_etu, 'rows_etu');
    return rows_etu;
  }, [exercises, selected, selectedSeance, seance]);

  let tmp_columns = [
    {
      field: 'idEtu',
      headerName: LANGUAGES_CONTENT.frFR.gridContent.columnHeaders.studentCol.headerName,
    },
  ];
  const columns = useMemo(() => {
    if (CURRENT_SESSION && CURRENT_SESSION.exercices) {
      for (const exo of CURRENT_SESSION.exercices) {
        //les exercices dans db resultats correspondant a l'exercice de Session sur lequel on itère
        let currentExercises = Object.values(exercises).filter((e) => e.idExo === exo.id);
        tmp_columns.push({
          field: '' + exo.id,
          headerName: '' + exo.nom,
          align: 'center',
          flex: 1,
          hideSortIcons: true,
          maxWidth: 75,
          renderHeader: (params) => {
            console.log('PARAMZZS', params);
            return (
              <>
                <ColumnsHeader field={params.colDef.headerName} />
              </>
            );
          },
          renderCell: (params) => {
            console.log('PARAMZZS', params);

            //obligé de passer par params pour utiliser row.idetu
            let currentExercise = currentExercises.find(
              (e) => params.field == exo.id && e.idEtu === params.row.idEtu,
            );

            return (
              // check si c'est l'exercice courant de l'étudiant
              !(currentExercise && params && !currentExercise?.estFini) ? (
                <ChipGridCell
                  exercise={currentExercise}
                  params={params}
                  variant="filled"
                  size="small"
                  label={params.value !== undefined ? '' + params.value : ''}
                />
              ) : selected == 'finis' ? (
                <></>
              ) : (
                <CurrentExerciseGridCell
                  exercise={currentExercise}
                  params={params}
                  label={params.value !== undefined ? '' + params.value : ''}
                />
              )
            );
          },
        });
      }
      return tmp_columns;
    }
    return tmp_columns;
  }, [exercises, sessions, CURRENT_SESSION, selectedSeance, seance, selected]);
  //MEMOIZED COMPONENTS

  //replace useState anchorElPopper and setAnchorElPopper with useReducer
  //@TODO : anchorElPopper to implement without useState

  // HANDLERS

  const handlePopoverClick = (params, event) => {
    if (event && event.currentTarget) {
      console.debug('paramsCLICK', event);
      exerciseRef.current = params;

      setAnchorElPopper(document.getElementById('container'));
    } else {
      console.debug('paramsCLICK', event);

      if (params && params.defaultMuiPrevented !== undefined) {
        setAnchorElPopper(null);
        setAnchorElPopper(document.getElementById('container'));
      } else {
        setAnchorElPopper(null);
        setAnchorElPopper(document.getElementById('container'));
      }
    }
  };
  console.info('columns', columns);
  console.info('CURRENT', CURRENT_SESSION);
  return (
    <Box item justifyContent="center" alignItems="center" container spacing={1}>
      <DataGrid
        disableColumnMenu={true}
        disableColumnFilter={true}
        disableToolPanel={true}
        disableSelectionOnClick={true}
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
            setSeance,
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

      <div id="container" style={containerStyle}></div>
      {
        <>
          {anchorElPopper != null ? (
            <PopperDetails
              exercises={Object.values(exercises)}
              session={CURRENT_SESSION}
              exo={exerciseRef.current}
              anchorEl={anchorElPopper}
              setAnchorEl={setAnchorElPopper}
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
    setAnchorEl: PropTypes.any,
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
