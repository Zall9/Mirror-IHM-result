import Rainbow from 'rainbowvis.js';

export const colorGradient = (nbTentatives, boolean) => {
  console.log('DANS colorGradient BOOL', boolean);
  if (nbTentatives > 0) {
    console.log('DANS NBTENTATIVES', boolean);
    if (boolean) {
      console.log('DANS LE IF BOOL', boolean);
      const rainbow = new Rainbow();
      rainbow.setNumberRange(-1, ~~nbTentatives + 1);
      rainbow.setSpectrum('pink', 'pink', 'pink');
      //apres tps moyen #ffdb00
      //avant #80c000
      let selected = '';
      for (let i = 0; i < nbTentatives; i++) {
        let hexColour = rainbow.colorAt(i);
        selected = '#' + hexColour;
        // console.log('mycolor', selected);
      }
      return selected;
      // console.log(typeof selected);
    } else {
      const rainbow = new Rainbow();
      rainbow.setNumberRange(-1, ~~nbTentatives + 1);
      rainbow.setSpectrum('red', 'grey', 'green');
      //apres tps moyen #ffdb00
      //avant #80c000
      let selected = '';
      for (let i = 0; i < nbTentatives; i++) {
        let hexColour = rainbow.colorAt(i);
        selected = '#' + hexColour;
      }
      return selected;
    }
  }
  return 'white';
};
