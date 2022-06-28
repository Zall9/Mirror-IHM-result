import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { makeStyles } from '@mui/styles';
import { Box, Divider, Paper, Typography } from '@mui/material';
import Error from '@mui/icons-material/Error';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import PanToolIcon from '@mui/icons-material/PanTool';
import PropTypes from 'prop-types';
import { dateParser, calculateTime } from './utils/dateParser';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const useStyles = makeStyles({
  timeline: {
    transform: 'rotate(-90deg) ',
    width: 'auto',
    height: 'auto',
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

    right: '1.5em', //magic number
  },
  timelineIcon: {
    transform: 'rotate(90deg)',
    hover: {
      cursor: 'pointer',
    },
  },
});
const FriseChrono = ({ exo, clicked, setClicked }) => {
  const classes = useStyles();
  const aides = exo.aides;
  const heureDebut = exo.debut;
  const tempsMoyen = exo.tempsMoyen;
  const tentatives = exo.tentatives;
  const SetClicked = setClicked;
  // console.log('date', new Date(new Date(heureDebut).getTime() + tempsMoyen * 1000).toISOString());
  let timeline = [
    {
      heureDebut: heureDebut,
      type: 'debut',
      date: heureDebut,
      icon: () => <GolfCourseIcon className={classes.timelineIcon} />,
    },
    {
      tempsMoyen: tempsMoyen,
      type: 'moyen',
      date: new Date(new Date(heureDebut).getTime() + tempsMoyen * 1000).toISOString(),
      icon: () => <AccessTimeFilledIcon className={classes.timelineIcon} />,
    },
  ];

  exo.tentatives.map((tentative) => {
    timeline.push({
      date: tentative.dateSoumission,
      type: 'tentative',
      validationExercice: tentative.validationExercice,
      id: tentative.id,
      icon: (item, index) =>
        item.validationExercice == true ? (
          <CheckCircleOutline className={classes.timelineIcon} key={item.id + 'Icon' + index} />
        ) : (
          <Error
            className={classes.timelineIcon}
            key={item.id + 'Icon' + index}
            id={item.id}
          ></Error>
        ),
    });
  });
  exo.aides.map((aide) => {
    timeline.push({
      date: aide.date,
      type: 'aide',
      id: aides['_id'],
      icon: () => <PanToolIcon className={classes.timelineIcon} />,
    });
  });
  timeline.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  if (timeline[timeline.length - 1].type === 'moyen') {
    timeline.pop();
  }
  const content = (item, index) => {
    return (
      <TimelineItem
        key={item.id + 'TimeLineItem' + index}
        onClick={() => {
          let d = document.getElementById(item.id + 'code');
          SetClicked(d.id);
          d.scrollIntoView({ behavior: 'smooth' });
          // d.appendChild();
        }}
      >
        <TimelineSeparator>
          {item.icon(item, index)}
          {index === timeline.length - 1 ? '' : <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent className={classes.timelineContentContainer}>
          <Paper elevation={0} className={classes.timelineContentPair}>
            <Typography>
              {index === 0 ? <Typography>Début</Typography> : calculateTime(heureDebut, item.date)}
            </Typography>
          </Paper>
          <Paper elevation={0} className={classes.timelineContentImpair}>
            <Typography>{index === 0 ? dateParser(heureDebut) : dateParser(item.date)}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    );
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
  clicked: PropTypes.any,
  setClicked: PropTypes.any,
};
export default FriseChrono;
