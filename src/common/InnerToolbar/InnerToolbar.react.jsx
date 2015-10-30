import React from 'react';

import Toolbar from 'syncano-material-ui/lib/toolbar/toolbar';

export default React.createClass({

  displayName: 'InnerToolbar',

  propTypes: {
    children: React.PropTypes.node
  },

  getStyles() {
    return {
      position: 'fixed',
      top: 50,
      right: 0,
      paddingLeft: 256,
      background: 'rgba(222,222,222,0.30)',
      padding: '0px 24px 0 24px',
      zIndex: 6
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <Toolbar style={styles}>
        {this.props.children}
      </Toolbar>
    );
  }
});
