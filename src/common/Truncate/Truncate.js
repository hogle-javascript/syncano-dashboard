import React from 'react';

export default React.createClass({
  displayName: 'Truncate',

  getStyles() {
    return {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
  },

  render() {
    const styles = this.getStyles();
    const {text, style, ...other} = this.props;

    return (
      <div
        style={{...style, ...styles}}
        {...other}>
        {text}
      </div>
    );
  }
});
