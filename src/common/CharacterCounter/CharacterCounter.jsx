import React from 'react';
import Radium from 'radium';

import MUI from 'syncano-material-ui';

export default Radium(React.createClass({

  displayName: 'CharacterCounter',

  propTypes: {
    visible: React.PropTypes.bool,
    maxCharacters: React.PropTypes.number.isRequired,
    charactersCountWarn: React.PropTypes.number,
    characters: React.PropTypes.number.isRequired,
    position: React.PropTypes.oneOf(['left', 'right', 'center']),
    style: React.PropTypes.object
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      visible: true,
      position: 'right'
    };
  },

  getStyles() {
    return {
      characterCounter: {
        color: MUI.Styles.Colors.grey400,
        marginTop: 10,
        display: '-webkit-flex; display: flex'
      },
      invalidCharactersCount: {
        color: this.context.muiTheme.rawTheme.palette.accent2Color
      },
      left: {
        justifyContent: 'flex-start'
      },
      center: {
        justifyContent: 'center'
      },
      right: {
        justifyContent: 'flex-end'
      }
    };
  },

  render() {
    let isCountExceeded = this.props.characters > this.props.maxCharacters;
    let isWarnCountExceed = this.props.charactersCountWarn && (this.props.characters > this.props.charactersCountWarn);
    let styles = this.getStyles();
    let counterStyle = [
      styles.characterCounter,
      styles[this.props.position],
      this.props.style,
      isCountExceeded && styles.invalidCharactersCount
    ];

    if (!this.props.visible || !isWarnCountExceed) {
      return null;
    }

    return (
      <div style={counterStyle}>
        {`Characters count: ${this.props.characters} / ${this.props.maxCharacters}`}
      </div>
    );
  }
}));
