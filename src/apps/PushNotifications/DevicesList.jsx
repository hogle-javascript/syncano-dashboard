import React from 'react';

import Mixins from '../../mixins';
import Actions from './DevicesActions';
import GCMDevicesStore from './GCMDevicesStore';
import APNsDevicesStore from './APNsDevicesStore';

import {ColumnList, Container, Lists, Loading, Dialog} from '../../common';
import ListItem from './DevicesListItem';

let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'DevicesList',

  mixins: [
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteDeviceDialog',
        ref: 'deleteDeviceDialog',
        title: 'Delete a Device',
        handleConfirm: this.props.isIOSDevice ? Actions.removeAPNsDevices : Actions.removeGCMDevices,
        isLoading: this.props.isLoading,
        items: this.props.isIOSDevice ? APNsDevicesStore.getCheckedItems() : GCMDevicesStore.getCheckedItems(),
        groupName: 'Device',
        itemLabelName: 'label'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        icon={this.props.isIOSDevice ? 'apple' : 'android'}
        showDeleteDialog={this.showDialog.bind(null, 'deleteDeviceDialog', item)}
        item={item}/>
    );
  },

  render() {
    console.error(APNsDevicesStore.getCheckedItems());
    let checkedGCMCount = GCMDevicesStore.getNumberOfChecked();
    let checkedAPNsCount = APNsDevicesStore.getNumberOfChecked();
    let checkedItems = this.props.isIOSDevice ? checkedAPNsCount : checkedGCMCount;

    return (
      <div>
        <Lists.Container>
          {this.getDialogs()}
          <ColumnList.Header>
            <Column.ColumnHeader
              primary={true}
              columnName="CHECK_ICON"
              className="col-xs-14">
              Device
            </Column.ColumnHeader>
            <Column.ColumnHeader
              className="col-xs-13"
              columnName="DESC">
              User
            </Column.ColumnHeader>
            <Column.ColumnHeader columnName="DESC">
              Active
            </Column.ColumnHeader>
            <Column.ColumnHeader columnName="DATE">
              Registered
            </Column.ColumnHeader>
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Device"
                multipleItemsText="Delete Devices"
                onTouchTap={this.showDialog.bind(null, 'deleteDeviceDialog')}/>
            </Lists.Menu>
          </ColumnList.Header>
          <Loading show={this.props.isLoading}>
            <Lists.List
              {...this.props}
              renderItem={this.renderItem}/>
          </Loading>
        </Lists.Container>
      </div>
    );
  }
});
