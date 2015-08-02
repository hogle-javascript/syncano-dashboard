import React from 'react';
import Radium from 'radium';

export default Radium(React.createClass({

  displayName: 'ItemColumn',

  getStyles() {
    return {
      display        : '-webkit-flex; display: flex',
      flexDirection  : 'column',
      justifyContent : 'center'
    }
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
