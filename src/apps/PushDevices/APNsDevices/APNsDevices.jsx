import React from 'react';
import Reflux from 'reflux';

import APNsDevicesStore from './APNsDevicesStore';
import Actions from '../DevicesActions';

import Devices from '../Devices';
import APNsDeviceDialog from './APNsDeviceDialog';

export default React.createClass({

  displayName: 'APNDevices',

  mixins: [
    Reflux.connect(APNsDevicesStore)
  ],

  showDeviceDialog() {
    Actions.showDialog();
  },

  render() {
    return (
      <div>
        <APNsDeviceDialog />
        <Devices
          emptyItemHandleClick={this.showDeviceDialog}
          emptyItemContent="Add APNs Device"
          hideDialogs={this.state.hideDialogs}
          isLoading={this.state.isLoading}
          items={this.state.items}/>
      </div>
    );
  }
});
