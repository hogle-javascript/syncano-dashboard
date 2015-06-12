var colorPickerPalette = [
  '#EF6C00', '#C62828', '#AD1457', '#6A1B9A', '#4527A0', '#1565C0', '#0277BD', '#00695C', '#2E7D32', '#37474F',
  '#F57C00', '#D32F2F', '#C2185B', '#7B1FA2', '#512DA8', '#1976D2', '#0288D1', '#00796B', '#388E3C', '#455A64',
  '#FF9800', '#E53935', '#D81B60', '#8E24AA', '#5E35B1', '#1E88E5', '#039BE5', '#00897B', '#43A047', '#546E7A',
  '#FFA726', '#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#2196F3', '#03A9F4', '#009688', '#4CAF50', '#78909C',
];

var ColorStore = {

  getColorPickerPalette: function() {
    return colorPickerPalette;
  },

  getAllColors: function() {
    return colorPickerPalette;
  },

};

module.exports = ColorStore;