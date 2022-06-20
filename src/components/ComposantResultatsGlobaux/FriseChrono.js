import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { makeStyles } from '@mui/styles';
import { Box, Paper, Typography } from '@mui/material';
import Error from '@mui/icons-material/Error';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import PanToolIcon from '@mui/icons-material/PanTool';
import PropTypes from 'prop-types';
import { dateParser } from './utils/dateParser';
import { CopyrightTwoTone } from '@mui/icons-material';
const useStyles = makeStyles({
  timeline: {
    transform: 'rotate(-90deg) translateY(10px)',
    width: 'auto',
  },
  timelineContentContainer: {
    textAlign: 'left',
    position: 'absolute',
  },
  timelineContentPair: {
    display: 'inline-block',
    transform: 'rotate(90deg)',
    textAlign: 'center',
    position: 'relative',
    right: '-2em', //magic number
  },
  timelineContentImpair: {
    display: 'inline-block',
    transform: 'rotate(90deg)',
    textAlign: 'center',
    position: 'relative',
    right: '1em', //magic number
  },
  timelineIcon: {
    transform: 'rotate(90deg)',
  },
});
const FriseChrono = ({ exo }) => {
  const classes = useStyles();
  const tentatives = exo.tentatives;
  const aides = exo.aides;
  const heureDebut = exo.debut;
  const tempsMoyen = exo.tempsMoyen;

  let timeline = [];
  const heures_tentatives = exo.tentatives.map((tentative) => {
    timeline.push({
      date: tentative.dateSoumission,
      type: 'tentative',
      validationExercice: tentative.validationExercice,
      id: tentative.id,
    });
  });
  const heures_aides = exo.aides.map((aide) => {
    console.log('exo', exo);
    timeline.push({
      date: aide.date,
      type: 'aide',
      id: aide['_id'],
    });
  });
  //please sort timeline by date
  timeline.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  console.log('timeline', timeline);
  const content = (item, index) => {
    if (item.type === 'tentative') {
      return (
        <TimelineItem key={item.id + 'TimeLineItem' + index}>
          <TimelineSeparator>
            {item.validationExercice == true ? (
              <CheckCircleOutline className={classes.timelineIcon} key={item.id + 'Icon' + index} />
            ) : (
              <Error className={classes.timelineIcon} key={item.id + 'Icon' + index} />
            )}
            {item.validationExercice != true ? <TimelineConnector /> : <></>}
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper
              className={index % 2 ? classes.timelineContentPair : classes.timelineContentImpair}
            >
              <Typography>{dateParser(item.date)}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    }
    if (item.type === 'aide') {
      return (
        <TimelineItem key={item.id + 'TimeLineItem' + index}>
          <TimelineSeparator>
            <PanToolIcon className={classes.timelineIcon} key={item.id + 'Icon' + index} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent className={classes.timelineContentContainer}>
            <Paper
              className={index % 2 ? classes.timelineContentPair : classes.timelineContentImpair}
            >
              <Typography>{dateParser(item.date)}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    }
  };
  return (
    <Box>
      <Timeline align="alternate" className={classes.timeline} key={'TimeLine-Tentatives'}>
        {timeline.map((timeLineItem, index) => {
          return content(timeLineItem, index);
        })}
      </Timeline>
    </Box>
  );
};

FriseChrono.propTypes = {
  exo: PropTypes.any,
};
export default FriseChrono;
