import { Chip } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
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
      if (params.label > 0) {
        var colorForCircular = shadeColor(color, -12);
      } else {
        var colorForCircular = 'grey';
      }
      if (props.setColorForCircular !== undefined) {
        useEffect(() => props.setColorForCircular(colorForCircular), []);
      }
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
  //pour supprimer les warnings
  let tmpProps = { ...props };
  delete tmpProps.setColorForCircular;
  return <>{props.label !== '' ? <Chip {...tmpProps} sx={cellsStyle(props)} /> : <></>}</>;
};

ChipGridCell.propTypes = {
  label: PropTypes.string,
  exercise: PropTypes.object,
  setColorForCircular: PropTypes.func,
  color: PropTypes.string,
};

export default React.memo(ChipGridCell);
