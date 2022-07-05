/* eslint-disable react/prop-types */
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import {
  GridFooter,
  GridPrintExportMenuItem,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExportContainer,
} from '@mui/x-data-grid';
import PanToolIcon from '@mui/icons-material/PanTool';
import PropTypes from 'prop-types';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React from 'react';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import MenuDeroulantSession from '../MenuDeroulantSession/MenuDeroulantSession';
import JsonExportMenuItem from './JsonExportMenuItem';
const ToolBar = ({
  _setSelected,
  _selected,
  _sessions,
  _selectedSession,
  _setSelectedSession,
  _selectedSeance,
  _setSelectedSeance,
  _SeanceRef,
  _SetSeanceRef,
}) => {
  let listeNomSeances = [];
  let listeIdSeances = [];
  _sessions.forEach((session) => {
    if (_selectedSession === session.id) {
      listeNomSeances = session.seances.map((seance) => {
        listeIdSeances.push(seance.id);
        return seance.groupe + ' - ' + seance.encadrant;
      });
    }
  });
  console.log('selectedSeance', _selectedSeance);
  _sessions.forEach((session) => {
    if (_selectedSession === session.id) {
      session.seances.forEach((seance) => {
        if (_selectedSeance === seance.groupe + ' - ' + seance.encadrant) {
          _SetSeanceRef(seance.id);
        }
      });
    }
  });
  console.log('listeIdSeances', listeIdSeances);
  console.log('listeNomSeances', listeNomSeances);

  const sessionStorageNameSession = 'idSes';
  const sessionStorageSeance = 'idSeance';
  const selection = ['en cours', 'finis', 'tous'];
  //STATES
  const [choixSession, setSession] = React.useState(
    sessionStorage.getItem(sessionStorageNameSession)
      ? sessionStorage.getItem(sessionStorageNameSession)
      : 'aucune',
  );
  const [seance, setSeance] = React.useState(
    sessionStorage.getItem(sessionStorageSeance)
      ? sessionStorage.getItem(sessionStorageSeance)
      : 'all',
  );
  _setSelectedSession(choixSession);
  _setSelectedSeance(seance);
  let buttonColor = 'black';
  return (
    <GridToolbarContainer>
      <MenuDeroulantSession
        sessions={_sessions}
        choixSession={choixSession}
        setSession={setSession}
        storageName={sessionStorageNameSession}
        nomArticle="Session"
      />
      <MenuDeroulant
        listeId={listeNomSeances}
        choix={seance}
        setState={setSeance}
        storageName={sessionStorageSeance}
        nomArticle="Seance"
      />
      <GridToolbarColumnsButton sx={{ color: buttonColor }} />
      {/* les options d'exports sont ci-dessous */}
      <GridToolbarExportContainer sx={{ color: buttonColor }}>
        <GridPrintExportMenuItem />
        <JsonExportMenuItem />
      </GridToolbarExportContainer>
      <IconButton
        sx={{ color: buttonColor }}
        onClick={() => {
          _setSelected(selection[(selection.indexOf(_selected) + 1) % selection.length]);
        }}
      >
        <FilterAltIcon></FilterAltIcon>
        <Typography>{_selected}</Typography>
      </IconButton>
      <IconButton
        sx={{ color: buttonColor }}
        onClick={() => {
          _setSelected('aides');
        }}
      >
        <PanToolIcon></PanToolIcon>
        <Typography sx={{ marginLeft: '3px' }}>Aides</Typography>
      </IconButton>
      <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
        <GridFooter />
      </Box>
    </GridToolbarContainer>
  );
};

export default ToolBar;
Toolbar.propTypes = {
  setSelected: PropTypes.func,
  selected: PropTypes.string,
  sessions: PropTypes.array,
};
