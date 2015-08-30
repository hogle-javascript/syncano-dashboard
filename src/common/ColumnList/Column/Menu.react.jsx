import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

import MUI from 'material-ui';

let Header = React.createClass({

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.MENU
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

  displayName: 'ColumnDesc',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  statics: {
    Header
  },

  getDefaultProps() {
    return {
      color: 'rgba(0,0,0,.54)',
      hoverColor: MUI.Styles.Colors.blue600,
      className: ColumnListConstans.DEFAULT_CLASSNAME.MENU
    };
  },

  getInitialState() {
    return {
      color: this.props.color,
      hoverColor: this.props.hoverColor
    }
  },

  getStyles() {
    return {
      display: '-webkit-flex; display: flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      fontSize: 13,
      lineHeight: '16px',
      padding: '16px 8px',
      wordBreak: 'break-all',
      color: this.props.color
    }
  },

  handleClick() {
    this.props.handleClick(this.props.id);
  },

  renderItemIconMenuButton() {
    return (
      <MUI.IconButton
        touch={true}
        tooltipPosition='bottom-left'
        iconClassName='synicon-dots-vertical'/>
    )
  },

  handleTouchTap(event) {
    event.stopPropagation();
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className={this.props.className}
        style={styles}>
        <MUI.IconMenu
          onTouchTap={this.handleTouchTap}
          iconButtonElement={this.renderItemIconMenuButton()}>
          {this.props.children}
        </MUI.IconMenu>
      </div>
    );
  }
}));
