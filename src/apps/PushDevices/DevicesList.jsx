import React from 'react';

import {DialogMixin, DialogsMixin} from '../../mixins';

import {ColumnList, Loading} from 'syncano-components';
import {Container, Lists, Dialog} from '../../common';
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
        handleConfirm: this.props.actions.removeDevices,
        isLoading: this.props.isLoading,
        items: this.props.getChekcedItems(),
        groupName: 'Device',
        itemLabelName: 'label'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`devices-list-item-${item.registration_id}`}
        onIconClick={this.props.actions.checkItem}
        icon={this.props.listItemIcon}
        showEditDialog={this.props.actions.showDialog}
        showDeleteDialog={this.showDialog.bind(null, 'deleteDeviceDialog', item)}
        item={item}/>
    );
  },

  render() {
    let checkedItems = this.props.getChekcedItems().length;

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
              actions={this.props.actions}>
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
