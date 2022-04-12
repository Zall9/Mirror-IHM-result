import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';
import PropTypes, { element } from 'prop-types';

const DiagrammeCirculaire = (props) => {
  let myChart;
  console.log('Props :', props);
  const dataProps = props.datas;
  const couleurs = props.couleurs;
  const labelsProps = props.labels;
  const titre = props.titre;
  const typeDiagramme = props.typeDiagramme; // 'pie' ou 'doughnut'
  const clickCallback = props.clickCallback;
  const idProps = props.id;
  const booleanIsInteractive = props.booleanIsInteractive;
  const taille = props.taille;
  const datas = {
    labels: labelsProps,
    datasets: [
      {
        label: titre,
        data: dataProps,
        backgroundColor: couleurs,
        hoverOffset: 5,
      },
    ],
  };
  console.log('Datas :', datas);
  console.log('Couleurs :', couleurs);
  console.log('Labels :', labelsProps);
  console.log('Titre :', titre);
  console.log('TypeDiagramme :', typeDiagramme);
  console.log('ClickCallback :', clickCallback);
  console.log('Id :', idProps);
  console.log('BooleanIsInteractive :', booleanIsInteractive);
  console.log('Taille :', taille);
  const config = {
    type: typeDiagramme,
    data: datas,
    options: { responsive: true, showTooltips: booleanIsInteractive },
  };

  const canvas = <canvas id={`my-canvas-${idProps}`} width={taille} height={taille}></canvas>;
  const ctx = document.getElementById(`my-canvas-${idProps}`);

  return (
    <div id={'diagramme-circulaire' + idProps} className={'diagramme' + idProps}>
      {useEffect(() => {
        console.log('zboob', !myChart);
        if (!myChart) {
          console.log('Je vais creer le chart');
          myChart = new Chart(ctx, config);
          myChart.onClick = clickCallback;
        } else {
          console.log('je vais update le chart');
          myChart.update();
        }
      }, [config])}
      {canvas}
    </div>
  );
};

DiagrammeCirculaire.propTypes = {
  datas: PropTypes.arrayOf(PropTypes.number).isRequired,
  couleurs: PropTypes.arrayOf(PropTypes.string).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  titre: PropTypes.string.isRequired,
  typeDiagramme: PropTypes.string.isRequired,
  clickCallback: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  booleanIsInteractive: PropTypes.bool.isRequired,
  taille: PropTypes.number.isRequired,
};

export default DiagrammeCirculaire;
