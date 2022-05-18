import React from 'react';
import PropTypes, { element } from 'prop-types';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const EtudiantCliquable = (props) => {
  const idEtu = props.idEtu;

  let navigate = useNavigate();

  const redirection = (event) => {
    let uri = '/resultat/' + event.currentTarget.innerText.toLowerCase();
    navigate(uri);
  };

  return <Button onClick={redirection}>{idEtu}</Button>;
};
EtudiantCliquable.propTypes = {
  idEtu: PropTypes.string.isRequired,
};

export default EtudiantCliquable;
