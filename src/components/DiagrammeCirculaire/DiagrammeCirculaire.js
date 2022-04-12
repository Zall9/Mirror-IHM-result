import Chart from 'chart.js/auto';
import React from 'react';

const DiagrammeCirculaire = (props) => {
  const dataProps = props.data;
  const couleurs = props.couleurs;
  const labelsProps = props.labels;
  const titre = props.titre;
  const typeDiagramme = props.typeDiagramme; // 'pie' ou 'doughnut'
  const clickCallback = props.clickCallback;
  const idProps = props.id;
  const booleanIsInteractive = props.booleanIsInteractive;
  const taille = props.taille;
  const data = {
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
  const config = {
    type: typeDiagramme,
    data: data,
    showTooltips: booleanIsInteractive,
  };
  const myChart = new Chart(document.getElementById(idProps), config);
  myChart.onClick = clickCallback;

  return (
    <div className={'diagramme-circulaire' + idProps}>
      <canvas id={idProps} width={taille} height={taille}></canvas>
    </div>
  );
};

export default DiagrammeCirculaire;
