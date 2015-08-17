import Colors from 'material-ui/lib/styles/colors';

export default {
  syncanoThemeColorName: 'blue',

  getColorPickerPalette() {
    let colors = [];
    let uniqueColors = Object.keys(Colors).filter((key) => {
        return key.slice(-3) === '500';
      });

    uniqueColors.map((color) => {
      color = color.slice(0, -3);
      if (color !== this.syncanoThemeColorName) {
        colors.push(color);
      }
    });

    return colors;
  },

  getColorByName(name, variation) {
    if (variation === 'dark') {
      return Colors[name + '700'];
    }
    if (variation === 'light') {
      return Colors[name + '300'];
    }
    if (variation === 'xlight') {
      return Colors[name + '100'];
    }
    return Colors[name + '500'];
  },

  getRandomColorName() {
    let uniqueColors = this.getColorPickerPalette();
    let uniqueColorsCount = uniqueColors.length;
    let randomNumber = Math.floor((Math.random() * uniqueColorsCount));

    return uniqueColors[randomNumber];
  },

  getAllColors() {
    return this.getColorPickerPalette();
  }

};
