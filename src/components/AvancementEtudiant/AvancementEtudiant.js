import React from 'react';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { makeStyles } from '@mui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  Switch,
} from '@mui/material';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const AvancementEtudiant = () => {
  // récupérer tous les résultats
  const exercices = useSelector(getExercices);
  console.log(exercices);
  // collecter tous les étudiants
  const etudiants = collectEtudiantIds(exercices);

  console.log(etudiants);
  // faire un tableau id etudiant
  let avancement = [];
  // faire un tableau id etudiant / avec le nb d'exercices validés
  // et des informations sur l'exercice courant : nb de tentative / le temps passé / nom exo / thèmes / difficultés

  for (const etudiant of etudiants) {
    const exoEnCours = exercices.filter(
      (item) => key(item).idEtu == etudiant && !key(item).estFini,
    )[0];
    avancement.push({
      idEtu: etudiant,
      nbExoValid: exercices.filter((item) => key(item).idEtu == etudiant && key(item).estFini)
        .length,
      tempsExerciceEnCours: Date.now().valueOf() - stringDateToTimestamp(exoEnCours.debut) ?? 0,
      nbTentaExEnCours: exoEnCours.tentatives.length ?? 0,
      nomExoEnCours: exoEnCours.nomExo ?? 'Aucun',
      themesExoEnCours: exoEnCours.themes.join(' ') ?? 'Aucun',
      difficulteExoEnCours: exoEnCours.difficulte ?? 0,
    });
  }
  console.log(avancement);
  function createData(
    idEtu,
    nbExoValid,
    tempsExerciceEnCours,
    nbTentaExEnCours,
    nomExoEnCours,
    themesExoEnCourss,
    difficulteExoEnCours,
  ) {
    return {
      idEtu,
      nbExoValid,
      tempsExerciceEnCours,
      nbTentaExEnCours,
      nomExoEnCours,
      themesExoEnCourss,
      difficulteExoEnCours,
    };
  }

  const rows = [];
  for (const etu in avancement) {
    rows.push(createData(etu));
  }

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nbExoValid');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(40);

  // tri à la main via les entêtes
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // checkbox de l'entete pour selectionner tous les étudiants
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // selectionne des éléments du tableau
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  // changement de page via les flèches du bas
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // changement du nombre de ligne par page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // mode dense ou pas !
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // test si un élément du tableau est selectionné
  const isSelected = (name) => selected.indexOf(name) !== -1;

  // compléter les lignes manquantes pour afficher une page
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.idEtu);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.idEtu)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.idEtu}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.idEtu}
                      </TableCell>
                      <TableCell align="right">{row.nbExoValid}</TableCell>
                      <TableCell align="right">{row.tempsExerciceEnCours}</TableCell>
                      <TableCell align="right">{row.nbTentaExEnCours}</TableCell>
                      <TableCell align="right">{row.nomExoEnCours}</TableCell>
                      <TableCell align="right">{row.themesExoEnCourss}</TableCell>
                      <TableCell align="right">{row.difficulteExoEnCours}</TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 80]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing,
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));
////////////////////////// FONCTIONS ANNEXES //////////////////////////////////////////////
function collectEtudiantIds(exercices) {
  const etus = new Set();
  return exercices.filter((item) => {
    let k = key(item);
    return etus.has(k.idEtu) ? false : etus.add(k.idEtu);
  });
}

function tempsSoumissionToString(temps) {
  console.log(temps);
  return temps;
}

function stringDateToTimestamp(stringDate) {
  return Date.parse(stringDate).valueOf();
}

export default AvancementEtudiant;
