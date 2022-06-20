import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import { makeStyles } from '@mui/styles';
import { Box, Paper, Typography } from '@mui/material';
import Error from '@mui/icons-material/Error';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import PropTypes from 'prop-types';

// const useStyles = makeStyles({
//   timeline: {
//     transform: 'rotate(-90deg)',
//     width: 'auto',
//   },
//   timelineContentContainer: {
//     textAlign: 'left',
//   },
//   timelineContent: {
//     display: 'inline-block',
//     transform: 'rotate(90deg)',
//     textAlign: 'center',
//   },
//   timelineIcon: {
//     transform: 'rotate(90deg)',
//   },
// });
const FriseChrono = ({ exo }) => {
  // const classes = useStyles();
  const tentatives = exo.tentatives;
  const aides = exo.aides;
  // console.log('exo', exo, 'tentatives', tentatives, 'aides', aides);
  return (
    <Box
      sx={{
        display: 'flex',
        flex_wrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        // 70 = la taille d'une icone + le trait de séparation
        width: 70 * tentatives.length + 'px',
        //24= la taille d'une icone + le trait de séparation'
        height: 24 * tentatives.length + 'px',
      }}
    >
      <></>
      {/* <Timeline align="alternate" className={classes.timeline} key={'TimeLine-Tentatives'}>
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
          </TimelineItem>
        ))}
      </Timeline> */}
    </Box>
  );
};

FriseChrono.propTypes = {
  exo: PropTypes.any,
};
export default FriseChrono;
