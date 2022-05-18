import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 *
 * @param {*} props
 * @returns
 */
function CircularProgressWithLabel(props) {
  const textInside =
    props.minValue || props.maxValue || props.mustBe100percent
      ? Math.round(props.value)
      : Math.round(props.value) + '%';
  const percentCircle =
    props.mustBe100percent == true
      ? 100
      : props.minValue == undefined || props.maxValue == undefined
      ? props.value
      : 100 * ((props.value - props.minValue) / (props.maxValue - props.minValue));
  return (
    <div title={props.textOver}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={percentCircle} color={props.color} />
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
            {textInside}
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
  textOver: PropTypes.string.isRequired,
  mustBe100percent: PropTypes.bool,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};

export default CircularProgressWithLabel;
