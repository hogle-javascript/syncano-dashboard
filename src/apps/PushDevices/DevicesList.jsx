import React from 'react';

import {Dialog as DialogMixin, Dialogs as DialogsMixin} from '../../mixins';
import Actions from './DevicesActions';
import GCMDevicesStore from './GCMDevices/GCMDevicesStore';
import APNSDevicesStore from './APNSDevices/APNSDevicesStore';

import {ColumnList, Container, Lists, Loading, Dialog} from '../../common';
import ListItem from './DevicesListItem';

let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'DevicesList',

  mixins: [
    DialogMixin,
    DialogsMixin
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteDeviceDialog',
        ref: 'deleteDeviceDialog',
        title: 'Delete a Device',
        handleConfirm: this.props.isAPNS ? Actions.removeAPNSDevices : Actions.removeGCMDevices,
        isLoading: this.props.isLoading,
        items: this.props.isAPNS ? APNSDevicesStore.getCheckedItems() : GCMDevicesStore.getCheckedItems(),
        groupName: 'Device',
        itemLabelName: 'label'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`devices-list-item-${item.registration_id}`}
        onIconClick={Actions.checkItem}
        icon={this.props.isAPNS ? 'apple' : 'android'}
        showDeleteDialog={this.showDialog.bind(null, 'deleteDeviceDialog', item)}
        item={item}/>
    );
  },

  render() {
    let checkedGCMCount = GCMDevicesStore.getNumberOfChecked();
    let checkedAPNSCount = APNSDevicesStore.getNumberOfChecked();
    let checkedItems = this.props.isAPNS ? checkedAPNSCount : checkedGCMCount;

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
