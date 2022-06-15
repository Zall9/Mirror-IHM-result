import { Chip } from '@mui/material';
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

const ChipGridCells = (props) => {
  const ChipMemo = React.memo(function renderChip(props) {
    return <Chip {...props} sx={cellsStyle(props.label)} />;
  });
  const cellsStyle = useCallback(
    function (params) {
      if (params !== '') {
        let style = {
          backgroundColor:
            params <= 3
              ? '#097504'
              : params <= 6 && params > 3
              ? '#F96D0C'
              : params > 6
              ? '#D10D04'
              : '#ffffff',
        };
        return style;
      }
    },
    [props.exercices],
  );
  return <ChipMemo {...props} sx={cellsStyle(props.label)}></ChipMemo>;
};

ChipGridCells.propTypes = {
  label: PropTypes.number.isRequired,
  exercices: PropTypes.array.isRequired,
};

export default ChipGridCells;
