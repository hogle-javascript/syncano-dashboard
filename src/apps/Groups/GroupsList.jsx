import React from 'react';
import Router from 'react-router';
import Radium from 'radium';

import Actions from './GroupsActions';
import Store from './GroupsStore';

// Utils
import {DialogsMixin} from '../../mixins';
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
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('Users::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeGroupDialog',
        ref: 'removeGroupDialog',
        title: 'Delete a Group',
        handleConfirm: Actions.removeGroups,
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
        key={`groups-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={this.showDialog.bind(null, 'removeGroupDialog', item)}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="groups-list">
        {this.getDialogs()}
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
          key="groups-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
}));

