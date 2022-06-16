import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, List, ListItem, Popper, Slide, Typography } from '@mui/material';
import FriseChrono from './FriseChrono';
import { Box } from '@mui/system';
import { getExoFromIds } from './utils/getExoFromIds';
import CodeTentative from './CodeTentative';
import CancelIcon from '@mui/icons-material/Cancel';
const PopperDetails = (props) => {
  // const [anchor, setAnchor] = useState(props.anchorEl);
  const open = Boolean(props.anchorEl);
  const exo = props.exo;
  const exercices = props.exercices;
  const handlePopoverClose = props.handlePopoverClose;

  const anchorEl = props.anchorEl;
  let langage = '';
  if (exo.ownerElement != undefined) {
    langage = getExoFromIds(
      exo.ownerElement.parentElement.dataset.id,
      exo.nodeValue,
      exercices,
    ).langage;
  }
  return (
    <Popper open={open} anchorEl={anchorEl} transition={true} disablePortal={true}>
      {({ TransitionProps }) => (
        <div
          style={{
            border: '1px solid black',
            width: 'auto',
            height: 'auto',
            backgroundColor: 'white',
          }}
        >
          <IconButton>
            <CancelIcon onClick={handlePopoverClose}></CancelIcon>
          </IconButton>
          {exo == '' ||
          getExoFromIds(exo.ownerElement.parentElement.dataset.id, exo.nodeValue, exercices) ==
            -1 ? (
            ''
          ) : (
            <ListItem>
              <FriseChrono
                exo={
                  getExoFromIds(exo.ownerElement.parentElement.dataset.id, exo.nodeValue, exercices)
                    .tentatives
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
                        {langage !== '' && langage !== undefined ? (
                          <CodeTentative
                            code={tentative.reponseEtudiant}
                            key={tentative.id + 'code'}
                            language={langage}
                          ></CodeTentative>
                        ) : (
                          ''
                        )}
                      </Box>
                    ))}
              </ListItem>
            </List>
          </List>
        </div>
      )}
    </Popper>
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
