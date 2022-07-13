import { Chip } from '@mui/material';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PanToolIcon from '@mui/icons-material/PanTool';
import { colorGradient } from './utils/colorGradient';
import { isStudentLate } from './utils/dateParser';
const ChipGridCell = (props) => {
  let isResolved = false;
  if (props.exercises !== undefined) {
    props.exercises.aides[props.exercises.aides.length - 1]?.resolue === true
      ? (isResolved = true)
      : (isResolved = false);
  }
  var isAverageExceeded = isStudentLate(
    props?.exercises?.debut,
    props?.exercises?.tempsMoyen,
    props?.exercises?.tentatives[props.exercises?.tentatives.length - 1]?.dateSoumission,
  );
  const cellsStyle = useCallback(
    function (params) {
      if (params.label !== '') {
        let style = {
          backgroundColor: colorGradient(params.label, isAverageExceeded),
        };
        return style;
      }
    },
    [props, isAverageExceeded],
  );
  return (
    <>
      {props.label !== '' ? <Chip {...props} sx={cellsStyle(props)} /> : <></>}
      {props?.exercises !== undefined &&
      props?.exercises.estFini != true &&
      isResolved == false &&
      props?.exercises.aides.length > 0 ? (
        <PanToolIcon></PanToolIcon>
      ) : null}
    </>
  );
};

ChipGridCell.propTypes = {
  label: PropTypes.string.isRequired,
  exercises: PropTypes.object.isRequired,
};

export default React.memo(ChipGridCell);
