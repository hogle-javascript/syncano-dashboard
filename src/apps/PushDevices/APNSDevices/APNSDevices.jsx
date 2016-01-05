import React from 'react';
import Reflux from 'reflux';

import APNSDevicesStore from './APNSDevicesStore';
import Actions from '../DevicesActions';

import Devices from '../Devices';
import APNSDeviceDialog from './APNSDeviceDialog';

export default React.createClass({

  displayName: 'APNSDevices',

  mixins: [
    Reflux.connect(APNSDevicesStore)
  ],

  showDeviceDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <APNSDeviceDialog />
        <Devices
          emptyItemHandleClick={this.showDeviceDialog}
          emptyItemContent="Add APNS Device"
          hideDialogs={this.state.hideDialogs}
          isLoading={this.state.isLoading}
          items={this.state.items}/>
      </div>
    );
  }
});
