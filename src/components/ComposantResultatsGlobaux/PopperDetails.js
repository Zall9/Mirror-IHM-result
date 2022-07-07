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
  const [consigne, setConsigne] = useState('');
  const [exoState, setExoState] = useState(props.exo);
  const [clicked, setClicked] = useState('');
  const open = Boolean(props.anchorEl);
  useEffect(() => {
    setConsigne(props.session?.exercices.filter((exo) => exo.id == exoState.field)[0]?.enonce);
  }, []);
  const exercices = props.exercices;
  const handlePopoverClose = props.handlePopoverClose;
  const anchorEl = props.anchorEl;
  const exerciceAffiche = getExoFromIds(exoState.id, exoState.field, exercices);
  const nomExo = exerciceAffiche.nomExo;
  const langage = exerciceAffiche.langage;
  const tentatives = exerciceAffiche.tentatives;
  const difficulte = exerciceAffiche.difficulte;

  const renderTentatives = (tentative, langage) => {
    return (
      <div id={tentative.id} key={tentative.id}>
        <ListItem key={tentative.id + 'dateSoumission'}>
          <Typography>{dateParser(tentative.dateSoumission)}</Typography>
          <Typography>{':'}&nbsp;</Typography>
          <Typography key={tentative.id + 'Logs'}>{tentative.logErreurs}</Typography>
        </ListItem>
        {langage !== '' && langage !== undefined ? (
          <div id={tentative.id + '-code'}>
            <CodeTentative
              code={tentative.reponseEtudiant}
              key={tentative.id + '-code'}
              language={langage}
            />
            {clicked == tentative.id + '-code' ? (
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
        open={open}
        anchorEl={anchorEl}
        disablePortal={false}
        placement={'right'}
        popperOptions={{
          positionFixed: false,
        }}
      >
        {
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
                <Typography variant="h6">{exoState === '' ? '' : exoState.id}</Typography>
              </ListItem>
              <List sx={{ display: 'flex' }}>
                <ListItem>
                  <Typography>{exoState === '' ? '' : nomExo}</Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ p: 1 }}>{exoState === '' ? '' : difficulte}</Typography>
                </ListItem>
              </List>
              <ListItem>
                <Typography>{exoState === '' ? '' : consigne}</Typography>
              </ListItem>
              {exoState == '' || exerciceAffiche == -1 ? (
                <></>
              ) : (
                <div
                  style={{
                    overflowY: 'hidden',
                    overflowX: 'scroll',
                    height: '100px',
                  }}
                >
                  <FriseChrono
                    exo={exerciceAffiche}
                    clicked={clicked}
                    setClicked={setClicked}
                  ></FriseChrono>
                </div>
              )}
              <List>
                <List
                  sx={{
                    display: 'inline-block',
                    overflow: 'auto',
                    height: 'auto',
                    width: '99.9%',
                  }}
                >
                  {exoState === '' || exerciceAffiche == -1 ? (
                    <></>
                  ) : (
                    tentatives.map((tentative, index) =>
                      tentative.id == clicked && tentatives.length - 1 > index ? (
                        renderTentatives(tentative, langage)
                      ) : (
                        <>
                          {index === tentatives.length - 1 ? (
                            renderTentatives(tentative, langage)
                          ) : (
                            <></>
                          )}
                        </>
                      ),
                    )
                  )}
                </List>
              </List>
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
  exercices: PropTypes.array,
  session: PropTypes.object,
};
export default React.memo(PopperDetails);
