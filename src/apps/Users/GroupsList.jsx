import React from 'react';
import Router from 'react-router';
import Radium from 'radium';
import _ from 'lodash';

import Actions from './GroupsActions';
import Store from './GroupsStore';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from'../Header/HeaderMixin';

// Components
import MUI from 'syncano-material-ui';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

export default Radium(React.createClass({

  displayName: 'GroupsList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialogs
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Users::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  getStyles() {
    return {
      list: {
        paddingTop: 0,
        paddingBottom: 0
      },
      listItemChecked: {
        background: MUI.Styles.Colors.lightBlue50
      }
    };
  },

  handleRemoveGroups() {
    console.info('Users::handleDeleteGroups');
    Actions.removeGroups(Store.getCheckedItems());
  },

  handleCancelGroupsDialog() {
    Actions.uncheckAll();
    this.refs.removeGroupDialog.dismiss();
  },

  showGroupDeleteDialog(group) {
    group.checked = true;
    this.showDialog('removeGroupDialog');
  },

  initDialogs() {
    return [
      {
        dialog: Common.Dialog,
        params: {
          key: 'removeGroupDialog',
          ref: 'removeGroupDialog',
          title: 'Delete a Group',
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancelGroupsDialog
            },
            {
              text: 'Confirm',
              onClick: this.handleRemoveGroups
            }
          ],
          modal: true,
          children: [
            'Do you really want to delete this Group?',
            <Common.Loading
              type='linear'
              position='bottom'
              show={this.props.isLoading}/>
          ]
        }
      }
    ];
  },

  renderItemIconMenuButton() {
    return (
      <MUI.IconButton
        touch={true}
        tooltipPosition='bottom-left'
        iconClassName='synicon-dots-vertical'/>
    );
  },

  renderItemIconMenu(item) {
    return (
      <MUI.IconMenu
        iconButtonElement={this.renderItemIconMenuButton()}
        anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
        <MenuItem onTouchTap={this.props.handleGroupAddUser.bind(null, item)}>Add User</MenuItem>
        <MenuItem onTouchTap={this.props.handleGroupEdit.bind(null, item)}>Edit Group</MenuItem>
        <MenuItem onTouchTap={this.showGroupDeleteDialog.bind(null, item)}>Delete</MenuItem>
      </MUI.IconMenu>
    );
  },

  renderItem(item) {
    let itemActive = this.props.activeGroup && this.props.activeGroup.id === item.id;
    let styles = this.getStyles();
    let itemStyles = itemActive ? styles.listItemChecked : {};

    return (
      <MUI.ListItem
        key={item.id}
        innerDivStyle={itemStyles}
        onMouseDown={this.props.handleItemClick.bind(null, item)}
        secondaryText={`ID: ${item.id}`}
        rightIconButton={this.renderItemIconMenu(item)}>
        {item.label}
      </MUI.ListItem>
    );
  },

  renderList() {
    let styles = this.getStyles();
    let items = this.props.items;
    let itemsCount = items.length;
    let indexOfListItem = itemsCount - 1;
    let listItems = items.map((item, index) => {
      if (index < indexOfListItem) {
        return [
          this.renderItem(item),
          <MUI.ListDivider />
        ];
      }
      return this.renderItem(item);
    });

    if (!_.isEmpty(items)) {
      return (
        <MUI.List
          style={styles.list}
          zDepth={1}>
          {listItems}
        </MUI.List>
      );
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    );
  },

  render() {
    return (
      <div>
        {this.getDialogs()}
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-flex-1">
            {this.props.name}
          </Common.ColumnList.Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Loading show={this.props.isLoading}>
          {this.renderList()}
        </Common.Loading>
      </div>
    );
  }
}));

