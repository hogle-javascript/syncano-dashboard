var Colors            = require('material-ui/lib/styles/colors'),
    ColorManipulator  = require('material-ui/lib/utils/color-manipulator'),

    Spacing           = require('./Spacing');

var SyncanoTheme = {
  spacing: Spacing,
  contentFontFamily: 'Roboto, sans-serif',
  getPalette: function() {
    return {
      primary1Color : Colors.blue700,
      primary2Color : Colors.blue500,
      primary3Color : Colors.blue100,

      accent1Color  : Colors.indigo500,
      accent2Color  : Colors.pinkA400,
      accent3Color  : Colors.pinkA100,

      textColor     : Colors.darkBlack,
      canvasColor   : Colors.white,
      borderColor   : Colors.grey300,
      disabledColor : ColorManipulator.fade(Colors.darkBlack, 0.3)
    };
  },
  getComponentThemes: function(palette) {
    return {
      button: {
        height: 48
      },
      flatButton: {
        primaryTextColor : palette.primary1Color,
        textColor        : 'rgba(0, 0, 0, 0.54)'
      },
      raisedButton: {
        primaryColor: Colors.pinkA200
      },
      floatingActionButton: {
        color: Colors.pinkA200
      }
    };
  }
};

module.exports = SyncanoTheme;