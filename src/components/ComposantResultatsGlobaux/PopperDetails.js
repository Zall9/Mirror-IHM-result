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
import axios from 'axios';

const PopperDetails = (props) => {
  // const [anchor, setAnchor] = useState(props.anchorEl);
  const [consigne, setConsigne] = useState('');
  const open = Boolean(props.anchorEl);
  let exo = props.exo;
  console.log('props', props);
  console.log('axios', process.env.REACT_APP_SRVEXO_URL + '/exercices/' + exo.field);
  axios
    .get(process.env.REACT_APP_SRVEXO_URL + '/exercices/' + exo.field)
    .then((res) => {
      console.log('_res', res.data.exercice.enonce);
      setConsigne(res.data.exercice.enonce);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('consigne', consigne);
  const exercices = props.exercices;
  const handlePopoverClose = props.handlePopoverClose;

  const anchorEl = props.anchorEl;
  const exerciceAffiche = getExoFromIds(exo.id, exo.field, exercices);
  const nomExo = exerciceAffiche.nomExo;
  const langage = exerciceAffiche.langage;
  const tentatives = exerciceAffiche.tentatives;
  const difficulte = exerciceAffiche.difficulte;
  const [clicked, setClicked] = useState('');

  //   const Fade = styled.div`
  //     display: inline-block;
  //     visibility: ${() => (clicked ? 'hidden' : 'visible')};
  //     animation: ${() => (clicked ? fadeOut : fadeIn)} 1s linear;
  //     transition: visibility 1s linear;
  //   `;
  //   const fadeIn = keyframes`
  //   from {
  //     opacity: 0;
  //     background-color: rgba(0, 0, 0, 0.5);
  //   }
  //   to {
  //     opacity: 1;
  //     background-color: rgba(171, 161, 161, 0.5);
  //   }
  // `;
  //   const fadeOut = keyframes`
  //   from {
  //     opacity: 1;
  //     background-color: rgba(171, 161, 161, 0.5);
  //   }
  //   to {
  //     opacity: 0;
  //     background-color: rgba(0, 0, 0, 0.5);
  //   }
  // `;

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
                <Typography variant="h6">{exo === '' ? '' : exo.id}</Typography>
              </ListItem>
              <List sx={{ display: 'flex' }}>
                <ListItem>
                  <Typography>{exo === '' ? '' : nomExo}</Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ p: 1 }}>{exo === '' ? '' : difficulte}</Typography>
                </ListItem>
              </List>
              <ListItem>
                <Typography>{exo === '' ? '' : consigne}</Typography>
              </ListItem>
              {exo == '' || exerciceAffiche == -1 ? (
                ''
              ) : (
                <div
                  style={{
                    overflowY: 'hidden',
                    overflowX: 'scroll',
                    height: '100px',
                    '&::-webkit-scrollbar': { width: 0, backgroundColor: '#ff' },
                    '::-webkit-scrollbar-thumb': {
                      backgroundColor: '#989090',
                      borderRadius: '12px',
                      border: '3px double #ffffff',
                    },
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
                    height: '50vh',
                    border: '1.5px solid black',
                    marginLeft: '1em',
                  }}
                >
                  {exo === '' || exerciceAffiche == -1
                    ? ''
                    : tentatives.map((tentative) => (
                        <div
                          key={tentative.id}
                          style={
                            clicked == tentative.id + 'code'
                              ? { backgroundColor: 'rgba(166, 161, 161,0.5)' }
                              : { backgroundColor: 'white' }
                          }
                        >
                          <ListItem key={tentative.id + 'dateSoumission'}>
                            <Typography>{dateParser(tentative.dateSoumission)}</Typography>
                            <Typography>{':'}&nbsp;</Typography>
                            <Typography key={tentative.id + 'Logs'}>
                              {tentative.logErreurs}
                            </Typography>
                          </ListItem>

                          {langage !== '' && langage !== undefined ? (
                            <div id={tentative.id + 'code'}>
                              <CodeTentative
                                code={tentative.reponseEtudiant}
                                key={tentative.id + 'code'}
                                language={langage}
                              />
                              {clicked == tentative.id + 'code' ? (
                                <Divider sx={{ border: '3px solid rgba(0,0,0,0.5)' }} />
                              ) : null}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      ))}
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
};
export default PopperDetails;
