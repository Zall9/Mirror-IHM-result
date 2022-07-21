/* eslint-disable react/prop-types */
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Divider } from '@mui/material';

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
import React, { useEffect } from 'react';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import MenuDeroulantSession from '../MenuDeroulantSession/MenuDeroulantSession';
import JsonExportMenuItem from './JsonExportMenuItem';
import { LANGUAGES_CONTENT } from './internationalization.js';

const ToolBar = ({
  setSelected,
  selected,
  sessions,
  selectedSession,
  setSelectedSession,
  selectedSeance,
  setSelectedSeance,
  setSeance,
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

  //on utilise le session storage ici pour stocker l'id de la session

  const sessionStorageNameSession = 'idSes';
  const sessionStorageSeance = 'idSeance';
  const selection = LANGUAGES_CONTENT.frFR.gridContent.contentSelector.filters;
  //STATES
  const [choixSession, setSession] = React.useState(
    sessionStorage.getItem(sessionStorageNameSession)
      ? sessionStorage.getItem(sessionStorageNameSession)
      : 'aucune',
  );
  const [panelSeance, setPanelSeance] = React.useState(
    sessionStorage.getItem(sessionStorageSeance)
      ? sessionStorage.getItem(sessionStorageSeance)
      : 'all',
  );
  useEffect(() => {
    sessions.forEach((session) => {
      if (selectedSession === session.id) {
        session.seances.forEach((seance) => {
          if (selectedSeance === seance.groupe + ' - ' + seance.encadrant) {
            setSeance(seance.id);
          }
        });
      }
    });
    setSelectedSession(choixSession);
    setSelectedSeance(panelSeance);
  }, [choixSession, panelSeance, selectedSeance]);

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
        choix={panelSeance}
        setState={setPanelSeance}
        storageName={sessionStorageSeance}
        nomArticle="Seance"
      />
      <Divider sx={{ marginLeft: '3ch' }} orientation="vertical" flexItem />
      <Box sx={{ marginLeft: '3ch' }}>
        <GridToolbarColumnsButton sx={{ color: buttonColor }} />
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
