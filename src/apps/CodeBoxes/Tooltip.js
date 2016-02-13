import React from 'react';
import Radium from 'radium';

import {FontIcon, Tooltip} from 'syncano-material-ui';

export default Radium(React.createClass({
  displayName: 'Tooltip',

  getInitialState() {
    return {
      tooltipShown: false
    };
  },

  getStyles() {
    return {
      root: {
        position: 'relative',
        cursor: 'pointer'
      },
      name: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      linkContainer: {
        display: 'flex',
        flexWrap: 'wrap'
      },
      link: {
        fontSize: '0.8em',
        color: '#9B9B9B',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingRight: 20,
        position: 'relative',
        whiteSpace: 'nowrap'
      },
      icon: {
        position: 'absolute',
        top: 2,
        right: 0,
        fontSize: 15,
        verticalAlign: 'middle',
        color: '#9B9B9B'
      },
      tooltip: {
        top: 2,
        pointerEvents: 'none'
      }
    };
  },

  showTooltip() {
    this.setState({tooltipShowed: true});
  },

  hideTooltip() {
    this.setState({tooltipShowed: false});
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.root}>
        <FontIcon
          color="#b8c0c9"
          style={{fontSize: 16}}
          className="synicon-information"
          onMouseEnter={this.showTooltip}
          onMouseLeave={this.hideTooltip} />
        <Tooltip
          style={styles.tooltip}
          label={this.props.tooltip}
          show={this.state.tooltipShowed}
          verticalPosition="bottom"
          horizontalPosition="right"/>
      </div>
    );
  }
}));
