import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import useRowStyles from './style';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            data-testid="button-open-row"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.exo}
        </TableCell>
        <TableCell align="right">{row.nomExo}</TableCell>
        <TableCell align="right">{row.nbTenta}</TableCell>
        <TableCell align="right">{row.temps}</TableCell>
        <TableCell align="right">{row.difficulte}</TableCell>
        <TableCell align="right">{row.themes}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Heure soumission</TableCell>
                    <TableCell>Temps Soumission (en ms)</TableCell>
                    <TableCell>Resultat Soumission</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history?.map((historyRow) => (
                    <TableRow key={historyRow.soumissionNumber}>
                      <TableCell component="th" scope="row">
                        {historyRow.dateSoumission}
                      </TableCell>
                      <TableCell>{historyRow.tempsSoumission}</TableCell>
                      <TableCell>{historyRow.logErreurs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    exo: PropTypes.string.isRequired,
    nomExo: PropTypes.string.isRequired,
    nbTenta: PropTypes.number.isRequired,
    temps: PropTypes.number.isRequired, // temps en minutes
    difficulte: PropTypes.number.isRequired,
    themes: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        dateSoumission: PropTypes.string.isRequired,
        tempsSoumission: PropTypes.number.isRequired,
        logErreurs: PropTypes.string.isRequired,
        soumissionNumber: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default Row;
