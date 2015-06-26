var Colors = require('material-ui/lib/styles/colors');

// Used only in old AvatarInitials component, for new components use Colors instead of this
var colorPickerPalette = [
  '#EF6C00', '#C62828', '#AD1457', '#6A1B9A', '#4527A0', '#1565C0', '#0277BD', '#00695C', '#2E7D32', '#37474F',
  '#F57C00', '#D32F2F', '#C2185B', '#7B1FA2', '#512DA8', '#1976D2', '#0288D1', '#00796B', '#388E3C', '#455A64',
  '#FF9800', '#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#1E88E5', '#039BE5', '#00897B', '#43A047', '#546E7A',
  '#FFA726', '#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#2196F3', '#03A9F4', '#009688', '#4CAF50', '#78909C'
];

var ColorStore = {
  syncanoThemeColorName: 'blue',

  getColorPickerPalette: function() {
    var colors = [],
        uniqueColors = Object.keys(Colors).filter(function(key) {
          return key.slice(-3) === "500";
        });

    uniqueColors.map(function(color) {
      color = color.slice(0, -3);
      if (color !== ColorStore.syncanoThemeColorName) {
        colors.push(color);
      }
    });

    return colors;
  },

  getColorByName: function(name, variation) {
    if (variation === 'dark') {
      return Colors[name + '700'];
    }
    if (variation === 'light') {
      return Colors[name + '100'];
    }
    return Colors[name + '500'];
  },

  // To remove with AvatarInitials component
  getOldColorPickerPalette: function() {
    return colorPickerPalette;
  },

  getRandomColorName: function() {
    var uniqueColors      = this.getColorPickerPalette(),
        uniqueColorsCount = uniqueColors.length,
        randomNumber      = Math.floor((Math.random() * uniqueColorsCount));

    return uniqueColors[randomNumber];
  },

  getAllColors: function() {
    return this.getColorPickerPalette();
  }

};

module.exports = ColorStore;
