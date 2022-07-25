import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * Petit cercle donnant une information de proportion à partir d'une valeur
 * @param {*} props
 * @returns
 */
function CircularProgressWithLabel(props) {
  // donne le texte à imprimer à l'intérieur du cercle
  const textInside =
    // si ce n'est pas un pourcentage, on l'affiche nature
    props.minValue || props.maxValue || props.mustBe100percent
      ? Math.round(props.value)
      : // sinon on rajoute le % à la fin
        Math.round(props.value) + '%';

  // Donne le pourcentage du remplissage du cercle
  const percentCircle =
    // si spécifié, alors mettre à 100% quoi qu'il se passe
    props.mustBe100percent == true
      ? 100
      : // si l'une des deux bornes n'est pas spécifié, on prend la valeur donnée comme un pourcentage
      props.minValue == undefined || props.maxValue == undefined
      ? // sinon on calcule le pourcentage en fonction des bornes
        props.value
      : 100 * ((props.value - props.minValue) / (props.maxValue - props.minValue));
  return (
    <div title={props.textOver}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={percentCircle} color={props.color} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {textInside}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator.
   * Value between 0 and 100, or between minValue and maxValue, or any if mustBe100percent is true
   * @default 0
   */
  value: PropTypes.number.isRequired,
  /**
   * The color of the theme you chose to print the circle
   * @default primary
   */
  color: PropTypes.string,
  /**
   * Text to print when hovering the element
   */
  textOver: PropTypes.string.isRequired,
  /**
   * If true, set the circle proportion to full and ignore the value
   */
  mustBe100percent: PropTypes.bool,
  /**
   * If both specified, change the milestones of the minimal and maximal
   * @default 0
   */
  minValue: PropTypes.number,
  /**
   * @default 100
   */
  maxValue: PropTypes.number,
};

export default CircularProgressWithLabel;
