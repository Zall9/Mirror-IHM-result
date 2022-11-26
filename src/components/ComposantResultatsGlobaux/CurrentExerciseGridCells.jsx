import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ChipGridCell from './ChipGridCell';
import { Box } from '@mui/system';
import PanToolIcon from '@mui/icons-material/PanTool';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({});
/**
 *
 * @param props: { exercise objet (exercice courrant),
 * @param params: objet (params de renderCell),
 * @param label: int (nb tentatives)}
 *
 *
 * @returns Un composant
 */
const CurrentExerciseGridCell = ({ exercise, params, label }) => {
  const [color, setColor] = useState('');
  console.log('color', color);
  return (
    <>
      {exercise !== undefined && label !== '' ? (
        <Box sx={{ position: 'relative' }}>
          {!exercise.estFini && exercise.aides.length > 0 ? (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress
                  style={{ color: color }}
                  sx={{ position: 'absolute', top: '-2.5px', left: '-3px' }}
                  size="1.75rem"
                  variant="indeterminate"
                />
                <ChipGridCell
                  variant="filled"
                  size="small"
                  label={label}
                  exercise={exercise}
                  params={params}
                  setColorForCircular={setColor}
                />
                <PanToolIcon />
              </Box>
            </>
          ) : (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress
                  sx={{ position: 'absolute', color: color }}
                  size="1.75rem"
                  variant="indeterminate"
                  style={{ color: color }}
                />
                <ChipGridCell
                  variant="filled"
                  size="small"
                  label={label}
                  exercise={exercise}
                  params={params}
                  setColorForCircular={setColor}
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
