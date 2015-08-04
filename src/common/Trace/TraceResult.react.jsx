import React from 'react';

export default React.createClass({

  displayName: "TraceResult",

  getStyles() {
    let styles = {
      result: {
        padding: '25px',
        color: 'white',
        whiteSpace: 'pre',
        font: "12px/normal 'Monaco', monospace",
        backgroundColor: '#4C4A43'
      }
    }
    return styles;
  },

  render() {
    let styles = this.getStyles();
    return (
      <div>
        <div style={styles.result}>
          {this.props.result}
        </div>
      </div>
    )
  }
});
