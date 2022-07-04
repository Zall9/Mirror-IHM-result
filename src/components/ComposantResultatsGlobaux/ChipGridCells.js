import { Chip } from '@mui/material';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PanToolIcon from '@mui/icons-material/PanTool';
import { colorGradient } from './utils/colorGradient';
const ChipGridCells = (props) => {
  let resolue = false;
  if (props.exercices !== undefined) {
    props.exercices.aides.forEach((element) => {
      resolue = element.resolue;
    });
  }
  const ChipMemo = function renderChip(props) {
    return <Chip {...props} sx={cellsStyle(props.label)} />;
  };
  const cellsStyle = useCallback(
    function (params) {
      if (params !== '') {
        let style = {
          backgroundColor: colorGradient(params),
        };
        return style;
      }
    },
    [props.label],
  );
  return (
    <>
      {props.label !== '' ? <ChipMemo {...props} sx={cellsStyle(props.label)}></ChipMemo> : <></>}
      {props.exercices !== undefined &&
      props.exercices.estFini != true &&
      resolue == false &&
      props.exercices.aides.length > 0 ? (
        <PanToolIcon></PanToolIcon>
      ) : null}
    </>
  );
};

ChipGridCells.propTypes = {
  label: PropTypes.string.isRequired,
  exercices: PropTypes.object.isRequired,
};

export default ChipGridCells;
