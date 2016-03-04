import React from 'react';
import Router from 'react-router';
import Radium from 'radium';

import Actions from './GroupsActions';
import Store from './GroupsStore';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import ListItem from './GroupsListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default Radium(React.createClass({
  displayName: 'GroupsList',

  mixins: [
    Router.State,
    Router.Navigation,
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
        showDeleteDialog={() => this.showDialog('removeGroupDialog', item)} />
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
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Group"
                multipleItemsText="Delete Groups"
                onTouchTap={() => this.showDialog('removeGroupDialog')} />
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

