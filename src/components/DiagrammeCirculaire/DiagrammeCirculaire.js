import Chart from 'chart.js/auto';
import React, { useEffect } from 'react';
import PropTypes, { element } from 'prop-types';

const DiagrammeCirculaire = (props) => {
  let myChart;
  const dataProps = props.datas;
  const couleurs = props.couleurs;
  const labelsProps = props.labels;
  const titre = props.titre;
  const typeDiagramme = props.typeDiagramme; // 'pie' ou 'doughnut'
  const clickCallback = props.clickCallback;
  const idProps = props.id;
  const booleanIsInteractive = props.booleanIsInteractive;
  const taille = props.taille;
  // On crée les données du graphique
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

  // On crée les options du graphique
  const config = {
    type: typeDiagramme,
    data: datas,
    options: { responsive: true, showTooltips: booleanIsInteractive },
  };
  /* hook qui est appelé lorsque le composant est monté pour creer et mettre a jour le chartJS
   * Le hook est appelé une seule fois au chargement du composant puis se ré-execute à chaque changement de props (ici le props est config)
   */
  useEffect(() => {
    const ctx = document.getElementById(`my-canvas-${idProps}`); // on recupere le canvas ou inserer le chartJS

    let oldChart = Chart.getChart(ctx); // On récupere l'ancien chart

    /*si le chart existait deja dans le DOM on update les données */
    if (oldChart) {
      oldChart.type = config.type;
      oldChart.data = config.data;
      oldChart.options = config.options;
      oldChart.update('resize'); //option pour l'animation de l'update
    } else {
      myChart = new Chart(ctx, config);
      ctx.addEventListener('click', clickCallback);
    }
  }, [config]);

  return (
    <div
      id={'diagramme-circulaire' + idProps}
      className={'diagramme' + idProps}
      style={{ position: 'relative', width: taille + 'vw', height: taille + 'vh' }}
    >
      <canvas id={`my-canvas-${idProps}`} width="100vw" height="100vh"></canvas>
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
