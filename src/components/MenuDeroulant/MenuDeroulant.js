import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MenuDeroulant = (props) => {
  //fonction component jsx
  const choixItemSelect = (listeId, choix, handleChange, nomArticle) => {
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id={'choix' + nomArticle}>{nomArticle}</InputLabel>
          <Select
            labelId={nomArticle + '-label'}
            id={nomArticle + 'session-select'}
            value={choix}
            label=""
            onChange={handleChange}
          >
            {listeId.map((id, index) => {
              return (
                <MenuItem key={index} value={id}>
                  {id}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  };

  //Props
  const Items = props.Items;
  const callback = props.callback;
  const storageName = props.storageName;
  const state = props.state;
  const setState = props.setState;
  const name = props.name;
  //Hooks
  //Handler
  const handleChange = (event) => {
    sessionStorage.setItem(name, event.target.value);
    setState(event.target.value);
  };
  useEffect(() => {}, [state]);
  //

  return <div>{choixItemSelect(Items, state, handleChange, name, storageName)}</div>;
};

export default MenuDeroulant;

MenuDeroulant.propTypes = {
  Items: PropTypes.array.isRequired,
  callback: PropTypes.func,
  storageName: PropTypes.string,
  name: PropTypes.string,
  state: PropTypes.string,
  setState: PropTypes.func,
};
