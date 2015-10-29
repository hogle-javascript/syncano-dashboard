import React from 'react';
import Radium from 'radium';

import MUI from 'syncano-material-ui';

export default Radium(React.createClass({

  displayName: 'FABList',

  propTypes: {
    position: React.PropTypes.string.isRequired
  },

  mixins: [MUI.Utils.Styles],

  getDefaultProps() {
    return {
      position: 'bottom'
    };
  },

  getStyles() {
    let styles = {
      position: 'fixed',
      right: '24px',
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
