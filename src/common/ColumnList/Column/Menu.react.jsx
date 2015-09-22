import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

import Actions from './MenuActions';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'ColumnDesc',

  propTypes: {
    id: React.PropTypes.string,
    item: React.PropTypes.object,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
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

  handleTouchTap(event) {
    event.stopPropagation();
    Actions.clearClickedItem();
    Actions.setClickedItem(this.props.item);
  },

  renderItemIconMenuButton() {
    return (
      <MUI.IconButton
        touch={true}
        tooltipPosition='bottom-left'
        iconClassName='synicon-dots-vertical'/>
    )
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
