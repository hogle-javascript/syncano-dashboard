import React from 'react';
import Router from 'react-router';

// Utils
import {IsLoadingMixin, DialogsMixin} from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './InstancesActions';
import Store from './InstancesStore';
import SessionStore from '../Session/SessionStore';

import ListItem from './InstancesListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'SharedInstancesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    IsLoadingMixin({attr: 'state.items'}),
    DialogsMixin
  ],

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteSharedInstanceDialog',
        ref: 'deleteSharedInstanceDialog',
        title: 'Leave shared Instance',
        handleConfirm: Actions.removeSharedInstance,
        isLoading: this.props.isLoading,
        actionName: 'leave',
        items: Store.getCheckedItems(),
        groupName: 'Instance'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`shared-instances-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteSharedInstanceDialog', item, SessionStore.getUser().id)}/>
    );
  },

  renderLoaded() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className='instances-list'>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Leave an Instance"
                multipleItemsText="Leave Instances"
                onTouchTap={() => this.showDialog('deleteSharedInstanceDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="shared-instances-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
