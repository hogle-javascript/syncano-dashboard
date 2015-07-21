import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';
import Radium from 'radium';
import MUI from 'material-ui';

    // Utils
import HeaderMixin from'../Header/HeaderMixin';
import ButtonActionMixin from'../../mixins/ButtonActionMixin';

    // Stores and Actions
import SessionActions from '../Session/SessionActions';
import GroupsActions from './GroupsActions';
import GroupsStore from './GroupsStore';

    // Components
import Common from '../../common';

module.exports = Radium(React.createClass({

  displayName: 'GroupsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      items     : this.props.items,
      isLoading : this.props.isLoading
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items     : nextProps.items,
      isLoading : nextProps.isLoading
    })
  },

  handleIconMenuButtonClick(event) {
    event.stopPropagation();
  },

  getStyles() {
    return {
      list: {
        paddingTop    : 0,
        paddingBottom : 0
      },
      listItemChecked: {
        background: MUI.Styles.Colors.lightBlue50
      }
    }
  },

  renderItem(item) {
    let itemActive        = this.props.activeGroup && this.props.activeGroup.id === item.id,
        styles            = this.getStyles(),
        itemStyles        = itemActive ? styles.listItemChecked : {},
        iconButtonElement = <MUI.IconButton
                                touch           = {true}
                                tooltipPosition = 'bottom-left'
                                iconClassName   = 'synicon-dots-vertical'
                            />,
        rightIconMenu = (
      <MUI.IconMenu iconButtonElement={iconButtonElement}>
        <MUI.MenuItem onTouchTap={this.props.handleGroupAddUser.bind(null, item)}>Add User</MUI.MenuItem>
        <MUI.MenuItem onTouchTap={this.props.handleGroupEdit.bind(null, item)}>Edit Group</MUI.MenuItem>
        <MUI.MenuItem onTouchTap={this.props.handleGroupDelete.bind(null, item)}>Delete</MUI.MenuItem>
      </MUI.IconMenu>
    );

    return (
      <MUI.ListItem
        key             = {item.id}
        innerDivStyle   = {itemStyles}
        onMouseDown     = {this.props.handleItemClick.bind(null, item)}
        rightIconButton = {rightIconMenu}
      >
        {item.label}
      </MUI.ListItem>
    )
  },

  getList() {
    let styles          = this.getStyles(),
        items           = this.state.items,
        itemsCount      = items.length,
        indexOfListItem = itemsCount - 1,
        listItems       = this.state.items.map((item, index) => {
          if (index < indexOfListItem) {
            return [
              this.renderItem(item),
              <MUI.ListDivider />
            ];
          }
          return this.renderItem(item);
        });

    if (items.length > 0) {
      return (
        <MUI.List
          style  = {styles.list}
          zDepth = {1}
        >
          {listItems}
        </MUI.List>
      );
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    )
  },

  render() {
    return (
      <div>
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.CheckIcon.Header className="col-flex-1">{this.props.name}</Common.ColumnList.Column.CheckIcon.Header>
        </Common.ColumnList.Header>
        <Common.Loading show={this.state.isLoading}>
          {this.getList()}
        </Common.Loading>
      </div>
    );
  }
}));

