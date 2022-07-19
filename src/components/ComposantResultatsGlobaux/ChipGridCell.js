import { Chip } from '@mui/material';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import PanToolIcon from '@mui/icons-material/PanTool';
import { colorGradient } from './utils/colorGradient';
import { isStudentLate } from './utils/dateParser';
const ChipGridCell = (props) => {
  console.info('ChipGridCell', props);
  let isResolved = false;
  if (props.exercise !== undefined) {
    props.exercise.aides[props?.exercise?.aides.length - 1]?.resolue === true
      ? (isResolved = true)
      : (isResolved = false);
  }
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
  return (
    <>
      {props.label !== '' ? <Chip {...props} sx={cellsStyle(props)} /> : <></>}
      {/* ci-dessous: si l'exercice que l'on regarde éxiste pour l'étudiant,
          s'il n'est pas fini et qu'il existe une aide non résolue par l'enseignant
          on render la main */}
    </>
  );
};

ChipGridCell.propTypes = {
  label: PropTypes.string.isRequired,
  exercise: PropTypes.object.isRequired,
};

export default React.memo(ChipGridCell);
