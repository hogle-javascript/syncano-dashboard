import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

import MUI from 'syncano-material-ui';

import CheckIcon from '../../../common/CheckIcon/CheckIcon';

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

  getDefaultProps() {
    return {
      color: 'black',
      icon: ColumnListConstans.DEFAULT_ICON,
      background: ColumnListConstans.DEFAULT_BACKGROUND,
      hoverColor: MUI.Styles.Colors.blue600,
      className: ColumnListConstans.DEFAULT_CLASSNAME.CHECK_ICON,
      checkable: true,
      checked: false
    };
  },

  getStyles() {
    return {
      container: {
        display: '-webkit-flex; display: flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12,
        padding: ColumnListConstans.DEFAULT_CELL_PADDING
      },
      name: {
        fontSize: 16,
        lineHeight: '20px',
        display: '-webkit-flex; display: flex',
        flexDirection: 'column',
        justifyContent: 'center',
        wordBreak: 'break-all',
        flex: 1,
        color: this.state.color
      },
      link: {
        cursor: 'pointer',
        pointerEvents: 'auto',
        ':hover': {
          color: this.props.hoverColor
        }
      }
    };
  },

  handleIconClick(id, state, keyName) {
    console.info('ColumnCheckIcon:handleClick');
    this.props.handleIconClick(id, state, keyName);
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
          icon={this.props.icon}
          keyName={this.props.keyName}
          background={this.props.background}
          checked={this.props.checked}
          handleClick={this.handleIconClick}
          checkable={this.props.checkable}/>
        <div style={styles.name}>
          {this.props.children}
        </div>
      </div>
    );
  }
}));
