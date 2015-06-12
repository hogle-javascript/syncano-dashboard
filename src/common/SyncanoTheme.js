var Colors            = require('material-ui/lib/styles/colors'),
    Spacing           = require('material-ui/lib/styles/spacing'),
    ColorManipulator  = require('material-ui/lib/utils/color-manipulator');

var SyncanoTheme = {
  spacing: Spacing,
  contentFontFamily: 'Roboto, sans-serif',
  getPalette: function() {
    return {
      primary1Color: Colors.cyan500,
      primary2Color: Colors.cyan700,
      primary3Color: Colors.cyan100,
      accent1Color: Colors.pinkA200,
      accent2Color: Colors.pinkA400,
      accent3Color: Colors.pinkA100,
      textColor: Colors.darkBlack,
      canvasColor: Colors.white,
      borderColor: Colors.grey300,
      disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    };
  },
  getComponentThemes: function(palette) {
    return {
      button: {
        height: 48
      }
    };
  }
};

module.exports = SyncanoTheme;