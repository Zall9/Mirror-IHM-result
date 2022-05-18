import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MenuDeroulant = ({ listeId, choix, setState, nomArticle, name }) => {
  //Handler
  const handleChange = (event) => {
    sessionStorage.setItem(name, event.target.value);
    setState(event.target.value);
  };
  useEffect(() => {}, [choix]);
  //

  return (
    <Box>
      <FormControl sx={{ minWidth: 250 }}>
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

export default MenuDeroulant;

MenuDeroulant.propTypes = {
  listeId: PropTypes.array,
  nomArticle: PropTypes.string,
  name: PropTypes.string,
  choix: PropTypes.string,
  setState: PropTypes.func,
};
