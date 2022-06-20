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
import PropTypes from 'prop-types';
import { dateParser } from './utils/dateParser';
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
  // let heures_tentatives = exo.tentatives.map((tentative) => {
  //   return tentative.dateSoumission;
  // });
  return (
    <Box
      sx={{
        position: 'absolute',
        // display: 'flex',
        // justifyContent: 'center',
        // // 70 = la taille d'une icone + le trait de séparation
        // height: 70 * tentatives.length + 'px',
        // //24= la taille d'une icone + le trait de séparation'
        // width: 30 * tentatives.length + 'px',
      }}
    >
      <Timeline align="alternate" className={classes.timeline} key={'TimeLine-Tentatives'}>
        {tentatives.map((tentative, index) => (
          <TimelineItem key={tentative.id + 'TimeLineItem' + index}>
            <TimelineSeparator>
              {tentative.validationExercice == true ? (
                <CheckCircleOutline
                  className={classes.timelineIcon}
                  key={tentative.id + 'Icon' + index}
                />
              ) : (
                <Error className={classes.timelineIcon} key={tentative.id + 'Icon' + index} />
              )}
              {tentative.validationExercice != true ? <TimelineConnector /> : <></>}
            </TimelineSeparator>
            <TimelineContent className={classes.timelineContentContainer}>
              <Paper
                className={index % 2 ? classes.timelineContentPair : classes.timelineContentImpair}
              >
                <Typography>{dateParser(tentative.dateSoumission)}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

FriseChrono.propTypes = {
  exo: PropTypes.any,
};
export default FriseChrono;
