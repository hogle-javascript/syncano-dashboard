import React from 'react';
import Radium from 'radium';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'FABList',

  mixins: [MUI.Mixins.StylePropable],

  getDefaultProps() {
    return {
      position: 'bottom'
    }
  },

  propTypes: {
    position: React.PropTypes.string.isRequired
  },

  getStyles() {
    let styles = {
      position: 'fixed',
      right: '2vw',
      zIndex: 9,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    };

    if (this.props.position === 'bottom') {
      styles.bottom = '50px';
    } else {
      styles.top = '200px';
    }

    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  }
}));
