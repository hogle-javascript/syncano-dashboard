import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

import MUI from 'material-ui';

let Header = React.createClass({
  getDefaultProps() {
    return {
      className : ColumnListConstans.DEFAULT_CLASSNAME.TEXT
    }
  },

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
});

export default Radium(React.createClass({

  displayName: 'ColumnText',

  propTypes: {
    id          : React.PropTypes.string,
    color       : React.PropTypes.string.isRequired,
    handleClick : React.PropTypes.func
  },

  statics :{
    Header : Header
  },

  getDefaultProps() {
    return {
      color      : 'rgba(0,0,0,.54)',
      hoverColor : MUI.Styles.Colors.blue600,
      className  : ColumnListConstans.DEFAULT_CLASSNAME.TEXT
    };
  },

  getInitialState() {
    return {
      color      : this.props.color,
      hoverColor : this.props.hoverColor
    }
  },

  getStyles() {
    return {
      display        : '-webkit-flex; display: flex',
      flexDirection  : 'column',
      justifyContent : 'center',
      fontSize       : '12px',
      lineHeight     : '16px',
      padding        : '16px 8px',
      color          : this.props.color
    };
  },

  handleClick() {
    this.props.handleClick(this.props.id);
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className = {this.props.className}
        style     = {styles}>
        {this.props.children}
      </div>
    );
  }
}));
