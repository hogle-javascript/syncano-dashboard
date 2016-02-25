import React from 'react';
import {Navigation, State} from 'react-router';
import Radium from 'radium';

import {DialogsMixin} from '../../mixins';
import {Styles} from 'syncano-material-ui';

import UsersActions from '../Users/UsersActions';
import UsersStore from '../Users/UsersStore';

import {ColumnList} from 'syncano-components';
import {Container, Lists, Dialog} from '../../common';
import ListItem from './DevicesListItem';
import GCMSendMessageDialog from './GCMDevices/GCMSendMessageDialog';
import APNSSendMessageDialog from './APNSDevices/APNSSendMessageDialog';

let Column = ColumnList.Column;

export default Radium(React.createClass({
  displayName: 'DevicesList',

  mixins: [
    Navigation,
    State,
    DialogsMixin
  ],

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

  getStyles() {
    return {
      listTitleContainer: {
        padding: '16px 8px'
      },
      listTitle: {
        fontSize: 18
      },
      moreLink: {
        color: Styles.Colors.blue500,
        cursor: 'pointer',
        ':hover': {
          textDecoration: 'underline'
        }
      }
    };
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

  sliceItems(items) {
    if (this.props.visibleItems) {
      return this.props.items.slice(0, this.props.visibleItems);
    }

    return items;
  },

  renderItem(item) {
    const icon = {
      apns: 'apple',
      gcm: 'android'
    };
    const userName = UsersStore.getUserById(item.user_id) ? UsersStore.getUserById(item.user_id).username : 'No user';

    item.userName = userName;

    return (
      <ListItem
        key={`devices-list-item-${item.registration_id}`}
        checkedItemsCount={this.props.getChekcedItems().length}
        actions={this.props.actions}
        onIconClick={this.props.actions.checkItem}
        icon={icon[this.props.type]}
        showSendMessageDialog={() => this.props.showSendMessagesDialog(item)}
        showEditDialog={() => this.props.actions.showDialog(item)}
        showDeleteDialog={() => this.showDialog('deleteDeviceDialog', item)}
        item={item}/>
    );
  },

  render() {
    const styles = this.getStyles();
    const checkedItems = this.props.getChekcedItems().length;
    const {items, ...other} = this.props;
    const titleText = {
      apns: 'iOS Devices',
      gcm: 'Android Devices'
    };
    const moreLink = (
      <span
        className="row align-center vp-3-t"
        onClick={() => this.transitionTo(`${this.props.type}-devices`, this.getParams())}
        key={`${this.props.type}-list`}
        style={styles.moreLink}>MORE DEVICES</span>
    );

    return (
      <div>
        <div style={styles.listTitleContainer}>
          <span style={styles.listTitle}>{titleText[this.props.type]}</span>
        </div>
        <GCMSendMessageDialog />
        <APNSSendMessageDialog />
        <Lists.Container>
          {this.getDialogs()}
          <ColumnList.Header>
            <Column.ColumnHeader
              columnName="CHECK_ICON"
              className="col-sm-14">
              Device
            </Column.ColumnHeader>
            <Column.ColumnHeader
              className="col-sm-13"
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
                singleItemText="Send message"
                multipleItemsText="Send messages"
                onTouchTap={this.props.showSendMessagesDialog}/>
              <Lists.MenuItem
                singleItemText="Delete a Device"
                multipleItemsText="Delete Devices"
                onTouchTap={() => this.showDialog('deleteDeviceDialog')}/>
            </Lists.Menu>
          </ColumnList.Header>
          <Lists.List
            {...other}
            items={this.sliceItems(items)}
            renderItem={this.renderItem}/>
          {this.isActive('all-push-notification-devices') && !this.props.isLoading ? moreLink : null}
        </Lists.Container>
      </div>
    );
  }
}));
