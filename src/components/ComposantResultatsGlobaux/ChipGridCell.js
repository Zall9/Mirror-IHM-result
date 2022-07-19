import { Chip } from '@mui/material';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { colorGradient } from './utils/colorGradient';
import { isStudentLate } from './utils/dateParser';
const ChipGridCell = (props) => {
  console.info('ChipGridCell', props);
  console.info('exo from cell', props.exercise);
  var isAverageExceeded = isStudentLate(
    props?.exercise?.debut,
    props?.exercise?.tempsMoyen,
    props?.exercise?.tentatives[props?.exercise?.tentatives?.length - 1]?.dateSoumission,
  );
  const cellsStyle = useCallback(
    function (params) {
      if (params.label !== '') {
        let style = {
          position: 'relative',
          backgroundColor: colorGradient(params.label, isAverageExceeded),
        };
        return style;
      }
    },
    [props, isAverageExceeded],
  );
  return <>{props.label !== '' ? <Chip {...props} sx={cellsStyle(props)} /> : <></>}</>;
};

ChipGridCell.propTypes = {
  label: PropTypes.string.isRequired,
  exercise: PropTypes.object.isRequired,
};

export default React.memo(ChipGridCell);
