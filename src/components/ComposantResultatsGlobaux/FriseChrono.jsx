import React, { useCallback, useMemo } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { makeStyles } from '@mui/styles';
import { Paper, Typography } from '@mui/material';
import Error from '@mui/icons-material/Error';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import PanToolIcon from '@mui/icons-material/PanTool';
import PropTypes from 'prop-types';
import { dateParser, calculateTime, isStudentLate } from './utils/dateParser';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { colorGradient } from './utils/colorGradient';
import CheckIcon from '@mui/icons-material/Check';
const useStyles = makeStyles({
  timeline: {
    height: '75px',
    width: '50px',
    transform: 'rotate(-90deg) ',
    marginLeft: '5px',
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
    bottom: '2.5ch', //magic number
  },
  timelineIcon: {
    transform: 'rotate(90deg)',
  },
});

/**
 * @param props: { {Object}currentExercise , {string}clicked, {callback} setClicked}
 *
 * prend un objet d'exercice comme paramètre et renvoie un composant de timeline qui affiche
 * l'heure de début de l'exercice, le temps moyen nécessaire pour terminer l'exercice et les heures
 * auxquelles l'élève a demandé de l'aide et validé l'exercice.
 * @returns Un composant
 */
const FriseChrono = ({ currentExercise, clicked, setClicked }) => {
  const classes = useStyles();
  const aides = currentExercise.aides;
  const startTime = currentExercise.debut;
  const tempsMoyen = currentExercise.tempsMoyen;
  // const tentatives = currentExercise.tentatives; CURRENTLY UNUSED
  let timeline = useMemo(() => {
    let _timeline = [
      {
        startTime: startTime,
        type: 'debut',
        date: startTime,
        icon: () => <GolfCourseIcon className={classes.timelineIcon} />,
      },
      {
        tempsMoyen: tempsMoyen,
        type: 'moyen',
        date: new Date(new Date(startTime).getTime() + tempsMoyen * 1000).toISOString(),
        icon: () => <AccessTimeFilledIcon className={classes.timelineIcon} />,
      },
    ];
    currentExercise.tentatives.map((tentative) => {
      _timeline.push({
        date: tentative.dateSoumission,
        type: 'tentative',
        validationExercice: tentative.validationExercice,
        id: tentative.id,
        icon: (item, index, _clicked) =>
          !_clicked ? (
            item.validationExercice == true ? (
              <CheckIcon
                className={classes.timelineIcon}
                key={item.id + 'Icon' + index}
                sx={{
                  color: colorGradient(
                    index,
                    isStudentLate(
                      currentExercise.debut,
                      currentExercise.tempsMoyen,
                      currentExercise.tentatives[index - 1]?.dateSoumission,
                    ),
                  ),
                }}
              />
            ) : (
              <Error
                className={classes.timelineIcon}
                key={item.id + 'Icon' + index}
                id={item.id}
                sx={{
                  color: colorGradient(
                    index,
                    isStudentLate(
                      currentExercise.debut,
                      currentExercise.tempsMoyen,
                      currentExercise.tentatives[index - 1]?.dateSoumission,
                    ),
                  ),
                }}
              />
            )
          ) : item.validationExercice == true ? (
            <CheckCircleOutline
              className={classes.timelineIcon}
              key={item.id + 'Icon' + index}
              sx={{
                color: colorGradient(
                  index,
                  isStudentLate(
                    currentExercise.debut,
                    currentExercise.tempsMoyen,
                    currentExercise.tentatives[index - 1]?.dateSoumission,
                  ),
                ),
              }}
            />
          ) : (
            <ErrorTwoToneIcon
              className={classes.timelineIcon}
              key={item.id + 'Icon' + index}
              id={item.id}
              sx={{
                color: colorGradient(
                  index,
                  isStudentLate(
                    currentExercise.debut,
                    currentExercise.tempsMoyen,
                    currentExercise.tentatives[index - 1]?.dateSoumission,
                  ),
                ),
              }}
            />
          ),
      });
    });
    currentExercise.aides.map((aide) => {
      _timeline.push({
        date: aide.date,
        type: 'aide',
        id: aides['_id'],
        icon: () => <PanToolIcon className={classes.timelineIcon} />,
      });
    });
    return _timeline;
  }, [clicked, currentExercise]);

  timeline.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  //si l'element apres la validation est le temps moyen on l'enlève
  if (timeline[timeline.length - 1].type === 'moyen') {
    timeline.pop();
  }

  const content = useCallback(
    (item, index) => {
      return (
        <TimelineItem
          key={item?.id + 'TimeLineItem' + index}
          onClick={(event, params) => {
            setClicked(item.id);
          }}
        >
          <TimelineSeparator>
            {item?.icon(item, index, clicked === item?.id)}
            {index === timeline?.length - 1 ? <></> : <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent className={classes?.timelineContentContainer}>
            <Paper elevation={0} className={classes?.timelineContentPair}>
              <Typography>
                {index === 0 ? (
                  <Typography>Début</Typography>
                ) : (
                  calculateTime(startTime, item?.date)
                )}
              </Typography>
            </Paper>
            <Paper elevation={0} className={classes?.timelineContentImpair}>
              <Typography>
                {index === 0 ? dateParser(startTime) : dateParser(item?.date)}
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      );
    },
    [clicked, currentExercise],
  );

  return (
    <>
      <Timeline align="alternate" className={classes.timeline} key={'TimeLine-Tentatives'}>
        {timeline.map((timelineItem, index) => {
          return content(timelineItem, index);
        })}
      </Timeline>
    </>
  );
};

FriseChrono.propTypes = {
  currentExercise: PropTypes.any,
  clicked: PropTypes.any,
  setClicked: PropTypes.any,
};

/**
 * Si le nombre de tentatives est le même et que l'utilisateur n'a cliqué sur rien, alors le contenu
 * n'a pas changé
 * @param {object} content - l'état actuel du composant
 * @param {object} nextContent - l'état suivant du composant
 * @returns true si la longueur du tableau de tentatives est la même et si la valeur cliquée est la
 * même.
 */
function areEqual(content, nextContent) {
  return (
    content.currentExercise.tentatives.length == nextContent.currentExercise.tentatives.length &&
    content.clicked == nextContent.clicked
  );
}
export default React.memo(FriseChrono, areEqual);
