import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItem,
  Popper,
  Typography,
} from '@mui/material';
import FriseChrono from './FriseChrono';
import { Box } from '@mui/system';
import { getExoFromIds } from './utils/getExoFromIds';
import CodeTentative from './CodeTentative';
import CancelIcon from '@mui/icons-material/Cancel';
import { dateParser } from './utils/dateParser';

const PopperDetails = (props) => {
  // const [anchor, setAnchor] = useState(props.anchorEl);
  const [statement, setstatement] = useState('');
  // const [exerciseRef, setExoState] = useState(props.exo);
  const exerciseRef = useRef(props.exo);
  const [clicked, setClicked] = useState('');
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setstatement(
      props.session?.exercices.filter((exo) => exo.id == exerciseRef.current.field)[0]?.enonce,
    );
  }, []);
  const exercises = props.exercises;
  const handlePopoverClose = props.handlePopoverClose;
  const anchorEl = props.anchorEl;
  const currentExercise = getExoFromIds(
    exerciseRef.current.id,
    exerciseRef.current.field,
    exercises,
  );
  const exerciseName = currentExercise.nomExo;
  const language = currentExercise.langage;
  const attempts = currentExercise.tentatives;
  const difficulty = currentExercise.difficulte;
  const renderAttempt = (attempt, language) => {
    return (
      <div id={attempt.id} key={attempt.id}>
        <ListItem key={attempt.id + 'dateSoumission'}>
          <Typography>{dateParser(attempt.dateSoumission)}</Typography>
          <Typography>{':'}&nbsp;</Typography>
          <Typography key={attempt.id + 'Logs'}>{attempt.logErreurs}</Typography>
        </ListItem>
        {language !== '' && language !== undefined ? (
          <div id={attempt.id + '-code'}>
            <CodeTentative
              code={attempt.reponseEtudiant}
              key={attempt.id + '-code'}
              language={language}
            />
            {clicked == attempt.id + '-code' ? (
              <Divider sx={{ border: '3px solid rgba(0,0,0,0.5)' }} />
            ) : null}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };
  return (
    <ClickAwayListener onClickAway={handlePopoverClose}>
      <Popper
        open={true}
        anchorEl={anchorEl}
        disablePortal={true}
        placement={'right'}
        popperOptions={{
          positionFixed: true,
        }}
      >
        {
          // div qui contient tout le contenu.
          <div
            style={{
              border: '3px solid black',
              backgroundColor: 'white',
              width: '25vw',
              position: 'relative',
            }}
          >
            <IconButton onClick={handlePopoverClose}>
              <CancelIcon></CancelIcon>
            </IconButton>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <ListItem>
                <Typography variant="h6">{exerciseRef.current.id}</Typography>
              </ListItem>
              <List sx={{ display: 'flex' }}>
                <ListItem>
                  <Typography>{exerciseName}</Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ p: 1 }}>{difficulty}</Typography>
                </ListItem>
              </List>
              <ListItem>
                <Typography>{statement}</Typography>
              </ListItem>
              {currentExercise == -1 ? (
                <></>
              ) : (
                // La div contient la frise chronologique
                <div
                  style={{
                    overflowY: 'hidden',
                    overflowX: 'scroll',
                    height: '100px',
                  }}
                >
                  <FriseChrono
                    currentExercise={currentExercise}
                    clicked={clicked}
                    setClicked={setClicked}
                  ></FriseChrono>
                </div>
              )}
              <>
                {/* code des tentatives ci-dessous */}
                <List
                  sx={{
                    display: 'inline-block',
                    overflow: 'auto',
                    height: 'auto',
                    width: '99.9%',
                  }}
                >
                  {exerciseRef.current === '' || currentExercise == -1 ? (
                    <></>
                  ) : (
                    attempts?.map((attempt, index) =>
                      !(attempt.id == clicked && attempts.length - 1 > index) ? (
                        <>
                          {index === attempts.length - 1 ? renderAttempt(attempt, language) : <></>}
                        </>
                      ) : (
                        renderAttempt(attempt, language)
                      ),
                    )
                  )}
                </List>
              </>
            </Box>
          </div>
        }
      </Popper>
    </ClickAwayListener>
  );
};

PopperDetails.propTypes = {
  anchorEl: PropTypes.object,
  handlePopoverClose: PropTypes.func,
  open: PropTypes.bool,
  exo: PropTypes.any,
  exercises: PropTypes.array,
  session: PropTypes.object,
};
export default React.memo(PopperDetails);
