import { Chip } from '@mui/material';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { colorGradient } from './utils/colorGradient';
import { isStudentLate } from './utils/dateParser';
import { shadeColor } from './utils/colorTones';
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
      const color = colorGradient(params.label, isAverageExceeded);
      const colorForCircular = shadeColor(color, -12);
      props.setColorForCircular !== undefined && props.setColorForCircular(colorForCircular);
      if (params.label !== '') {
        let style = {
          position: 'relative',
          backgroundColor: color,
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
  setColorForCircular: PropTypes.func,
  color: PropTypes.string,
};

export default React.memo(ChipGridCell);
