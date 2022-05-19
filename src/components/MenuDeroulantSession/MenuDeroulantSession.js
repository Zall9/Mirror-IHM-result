import React from 'react';
import PropTypes from 'prop-types';
import MenuDeroulant from '../MenuDeroulant/MenuDeroulant';
import { useSelector } from 'react-redux';

const MenuDeroulantSession = ({ sessions, choixSession, setSession, storageName, nomArticle }) => {
  console.log('MenuDeroulantSession :', choixSession);
  console.log('sessions :', sessions);
  const nomSessions = sessions.map((session) => session.nom).concat('all');
  console.log('nomSessions :', nomSessions);

  const idVersNom = (id) => sessions?.find((session) => session.id === id)?.nom ?? 'all';
  const nomVersId = (nom) => sessions?.find((session) => session.nom === nom)?.id ?? 'all';

  const choixNomSession = idVersNom(choixSession);

  const handleChange = (nomSession) => {
    sessionStorage.setItem(storageName, nomVersId(nomSession));
    setSession(nomVersId(nomSession));
  };

  return (
    <MenuDeroulant
      listeId={nomSessions}
      choix={choixNomSession}
      setState={handleChange}
      storageName={storageName}
      nomArticle={nomArticle}
    />
  );
};

MenuDeroulantSession.propTypes = {
  sessions: PropTypes.array.isRequired,
  choixSession: PropTypes.string.isRequired,
  setSession: PropTypes.func.isRequired,
  storageName: PropTypes.string.isRequired,
  nomArticle: PropTypes.string.isRequired,
};

export default MenuDeroulantSession;
