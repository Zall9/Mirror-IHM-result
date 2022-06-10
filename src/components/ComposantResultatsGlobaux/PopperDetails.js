import React from 'react';
import PropTypes from 'prop-types';
import { Fade, List, ListItem, Popper, Slide, Typography } from '@mui/material';
import FriseChrono from './FriseChrono';
import { Box } from '@mui/system';
import { getExoFromIds } from './utils/getExoFromIds';
const PopperDetails = (props) => {
  const anchorEl = props.anchorEl;
  const open = Boolean(anchorEl);
  const exo = props.exo;
  const handlePopoverClose = props.handlePopoverClose;
  const exercices = props.exercices;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      onMouseLeave={handlePopoverClose}
      transition={true}
      disablePortal={true}
    >
      {({ TransitionProps }) => (
        //<Fade {...TransitionProps} timeout={350}>
        <Slide
          mountOnEnter
          unmountOnExit
          direction={'right'}
          {...TransitionProps}
          in={open}
          timeout={350}
        >
          <div
            style={{
              border: '1px solid black',
              width: 'auto',
              height: 'auto',
              backgroundColor: 'white',
            }}
          >
            {exo == '' ||
            getExoFromIds(exo.ownerElement.parentElement.dataset.id, exo.nodeValue, exercices) ==
              -1 ? (
              ''
            ) : (
              <ListItem>
                <FriseChrono
                  exo={
                    getExoFromIds(
                      exo.ownerElement.parentElement.dataset.id,
                      exo.nodeValue,
                      exercices,
                    ).tentatives
                  }
                ></FriseChrono>
              </ListItem>
            )}
            <List sx={{ width: '100%', height: '100%' }}>
              <ListItem>
                <Typography variant="h6">
                  {exo === '' ? '' : exo.ownerElement.parentElement.dataset.id}
                </Typography>
              </ListItem>
              <List sx={{ display: 'flex' }}>
                <ListItem>
                  <Typography>
                    {exo === ''
                      ? ''
                      : getExoFromIds(
                          exo.ownerElement.parentElement.dataset.id,
                          exo.nodeValue,
                          exercices,
                        ).nomExo}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography sx={{ p: 1 }}>
                    {exo === ''
                      ? ''
                      : getExoFromIds(
                          exo.ownerElement.parentElement.dataset.id,
                          exo.nodeValue,
                          exercices,
                        ).difficulte}
                  </Typography>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <Typography variant="h6">Tentatives:</Typography>
                </ListItem>
                <ListItem sx={{ display: 'inline-block', overflow: 'auto', height: '96px' }}>
                  {exo === '' ||
                  getExoFromIds(
                    exo.ownerElement.parentElement.dataset.id,
                    exo.nodeValue,
                    exercices,
                  ) == -1
                    ? ''
                    : getExoFromIds(
                        exo.ownerElement.parentElement.dataset.id,
                        exo.nodeValue,
                        exercices,
                      ).tentatives.map((tentative) => (
                        <Box key={tentative.id + 'Box'}>
                          <ListItem key={tentative.id + 'dateSoumission'}>
                            {tentative.dateSoumission}
                          </ListItem>
                          <ListItem key={tentative.id + 'Logs'}>
                            <Typography key={tentative.id}>{tentative.logErreurs}</Typography>
                          </ListItem>
                          <ListItem key={tentative.id + 'code'}>
                            {tentative.reponseEtudiant}
                          </ListItem>
                        </Box>
                      ))}
                </ListItem>
              </List>
            </List>
          </div>
        </Slide>
      )}
    </Popper>
  );
};

PopperDetails.propTypes = {
  anchorEl: PropTypes.object,
  open: PropTypes.bool,
  exo: PropTypes.any,
  handlePopoverClose: PropTypes.func,
  exercices: PropTypes.array,
};
export default PopperDetails;
