import { CircularProgress } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import ChipGridCell from './ChipGridCell';
import { Box } from '@mui/system';
import PanToolIcon from '@mui/icons-material/PanTool';

const CurrentExerciseGridCell = ({ exercise, params, label }) => {
  return (
    <>
      {exercise !== undefined && label !== '' ? (
        <Box sx={{ position: 'relative' }}>
          {!exercise.estFini && exercise.aides.length > 0 ? (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress
                  sx={{ position: 'absolute', top: '-2.5px', left: '-3px' }}
                  size="1.75rem"
                  color="success"
                  variant="indeterminate"
                />
                <ChipGridCell
                  variant="filled"
                  size="small"
                  label={label}
                  exercise={exercise}
                  params={params}
                />
                <PanToolIcon />
              </Box>
            </>
          ) : (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress
                  sx={{ position: 'absolute' }}
                  size="1.75rem"
                  color="success"
                  variant="indeterminate"
                />
                <ChipGridCell
                  variant="filled"
                  size="small"
                  label={label}
                  exercise={exercise}
                  params={params}
                />
              </Box>
            </>
          )}
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
const areEqual = (prevProps, nextProps) => {
  return prevProps.exercise === nextProps.exercise;
};
export default React.memo(CurrentExerciseGridCell, areEqual);
