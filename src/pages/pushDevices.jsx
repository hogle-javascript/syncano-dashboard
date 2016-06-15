import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import APNSDevicesActions from '../../src/apps/PushDevices/APNSDevices/APNSDevicesActions';
import GCMDevicesActions from '../../src/apps/PushDevices/GCMDevices/GCMDevicesActions';
import APNSDevicesStore from '../../src/apps/PushDevices/APNSDevices/APNSDevicesStore';
import GCMDevicesStore from '../../src/apps/PushDevices/GCMDevices/GCMDevicesStore';

import { ListItem, FontIcon, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Popover, InnerToolbar } from '../common/';

const PushDevicesPage = React.createClass({
  displayName: 'PushDevicesPage',

  contextTypes: {
    params: React.PropTypes.object,
    routes: React.PropTypes.array
  },

  mixins: [
    Reflux.connect(APNSDevicesStore, 'apnsDevices'),
    Reflux.connect(GCMDevicesStore, 'gcmDevices')
  ],

  handleAddDevice(type) {
    const addDevice = {
      'apns-devices': APNSDevicesActions.showDialog,
      'gcm-devices': GCMDevicesActions.showDialog
    };

    addDevice[type]();
    this.refs.addDevicePopover.hide();
  },

  handleTouchTapAddIcon(event) {
    const { params, routes } = this.context;
    const { router } = this.props;

    if (router.isActive({ name: 'all-push-notification-devices', params }, true) && this.refs.addDevicePopover) {
      this.refs.addDevicePopover.toggle(event);
    } else {
      this.handleAddDevice(routes[routes.length - 1].name);
    }
  },

  renderAddButton() {
    const { routes } = this.context;
    const hasGCMConfig = this.state.gcmDevices.hasConfig;
    const hasAPNSConfig = this.state.apnsDevices.hasConfig;
    const disableMap = {
      'all-push-notification-devices': !hasAPNSConfig && !hasGCMConfig,
      'apns-devices': !hasAPNSConfig,
      'gcm-devices': !hasGCMConfig
    };

    return (
      <RaisedButton
        disabled={disableMap[routes[routes.length - 1].name]}
        label="Add"
        primary
        style={{ marginRight: 0 }}
        onTouchTap={this.handleTouchTapAddIcon}
      />
    );
  },

  render() {
    const { children } = this.props;
    const title = 'Push Notification Devices (BETA)';
    const hasGCMConfig = this.state.gcmDevices.hasConfig;
    const hasAPNSConfig = this.state.apnsDevices.hasConfig;

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar title={title}>
          {this.renderAddButton()}
          <Popover
            ref="addDevicePopover"
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            style={{ padding: '8px 0' }}
          >
            <ListItem
              style={!hasGCMConfig && { color: '#AAA' }}
              disabled={!hasGCMConfig}
              leftIcon={
                <FontIcon
                  style={{ color: !hasGCMConfig ? '#AAA' : Colors.green400 }}
                  className="synicon-android"
                />
              }
              onTouchTap={() => this.handleAddDevice('gcm-devices')}
              primaryText="Android Device"
            />
            <ListItem
              style={!hasAPNSConfig && { color: '#AAA' }}
              disabled={!hasAPNSConfig}
              leftIcon={
                <FontIcon
                  style={{ color: !hasAPNSConfig ? '#AAA' : Colors.black }}
                  className="synicon-apple"
                />
              }
              onTouchTap={() => this.handleAddDevice('apns-devices')}
              primaryText="iOS Device"
            />
          </Popover>
        </InnerToolbar>
        {children}
      </div>
    );
  }
});

export default withRouter(PushDevicesPage);
