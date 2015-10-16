import React from 'react';
import Radium from 'radium';
import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'Loading',

  propTypes: {
    size: React.PropTypes.number,
    type: React.PropTypes.oneOf(['circular', 'linear'])
  },

  getDefaultProps() {
    return {
      type: 'circular',
      size: 1,
      show: false
    };
  },

  getStyles() {
    let styles = {
      base: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        left: 0
      },
      top: {
        position: 'absolute',
        top: 0
      },
      bottom: {
        position: 'absolute',
        bottom: 0
      }
    };

    if (this.props.show) {
      return [styles.base,
        this.props.position === 'top' && styles.top,
        this.props.position === 'bottom' && styles.bottom,
        this.props.style];
    }
  },

  renderItem() {
    if (this.props.show === false) {
      return this.props.children;
    }

    if (this.props.type === 'linear') {
      return <MUI.LinearProgress mode='indeterminate'/>;
    }

    return (
      <MUI.CircularProgress
        mode='indeterminate'
        size={this.props.size}/>
    );
  },

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles}>
        {this.renderItem()}
      </div>
    );
  }
}));
