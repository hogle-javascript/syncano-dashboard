import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

import {Dialogs} from '../../mixins';

import Actions from './DevicesActions';
import GCMDevicesStore from './GCMDevicesStore';
import APNsDevicesStore from './APNsDevicesStore';

import {Styles} from 'syncano-material-ui';
import {InnerToolbar, Socket, Container} from '../../common';
import DevicesList from './DevicesList';
import DeviceDialog from './DeviceDialog';

export default Radium(React.createClass({

  displayName: 'Devices',

  mixins: [
    Reflux.connect(GCMDevicesStore, 'gcmDevices'),
    Reflux.connect(APNsDevicesStore, 'apnsDevices'),
    Dialogs,
    State,
    Navigation
  ],

  componentWillMount() {
    Actions.fetch();
  },

  getStyles() {
    return {
      toolbarTitleContainer: {
        color: 'rgba(0, 0, 0, .4)',
        display: 'flex',
        flexDirection: 'column',
        fontSize: 16
      },
      toolbarTitle: {
        maxHeight: 20,
        marginTop: '-8px'
      },
      toolbarPlatforms: {
        maxHeight: 20,
        fontSize: 12
      },
      separator: {
        padding: '0 8px'
      },
      platformText: {
        cursor: 'pointer'
      },
      platformActive: {
        color: Styles.Colors.blue400
      }
    };
  },

  isIOSTabActive() {
    return this.isActive('apns-devices');
  },

  isLoaded() {
    return this.state.gcmDevices.isLoading && this.state.apnsDevices.isLoading;
  },

  handleChangePlatform(routeName) {
    let instanceName = this.getParams().instanceName;

    this.transitionTo(routeName, {instanceName});
  },

  test() {
    console.error('test');
  },

  showDeviceDialog() {
    Actions.showDialog();
  },

  renderTitle() {
    const styles = this.getStyles();

    return (
      <div style={styles.toolbarTitleContainer}>
        <div style={styles.toolbarTitle}>
          Push Notification Devices
        </div>
        <div style={styles.toolbarPlatforms}>
          <span
            style={[styles.platformText, this.isIOSTabActive() && styles.platformActive]}
            onClick={this.handleChangePlatform.bind(null, 'apns-devices')}>
            iOS
          </span>
          <span style={styles.separator}>|</span>
          <span
            style={[styles.platformText, !this.isIOSTabActive() && styles.platformActive]}
            onClick={this.handleChangePlatform.bind(null, 'gcm-devices')}>
            Android
          </span>
        </div>
      </div>
    );
  },

  render() {
    let items = this.isIOSTabActive() ? this.state.apnsDevices.items : this.state.gcmDevices.items;

    return (
      <div>
        <DeviceDialog isAPNs={this.isIOSTabActive()}/>
        <InnerToolbar title={this.renderTitle()}>
          <Socket
            tooltip="Add Device"
            onTouchTap={this.showDeviceDialog}/>
        </InnerToolbar>
        <Container>
          <DevicesList
            isLoading={this.isLoaded()}
            hideDialogs={this.state.gcmDevices.hideDialogs || this.state.apnsDevices.hideDialogs}
            emptyItemContent="Add a Device"
            emptyItemHandleClick={this.showDeviceDialog}
            isIOSDevice={this.isIOSTabActive()}
            items={items}/>
        </Container>
      </div>
    );
  }
}));
