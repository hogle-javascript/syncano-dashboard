import React from 'react';
import {RouteHandler, State} from 'react-router';

import APNSDevicesActions from '../../src/apps/PushDevices/APNSDevices/APNSDevicesActions';
import GCMDevicesActions from '../../src/apps/PushDevices/GCMDevices/GCMDevicesActions';

import {Popover, ListItem, FontIcon, Styles} from 'syncano-material-ui';
import {Socket} from 'syncano-components';
import {InnerToolbar} from '../common';

export default React.createClass({

  displayName: 'PushDevicesPage',

  mixins: [State],

  getInitialState() {
    return {
      popoverVisible: false
    };
  },

  handleAddDevice(type) {
    const addDevice = {
      'apns-devices': APNSDevicesActions.showDialog,
      'gcm-devices': GCMDevicesActions.showDialog
    };

    addDevice[type]();
    this.hidePopover();
  },

  hidePopover() {
    this.setState({
      popoverVisible: false
    });
  },

  togglePopover(event) {
    this.setState({
      popoverVisible: !this.state.popoverVisible,
      anchorElement: event.currentTarget
    });
  },

  renderIcon() {
    const currentRoute = this.getRoutes()[this.getRoutes().length - 1].name;

    return (
      <div>
        <Socket
          tooltip="Add Device"
          onTouchTap={this.isActive('all-devices') ? this.togglePopover : () => this.handleAddDevice(currentRoute)}/>
        <Popover
          style={{padding: '8px 0'}}
          onRequestClose={this.hidePopover}
          open={this.state.popoverVisible}
          anchorEl={this.state.anchorElement}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}>
          <ListItem
            leftIcon={<FontIcon color={Styles.Colors.green400} className="synicon-android"/>}
            onTouchTap={() => this.handleAddDevice('gcm-devices')}
            primaryText="Android Device"/>
          <ListItem
            leftIcon={<FontIcon color={Styles.Colors.black} className="synicon-apple"/>}
            onTouchTap={() => this.handleAddDevice('apns-devices')}
            primaryText="iOS Device"/>
        </Popover>
      </div>
    );
  },

  render() {
    return (
      <div>
        <InnerToolbar title="Push Notification Devices">
          {this.renderIcon()}
        </InnerToolbar>
        <RouteHandler />
      </div>
    );
  }
});
