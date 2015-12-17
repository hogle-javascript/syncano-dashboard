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

  getStyles() {
    return {
      list: {
        padding: 0,
        background: 'none'
      }
    };
  },

  handleItemIconClick(id, state) {
    console.info('InstancesList::handleItemIconClick', id, state);
    Actions.checkItem(id, state);
  },

  handleChangePalette(color, icon) {
    console.info('Instances::handleChangePalette', color, icon);
    let metadata = JSON.stringify({color, icon});

    Actions.updateInstance(Store.getClickedItem().name, {metadata});
    Actions.uncheckAll();
  },

  handleDeleteShared() {
    console.info('Instances::handleDeleteShared');
    Actions.removeSharedInstance(Store.getCheckedItems(), SessionStore.getUser().id);
  },

  // Dialogs config
  initDialogs() {
    let clickedItem = Store.getClickedItemIconColor();

    return [
      {
        dialog: Dialog.Delete,
        params: {
          key: 'deleteSharedInstanceDialog',
          ref: 'deleteSharedInstanceDialog',
          title: 'Leave shared Instance',
          handleConfirm: this.handleDeleteShared,
          isLoading: this.props.isLoading,
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
    let removeSharedInstance = Actions.removeSharedInstance.bind(null, [item], SessionStore.getUser().id);

    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.name, removeSharedInstance)}
        showCustomizeDialog=""/>
    );
  },

  renderLoaded() {
    let checkedItems = Store.getNumberOfChecked();
    let styles = this.getStyles();

    return (
      <Lists.Container className='instances-list'>
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
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
          style={styles.list}
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
