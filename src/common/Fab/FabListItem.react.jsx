import React from 'react';
import Radium from 'radium';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'FABListItem',

  propTypes: {
    handleClick: React.PropTypes.func
  },

  mixins: [MUI.Mixins.StylePropable],

  getStyles() {
    return {
      button: {
        margin: '3px 0'
      },
      icon: {
        display: '-webkit-flex; display: flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  },

  render() {
    let styles = this.getStyles();

    return (
      <MUI.FloatingActionButton
        {...this.props}
        style={styles.button}
        iconStyle={styles.icon}/>
    );
  }
}));
