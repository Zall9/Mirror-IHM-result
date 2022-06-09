import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { makeStyles } from '@mui/styles';
import { Box, Paper, Typography } from '@mui/material';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import Cached from '@mui/icons-material/Cached';
import Error from '@mui/icons-material/Error';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import PropTypes from 'prop-types';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const useStyles = makeStyles({
  timeline: {
    transform: 'rotate(-90deg)',
    width: 'auto',
  },
  timelineContentContainer: {
    textAlign: 'left',
  },
  timelineContent: {
    display: 'inline-block',
    transform: 'rotate(90deg)',
    textAlign: 'center',
  },
  timelineIcon: {
    transform: 'rotate(90deg)',
  },
});
const FriseChrono = (props) => {
  const exo = props.exo;
  const classes = useStyles();

  console.log('exoFrise', exo);
  return (
    <Box sx={{ display: 'flex', flex_wrap: 'wrap' }}>
      {console.log('frise', exo)}
      {exo.map((tentative) => (
        <Timeline key={tentative.id + 'Timeline'} className={classes.timeline} align="alternate">
          <TimelineItem key={tentative.id + 'TimelineItem'}>
            <TimelineSeparator key={tentative.id + 'TimelineSeparator'}>
              {console.log('tentative', tentative)}
              {tentative.validationExercice === true ? (
                <CheckCircleOutline color="primary" className={classes.timelineIcon} />
              ) : (
                ((<TimelineConnector />),
                (<Error color="primary" className={classes.timelineIcon} />))
              )}
              <TimelineConnector />
            </TimelineSeparator>
          </TimelineItem>
        </Timeline>
      ))}
      {/* <Timeline className={classes.timeline} align="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <CheckCircleOutline color="primary" className={classes.timelineIcon} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper className={classes.timelineContent}>
              <Typography>Eat</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <PauseCircleFilledIcon color="primary" className={classes.timelineIcon} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper className={classes.timelineContent}>
              <Typography>Code</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <Cached color="primary" className={classes.timelineIcon} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper className={classes.timelineContent}>
              <Typography>Sleep</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <Cached color="primary" className={classes.timelineIcon} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper className={classes.timelineContent}>
              <Typography>Repeat</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <Error color="primary" className={classes.timelineIcon} />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper className={classes.timelineContent}>
              <Typography>Sleep</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline> */}
    </Box>
  );
};

FriseChrono.propTypes = {
  exo: PropTypes.array,
};
export default FriseChrono;
