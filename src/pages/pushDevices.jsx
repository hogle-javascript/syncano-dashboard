import React from 'react';
import {RouteHandler, State} from 'react-router';
import Helmet from 'react-helmet';

import APNSDevicesActions from '../../src/apps/PushDevices/APNSDevices/APNSDevicesActions';
import GCMDevicesActions from '../../src/apps/PushDevices/GCMDevices/GCMDevicesActions';

import {ListItem, FontIcon, RaisedButton, Styles} from 'syncano-material-ui';
import {Popover} from '../common/';
import {InnerToolbar} from '../common/';

export default React.createClass({
  displayName: 'PushDevicesPage',

  mixins: [State],

  handleAddDevice(type) {
    const addDevice = {
      'apns-devices': APNSDevicesActions.showDialog,
      'gcm-devices': GCMDevicesActions.showDialog
    };

    addDevice[type]();
    this.refs.addDevicePopover.hide();
  },

  handleTouchTapAddIcon(event) {
    if (this.isActive('all-push-notification-devices') && this.refs.addDevicePopover) {
      this.refs.addDevicePopover.toggle(event);
    } else {
      this.handleAddDevice(this.getRoutes()[this.getRoutes().length - 1].name);
    }
  },

  render() {
    const title = 'Push Notification Devices (BETA)';

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar title={title}>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={this.handleTouchTapAddIcon}/>
          <Popover
            ref="addDevicePopover"
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            style={{padding: '8px 0'}}>
            <ListItem
              leftIcon={
                <FontIcon
                  color={Styles.Colors.green400}
                  className="synicon-android"
                />
              }
              onTouchTap={() => this.handleAddDevice('gcm-devices')}
              primaryText="Android Device"/>
            <ListItem
              leftIcon={<FontIcon color={Styles.Colors.black} className="synicon-apple"/>}
              onTouchTap={() => this.handleAddDevice('apns-devices')}
              primaryText="iOS Device"/>
          </Popover>
        </InnerToolbar>
        <RouteHandler />
      </div>
    );
  }
});
