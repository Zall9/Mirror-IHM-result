import React from 'react';

import PropTypes from 'prop-types';
import { TableSortLabel, TableHead, TableRow, TableCell, Checkbox } from '@mui/material';

const headCells = [
  { id: 'idEtu', numeric: false, disablePadding: true, label: 'Id etudiant' },
  { id: 'nbExoValid', numeric: true, disablePadding: false, label: 'nb Exo valide' },
  { id: 'nomExoEnCours', numeric: true, disablePadding: false, label: 'Ex en cours' },
  { id: 'tempsExerciceEnCours', numeric: true, disablePadding: false, label: 'temps passé' },
  { id: 'nbTentaExEnCours', numeric: true, disablePadding: false, label: 'nb tentatives' },
  { id: 'themesExoEnCours', numeric: true, disablePadding: false, label: 'themes' },
  { id: 'difficulteExoEnCours', numeric: true, disablePadding: false, label: 'difficulte' },
];

export default function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
