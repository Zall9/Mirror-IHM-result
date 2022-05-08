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
  const optionsElementCentral = props.optionsElementCentral;
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
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: booleanIsInteractive,
        },
      },
      elements: { center: optionsElementCentral },
    },
  };
  /* hook qui est appelé lorsque le composant est monté pour creer et mettre a jour le chartJS
   * Le hook est appelé une seule fois au chargement du composant puis se ré-execute à chaque changement de props (ici le props est config)
   */
  useEffect(() => {
    // On initialise la possibilité de mettre du texte dans le centre du diagramme
    initPluginElementCentral();
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
  clickCallback: PropTypes.func,
  id: PropTypes.string.isRequired,
  booleanIsInteractive: PropTypes.bool.isRequired,
  taille: PropTypes.number.isRequired,
  optionsElementCentral: PropTypes.object,
};

const initPluginElementCentral = () => {
  Chart.register({
    id: 'pluginElementCentral',
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        // On récupere le contexte pour le texte central
        var ctx = chart.ctx;

        // On récupere le controler pour avoir innerRadius
        var controller = chart.getDatasetMeta(0).controller;

        // On récupere les options du texte central
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (controller.innerRadius * 2);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;

        // On commence avec 30px
        ctx.font = '30px ' + fontStyle;

        // On récupere la largeur du texte et celle du future élement moins la largeur du padding choisi
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = controller.innerRadius * 2 - sidePaddingCalculated;

        // On recalcul la taille du texte pour qu'il corresponde à la celle de l'élément
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = controller.innerRadius * 2;

        // Choisi la taille du texte pour quelle ne déborde pas sur le graphique
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Utilise les parametres pour le texte.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.font = fontSizeToUse + 'px ' + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        var words = txt.split(' ');
        var line = '';
        var lines = [];

        // Met les mots sur plusieurs lignes si besoin
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }

        // On change la hauteur selon le nombre de lignes
        centerY -= (lines.length / 2) * lineHeight;

        for (var n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Dessine le texte au centre
        ctx.fillText(line, centerX, centerY);
      }
    },
  });
};

export default DiagrammeCirculaire;
