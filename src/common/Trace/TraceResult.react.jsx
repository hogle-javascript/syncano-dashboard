import React from 'react';

export default React.createClass({

  displayName: 'TraceResult',

  getStyles() {
    return {
      result: {
        padding: '25px',
        color: 'white',
        whiteSpace: 'pre',
        font: `12px/normal 'Monaco', monospace`,
        backgroundColor: '#4C4A43'
      }
    };
  },

  render() {
    let styles = this.getStyles();

    return (
      <div>
        <div style={styles.result}>
          {this.props.result}
        </div>
      </div>
    );
  }
});
