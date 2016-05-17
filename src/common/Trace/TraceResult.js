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

  renderTrace() {
    let result = this.props.result;

    return result.stderr ? result.stderr : result.stdout;
  },

  render() {
    let styles = this.getStyles();

    return (
      <div>
        <div style={styles.result}>
          {this.renderTrace()}
        </div>
      </div>
    );
  }
});
