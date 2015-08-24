import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

import MUI from 'material-ui';

import CheckIcon from '../../../common/CheckIcon/CheckIcon.react';

let Header = React.createClass({

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.CHECK_ICON
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

  displayName: 'ColumnCheckIcon',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    checkable: React.PropTypes.bool,
    handleIconClick: React.PropTypes.func,
    handleNameClick: React.PropTypes.func
  },

  statics: {
    Header
  },

  getDefaultProps() {
    return {
      color: 'black',
      hoverColor: MUI.Styles.Colors.blue600,
      className: ColumnListConstans.DEFAULT_CLASSNAME.CHECK_ICON,
      checkable: true
    }
  },

  getInitialState() {
    return {
      checked: this.props.checked
    }
  },

  getStyles() {
    return {
      container: {
        display: '-webkit-flex; display: flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12,
        padding: '16px 8px'
      },
      name: {
        fontSize: 16,
        lineHeight: '20px',
        display: '-webkit-flex; display: flex',
        flexDirection: 'column',
        justifyContent: 'center',
        wordBreak: 'break-all',
        pointerEvents: 'none',
        color: this.state.color
      },
      link: {
        cursor: 'pointer',
        pointerEvents: 'auto',
        ':hover': {
          color: this.props.hoverColor
        }
      }
    }
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
    if (typeof this.props.handleNameClick === 'function') {
      this.props.handleNameClick(this.props.id);
    }
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className={this.props.className}
        style={styles.container}>
        <CheckIcon
          id={this.props.id}
          icon={this.props.icon || ColumnListConstans.DEFAULT_ICON}
          background={this.props.background || ColumnListConstans.DEFAULT_BACKGROUND}
          checked={this.state.checked}
          handleClick={this.handleIconClick}
          checkable={this.props.checkable}/>

        <div
          style={styles.name}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseLeave}>
          {this.props.children}
        </div>
      </div>
    );
  }
}));
