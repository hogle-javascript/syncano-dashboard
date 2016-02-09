import React from 'react';

import {DialogsMixin} from '../../mixins';

import UsersActions from '../Users/UsersActions';
import UsersStore from '../Users/UsersStore';

import {ColumnList} from 'syncano-components';
import {Container, Lists, Dialog} from '../../common';
import ListItem from './DevicesListItem';
import GCMSendMessageDialog from './GCMDevices/GCMSendMessageDialog';
import APNSSendMessageDialog from './APNSDevices/APNSSendMessageDialog';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DevicesList',

  mixins: [DialogsMixin],

  getInitialState() {
    return {
      clickedDevice: null
    };
  },

  componentWillMount() {
    UsersActions.fetch();
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
        handleConfirm: this.props.actions.removeDevices,
        isLoading: this.props.isLoading,
        items: this.props.getChekcedItems(),
        groupName: 'Device',
        itemLabelName: 'label'
      }
    }];
  },

  showSendMessageDialog(item) {
    const showSendMessageDialog = {
      GCM: () => this.showDialog('GCMSendMessageDialog'),
      APNS: () => this.showDialog('APNSSendMessageDialog')
    };

    this.setState({clickedDevice: item}, showSendMessageDialog[this.props.type]);
  },

  renderItem(item) {
    const userName = UsersStore.getUserById(item.user_id) ? UsersStore.getUserById(item.user_id).username : 'No user';

    item.userName = userName;

    return (
      <ListItem
        key={`devices-list-item-${item.registration_id}`}
        actions={this.props.actions}
        onIconClick={this.props.actions.checkItem}
        icon={this.props.listItemIcon}
        showSendMessageDialog={() => this.showSendMessageDialog(item)}
        showEditDialog={() => this.props.actions.showDialog(item)}
        showDeleteDialog={() => this.showDialog('deleteDeviceDialog', item)}
        item={item}/>
    );
  },

  render() {
    let checkedItems = this.props.getChekcedItems().length;

    return (
      <div>
        <GCMSendMessageDialog
          item={this.state.clickedDevice}
          ref="GCMSendMessageDialog"/>
        <APNSSendMessageDialog
          item={this.state.clickedDevice}
          ref="APNSSendMessageDialog"/>
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
              actions={this.props.actions}>
              <Lists.MenuItem
                singleItemText="Delete a Device"
                multipleItemsText="Delete Devices"
                onTouchTap={() => this.showDialog('deleteDeviceDialog')}/>
            </Lists.Menu>
          </ColumnList.Header>
          <Lists.List
            {...this.props}
            renderItem={this.renderItem}/>
        </Lists.Container>
      </div>
    );
  }
});
