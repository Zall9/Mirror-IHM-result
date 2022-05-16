import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  const textOvering = () => <p>{props.textOver}</p>;
  return (
    <div title={props.textOver}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={props.value} color={props.color} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {props.isAPercentage ? `${Math.round(props.value)}%` : `${props.value / 10}`}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
  isAPercentage: PropTypes.bool.isRequired,
  textOver: PropTypes.string.isRequired,
};

export default CircularProgressWithLabel;
