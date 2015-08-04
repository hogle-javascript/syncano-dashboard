import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

import Spacing from './Spacing';

export default {
  spacing: Spacing,
  contentFontFamily: 'Avenir LT W01_35 Light1475496',
  getPalette: function() {
    return {
      primary1Color: Colors.blue700,
      primary2Color: Colors.blue500,
      primary3Color: Colors.blue100,

      accent1Color: Colors.indigo500,
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
      flatButton: {
        primaryTextColor: palette.primary1Color,
        textColor: 'rgba(0, 0, 0, 0.54)'
      },
      raisedButton: {
        primaryColor: Colors.blue700
      },
      floatingActionButton: {
        color: Colors.pinkA200
      },
    };
  }
};
