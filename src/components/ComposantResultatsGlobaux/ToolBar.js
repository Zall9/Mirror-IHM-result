/* eslint-disable react/prop-types */
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import {
  GridCsvExportMenuItem,
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
  setSelected,
  selected,
  sessions,
  selectedSession,
  setSelectedSession,
  selectedSeance,
  setSelectedSeance,
  SetSeanceRef,
}) => {
  let listeNomSeances = [];
  let listeIdSeances = [];
  sessions.forEach((session) => {
    if (selectedSession === session.id) {
      listeNomSeances = session.seances.map((seance) => {
        listeIdSeances.push(seance.id);
        return seance.groupe + ' - ' + seance.encadrant;
      });
    }
  });
  sessions.forEach((session) => {
    if (selectedSession === session.id) {
      session.seances.forEach((seance) => {
        if (selectedSeance === seance.groupe + ' - ' + seance.encadrant) {
          SetSeanceRef(seance.id);
        }
      });
    }
  });

  const sessionStorageNameSession = 'idSes';
  const sessionStorageSeance = 'idSeance';
  const selection = ['en cours', 'finis', 'tous', 'aides'];
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
  setSelectedSession(choixSession);
  setSelectedSeance(seance);
  let buttonColor = 'black';
  return (
    <GridToolbarContainer>
      <MenuDeroulantSession
        sessions={sessions}
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
        <GridCsvExportMenuItem />
        <JsonExportMenuItem />
      </GridToolbarExportContainer>
      <IconButton
        sx={{ color: buttonColor }}
        onClick={() => {
          setSelected(selection[(selection.indexOf(selected) + 1) % selection.length]);
        }}
      >
        <FilterAltIcon></FilterAltIcon>
        <Typography>{selected}</Typography>
      </IconButton>
      <IconButton
        sx={{ color: buttonColor }}
        onClick={() => {
          setSelected('aides');
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
