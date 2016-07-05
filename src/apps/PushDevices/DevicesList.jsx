import React from 'react';
import { withRouter } from 'react-router';
import Radium from 'radium';

import { DialogsMixin } from '../../mixins';

import UsersActions from '../Users/UsersActions';
import UsersStore from '../Users/UsersStore';
import APNSSocketActions from '../PushNotifications/APNS/APNSPushNotificationsActions';
import GCMSocketActions from '../PushNotifications/GCM/GCMPushNotificationsActions';

import { colors as Colors } from 'material-ui/styles/';
import { IconButton } from 'material-ui';
import { ColumnList, Loading, Container, Lists, Dialog, ShowMore } from '../../common/';
import ListItem from './DevicesListItem';
import NoConfigView from './NoConfigView';
import GCMSendMessageDialog from './GCMDevices/GCMSendMessageDialog';
import APNSSendMessageDialog from './APNSDevices/APNSSendMessageDialog';

const Column = ColumnList.Column;

const DevicesList = Radium(React.createClass({
  displayName: 'DevicesList',

  contextTypes: {
    params: React.PropTypes.object
  },

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

  getStyles() {
    return {
      listTitleContainer: {
        padding: '16px 8px'
      },
      listTitle: {
        fontSize: 18,
        color: Colors.grey400
      },
      moreLink: {
        color: Colors.blue500,
        cursor: 'pointer',
        ':hover': {
          textDecoration: 'underline'
        }
      }
    };
  },

  initDialogs() {
    const { actions, isLoading, getCheckedItems } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteDeviceDialog',
        ref: 'deleteDeviceDialog',
        title: 'Delete a Device',
        handleConfirm: actions.removeDevices,
        items: getCheckedItems(),
        groupName: 'Device',
        itemLabelName: 'label',
        isLoading
      }
    }];
  },

  sliceItems(devices) {
    const { visibleItems, items } = this.props;

    if (visibleItems) {
      return items.slice(0, visibleItems);
    }

    return devices;
  },

  renderItem(item) {
    const { actions, type } = this.props;
    const icon = {
      apns: 'apple',
      gcm: 'android'
    };
    const userName = UsersStore.getUserById(item.user) ? UsersStore.getUserById(item.user).username : 'No user';

    item.userName = userName;

    return (
      <ListItem
        key={`devices-list-item-${item.registration_id}`}
        actions={actions}
        onIconClick={actions.checkItem}
        icon={icon[type]}
        showEditDialog={() => actions.showDialog(item)}
        showDeleteDialog={() => this.showDialog('deleteDeviceDialog', item)}
        item={item}
      />
    );
  },

  render() {
    const { params } = this.context;
    const styles = this.getStyles();
    const {
      hasConfig,
      items,
      getCheckedItems,
      type,
      actions,
      isLoading,
      router,
      ...other
    } = this.props;
    const checkedItemsCount = getCheckedItems().length;
    const typeMap = {
      apns: {
        title: 'iOS Devices',
        showConfigDialog: APNSSocketActions.showDialog
      },
      gcm: {
        title: 'Android Devices',
        showConfigDialog: GCMSocketActions.showDialog
      }
    };
    const title = (
      <div
        className="row align-middle"
        style={styles.listTitle}
      >
        <div>
          {typeMap[type].title}
        </div>
        <IconButton
          tooltip={`Config ${type.toUpperCase()} Push Notification Socket`}
          iconStyle={{ color: Colors.blue400 }}
          iconClassName="synicon-settings"
          onTouchTap={typeMap[type].showConfigDialog}
        />
      </div>
    );
    const moreLink = (
      <ShowMore
        label="MORE DEVICES"
        visible={items.length > 3}
        routeName={`${type}-devices`}
        params={params}
      />
    );

    if (!hasConfig && !isLoading) {
      return (
        <div style={styles.listTitleContainer}>
          {title}
          <NoConfigView type={type} />
        </div>
      );
    }

    return (
      <div>
        <div style={styles.listTitleContainer}>
          {title}
        </div>
        <GCMSendMessageDialog />
        <APNSSendMessageDialog />
        <Loading show={isLoading}>
          <Lists.Container>
            {this.getDialogs()}
            <ColumnList.Header>
              <Column.ColumnHeader
                columnName="CHECK_ICON"
                className="col-sm-14"
              >
                Device
              </Column.ColumnHeader>
              <Column.ColumnHeader
                columnName="DESC"
                className="col-sm-6"
              >
                Metadata
              </Column.ColumnHeader>
              <Column.ColumnHeader columnName="DESC">
                User
              </Column.ColumnHeader>
              <Column.ColumnHeader columnName="DESC">
                Active
              </Column.ColumnHeader>
              <Column.ColumnHeader columnName="DATE">
                Registered
              </Column.ColumnHeader>
              <Lists.Menu
                checkedItemsCount={checkedItemsCount}
                handleSelectAll={actions.selectAll}
                handleUnselectAll={actions.uncheckAll}
              >
                <Lists.MenuItem onTouchTap={() => this.showDialog('deleteDeviceDialog')} />
              </Lists.Menu>
            </ColumnList.Header>
            <Lists.List
              {...other}
              items={this.sliceItems(items)}
              renderItem={this.renderItem}
            />
            {router.isActive({ name: 'all-push-notification-devices', params }, true) && !isLoading ? moreLink : null}
          </Lists.Container>
        </Loading>
      </div>
    );
  }
}));

export default withRouter(DevicesList);
