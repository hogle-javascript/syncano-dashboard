import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

import MUI from 'material-ui';

let Header = React.createClass({
  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.NAME
    }
  },

  getStyles() {
    return {
      fontSize: 20,
      fontWeight: 500
    }
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className={this.props.className}
        style={styles}>
        {this.props.children}
      </div>
    )
  }
});

export default Radium(React.createClass({

  displayName: 'ColumnName',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired
  },

  statics: {
    Header: Header
  },

  getDefaultProps() {
    return {
      color: 'rgba(0,0,0,.54)',
      hoverColor: MUI.Styles.Colors.blue600,
      className: ColumnListConstans.DEFAULT_CLASSNAME.NAME
    };
  },

  getStyles() {
    return {
      display: '-webkit-flex; display: flex',
      flexDirection: 'row',
      fontSize: 12,
      padding: '16px 8px',
      alignSelf: 'center',
      cursor: 'pointer',
      color: this.state.color,
      ':hover': {
        color: this.state.hoverColor
      }
    }
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className={this.props.className}
        style={styles}>
        {this.props.children}
      </div>
    );
  }
}));
