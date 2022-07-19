import { CircularProgress } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import ChipGridCell from './ChipGridCell';
import { Box } from '@mui/system';

const CurrentExerciseGridCell = ({ exercise, params, label }) => {
  console.log(exercise, 'currentExercise');

  return (
    <>
      {exercise !== undefined && label !== '' ? (
        <Box sx={{ position: 'relative' }}>
          <CircularProgress size="1.75rem" color="success" variant="indeterminate" />
          <Box sx={{ position: 'absolute', top: '2px', left: '3px' }}>
            <ChipGridCell
              variant="filled"
              size="small"
              label={label}
              exercise={exercise}
              params={params}
            />
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

CurrentExerciseGridCell.propTypes = {
  exercise: PropTypes.object,
  params: PropTypes.object,
  label: PropTypes.string,
};
export default CurrentExerciseGridCell;
