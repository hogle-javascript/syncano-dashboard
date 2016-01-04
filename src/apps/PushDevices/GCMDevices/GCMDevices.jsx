import React from 'react';
import Reflux from 'reflux';

import GCMDevicesStore from './GCMDevicesStore';
import Actions from '../DevicesActions';

import Devices from '../Devices';
import GCMDeviceDialog from './GCMDeviceDialog';

export default React.createClass({

  displayName: 'GCMDevices',

  mixins: [
    Reflux.connect(GCMDevicesStore)
  ],

  showDeviceDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <GCMDeviceDialog />
        <Devices
          emptyItemHandleClick={this.showDeviceDialog}
          emptyItemContent="Add GCM Device"
          hideDialogs={this.state.hideDialogs}
          isLoading={this.state.isLoading}
          items={this.state.items}/>
      </div>
    );
  }
});
