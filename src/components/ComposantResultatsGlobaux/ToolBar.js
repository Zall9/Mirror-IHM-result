/* eslint-disable react/prop-types */
import { IconButton, Toolbar, Typography } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import React from 'react';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import MenuDeroulantSession from '../MenuDeroulantSession/MenuDeroulantSession';

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

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <IconButton
        onClick={() => {
          _setSelected(selection[(selection.indexOf(_selected) + 1) % selection.length]);
        }}
      >
        <FilterAltIcon></FilterAltIcon>
      </IconButton>
      <Typography>{_selected}</Typography>
      <MenuDeroulantSession
        sessions={_sessions}
        choixSession={choixSession}
        setSession={setSession}
        storageName={sessionStorageNameSession}
        nomArticle="Nom de session"
      />
      <MenuDeroulant
        listeId={listeNomSeances}
        choix={seance}
        setState={setSeance}
        storageName={sessionStorageSeance}
        nomArticle="Seance"
      />
    </GridToolbarContainer>
  );
};

export default ToolBar;
Toolbar.propTypes = {
  setSelected: PropTypes.func,
  selected: PropTypes.string,
  sessions: PropTypes.array,
};
