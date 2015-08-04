import React from 'react';
import Radium from 'radium';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'FABListItem',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    handleClick: React.PropTypes.func
  },

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
