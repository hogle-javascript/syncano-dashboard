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
import {Dialog, ColumnList, Lists} from '../../common';

let Column = ColumnList.Column;

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
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeGroupDialog',
        ref: 'removeGroupDialog',
        title: 'Delete a Group',
        handleConfirm: this.handleRemoveGroups,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Group'
      }
    }];
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
      <Lists.Container className="groups-list">
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <ColumnList.Header>
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
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Group"
                multipleItemsText="Delete Groups"
                onTouchTap={this.showDialog.bind(null, 'removeGroupDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
}));

