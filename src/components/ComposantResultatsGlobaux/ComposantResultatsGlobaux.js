import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getExercices } from '@stores/Exercices/exercicesSlice';
import { Box } from '@mui/system';

const HoveredItem = (props) => {
  let exo = props._getExo();
  console.log(exo);
  return (
    <div>
      {exo && (
        <div>
          <h2>Only visible when hovering</h2>
        </div>
      )}
    </div>
  );
};

const ComposantResultatsGlobaux = () => {
  //Handlers
  const [exo, setExo] = useState(null);
  const _getExo = (_) => exo;
  const _setExo = (exo) => setExo(exo);

  //Initialisations
  const exercices = useSelector(getExercices);
  let tabEtu = [];
  let tabExo = [];
  let tabIdExo = [];
  for (const exo of exercices) {
    if (!tabEtu.includes(exo.idEtu)) {
      tabEtu.push(exo.idEtu);
    }
    if (!tabExo.includes(exo.nomExo)) {
      tabExo.push(exo.nomExo);
    }
    if (!tabIdExo.includes(exo.idExo)) {
      tabIdExo.push(exo.idExo);
    }
  }
  let columns = [
    {
      field: 'idEtu',
      headerName: 'id etudiant',
      width: 180,
      cellClassName: 'super-app-theme--cell',
    },
  ];
  for (const exo of exercices) {
    if (!columns.find((col) => col.field === exo.idExo)) {
      columns.push({
        field: exo.idExo,
        headerName: exo.idExo,
        cellClassName: (params) => {
          if (params.value === true) {
            return '';
          }
          return clsx('super-app', {
            negative: params.value <= 3,
            normal: params.value <= 6 && params.value > 3,
            positive: params.value > 6,
          });
        },
      });
    }
  }

  let exoEtu = [];
  for (const etu of tabEtu) {
    exoEtu = exercices.filter((exo) => exo.idEtu == etu);
  }
  let exoEtus = [];
  for (const etu of tabEtu) {
    exoEtus.push({
      id: etu,
      idEtu: etu,
      exos: exercices.filter((exo) => exo.idEtu == etu),
    });
  }
  let rows_etu = [];
  for (const etu of exoEtus) {
    let row_etu = {
      id: etu.idEtu,
      idEtu: etu.idEtu,
    };
    for (const exo of etu.exos) {
      row_etu[exo.idExo] = exo.tentatives.length + 1;
    }
    rows_etu.push(row_etu);
  }

  const choisiCouleurSelonNbTentativesEtDifficulte = (nbTentatives, difficulte) => {
    const coulNbTentative = ['#097504', '#F96D0C', '#D10D04'];
    if (nbTentatives <= Math.ceil(difficulte / 2) + 1) {
      return coulNbTentative[0];
    } else if (nbTentatives <= difficulte + 2) {
      return coulNbTentative[1];
    } else {
      return coulNbTentative[2];
    }
  };
  return (
    <>
      <Box
        sx={{
          height: 300,
          width: 1,
          '& .super-app-theme--cell': {
            backgroundColor: '#f5f6fa',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.negative': {
            backgroundColor: '#097504', //vert
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.positive': {
            backgroundColor: '#D10D04', //orange
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.normal': {
            backgroundColor: '#F96D0C', //rouge
            color: '#1a3e72',
            fontWeight: '600',
          },
        }}
      >
        <HoveredItem _setExo={_setExo} _getExo={_getExo} />
        <DataGrid
          rows={rows_etu}
          columns={columns}
          loading={rows_etu.length === 2}
          autoHeight={true}
          autoWidth={true}
          headerHeight={36}
          density={'compact'}
          initialState={{
            sorting: {
              sortModel: [{ field: 'idEtu', sort: 'desc' }],
            },
          }}
        />
      </Box>
    </>
  );
};

ComposantResultatsGlobaux.propTypes = {};
HoveredItem.propTypes = {
  boolean: PropTypes.bool,
  exoRef: PropTypes.string,
  _getExo: PropTypes.func,
  _setExo: PropTypes.func,
};

export default ComposantResultatsGlobaux;
