import React from 'react';
import Radium from 'radium';

import MUI from 'syncano-material-ui';
import Common from '../../common';

export default Radium(React.createClass({

  displayName: 'CharacterCounter',

  propTypes: {
    visible: React.PropTypes.bool,
    maxCharacters: React.PropTypes.number.isRequired,
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
    let isCountExceeded = this.props.characters > this.props.maxCharacters;
    let styles = {
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

    return [
      styles.characterCounter,
      styles[this.props.position],
      this.props.style,
      isCountExceeded && styles.invalidCharactersCount
    ];
  },

  render() {
    let styles = this.getStyles();

    return (
      <Common.Show if={this.props.visible}>
        <div style={styles}>
          {`Characters count: ${this.props.characters} / ${this.props.maxCharacters}`}
        </div>
      </Common.Show>
    );
  }
}));
