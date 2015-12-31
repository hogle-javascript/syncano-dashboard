import React from 'react';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './InstancesActions';
import Store from './InstancesStore';
import SessionStore from '../Session/SessionStore';

import ListItem from './InstancesListItem';
import {Dialog, ColumnList, Lists, ColorIconPicker} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'SharedInstancesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.IsLoading({attr: 'state.items'}),
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  getInitialState() {
    return {};
  },

  handleChangePalette(color, icon) {
    console.info('Instances::handleChangePalette', color, icon);
    let metadata = JSON.stringify({color, icon});

    Actions.updateInstance(Store.getClickedItem().name, {metadata});
    Actions.uncheckAll();
  },

  initDialogs() {
    let clickedItem = Store.getClickedItemIconColor();

    return [
      {
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
      },
      {
        dialog: ColorIconPicker.Dialog,
        params: {
          key: 'pickColorIconDialog',
          ref: 'pickColorIconDialog',
          mode: 'add',
          initialColor: clickedItem.color,
          initialIcon: clickedItem.icon,
          handleClick: this.handleChangePalette
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`shared-instances-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={this.showDialog.bind(null, 'deleteSharedInstanceDialog', item, SessionStore.getUser().id)}
        showCustomizeDialog={this.showDialog.bind(null, 'pickColorIconDialog')}/>
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
                onTouchTap={this.showDialog.bind(null, 'deleteSharedInstanceDialog')}/>
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