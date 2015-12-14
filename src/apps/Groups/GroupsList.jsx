import React from 'react';
import Router from 'react-router';
import Radium from 'radium';

import Actions from './GroupsActions';
import Store from './GroupsStore';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from'../Header/HeaderMixin';

// Components
import ListItem from './GroupsListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default Radium(React.createClass({

  displayName: 'GroupsList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Users::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleRemoveGroups() {
    console.info('Users::handleDeleteGroups');
    Actions.removeGroups(Store.getCheckedItems());
  },

  initDialogs() {
    let checkedItems = Store.getCheckedItems();

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
              onClick: this.handleCancel.bind(null, 'removeGroupDialog')
            },
            {
              text: 'Confirm',
              onClick: this.handleRemoveGroups
            }
          ],
          modal: true,
          children: [
            `Do you really want to delete ${Store.getDeleteItemsPhrase('Group')}?`,
            this.getDialogList(checkedItems, 'label'),
            <Common.Loading
              type='linear'
              position='bottom'
              show={this.props.isLoading}/>
          ]
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.label, Actions.removeGroups.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container className="groups-list">
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-flex-1">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader
            className="col-sm-4"
            columnName="ID">
            ID
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Common.Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Common.Lists.MenuItem
                singleItemText="Delete a Group"
                multipleItemsText="Delete Groups"
                onTouchTap={this.showDialog.bind(null, 'removeGroupDialog')}/>
            </Common.Lists.Menu>
          </Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List
          {...this.props}
          renderItem={this.renderItem}/>
      </Common.Lists.Container>
    );
  }
}));

