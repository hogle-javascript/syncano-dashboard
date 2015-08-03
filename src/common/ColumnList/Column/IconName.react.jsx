import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

import MUI from 'material-ui';

let Header = React.createClass({

  getDefaultProps() {
    return {
      className : ColumnListConstans.DEFAULT_CLASSNAME.ICON_NAME
    }
  },

  getStyles() {
    return {
      fontSize    : 20,
      fontWeight  : 500,
      paddingLeft : 16
    }
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className = {this.props.className}
        style     = {styles}>
        {this.props.children}
      </div>
    )
  }
});

export default Radium(React.createClass({

  displayName: 'ColumnCheckIcon',

  propTypes: {
    id              : React.PropTypes.string,
    color           : React.PropTypes.string,
    hoverColor      : React.PropTypes.string,
    handleIconClick : React.PropTypes.func,
    handleNameClick : React.PropTypes.func
  },

  statics :{
    Header: Header
  },

  getDefaultProps() {
    return {
      color      : 'black',
      hoverColor : MUI.Styles.Colors.blue600,
      className  : ColumnListConstans.DEFAULT_CLASSNAME.ICON_NAME
    }
  },

  getInitialState() {
    return {
      checked    : this.props.checked
    }
  },

  getStyles() {
    return {
      container: {
        display        : '-webkit-flex; display: flex',
        flexDirection   : 'row',
        alignItems      : 'center',
        fontSize        : 12,
        padding         : '16px 8px'
      },
      name: {
        fontSize        : 16,
        lineHeight      : '20px',
        display        : '-webkit-flex; display: flex',
        flexDirection   : 'column',
        justifyContent  : 'center',
        cursor          : 'pointer',
        color           : this.state.color,
        ':hover': {
          color : this.props.hoverColor
        }
      },
      icon : {
        margin          : 12,
        height          : 50,
        width           : 50,
        display         : 'flex',
        justifyContent  : 'center',
        alignItems      : 'center',
        background      : this.props.background
      }
    };
  },

  componentWillReceiveProps(newProps) {
    this.setState({checked: newProps.checked});
  },

  handleIconClick(id, state) {
    console.info('ColumnCheckIcon:handleClick');
    this.props.handleIconClick(id, state);
  },

  handleNameClick() {
    console.info('ColumnCheckIcon:handleClick');
    this.props.handleNameClick(this.props.id);
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className = {this.props.className}
        style     = {styles.container}>
        <MUI.Paper
          circle = {true}
          style  = {styles.icon} />
        <div
          style       = {styles.name}
          onClick     = {this.handleNameClick}>
          {this.props.children}
        </div>
      </div>
    );
  }
}));
