import React from 'react';
import Reflux from 'reflux';

import Store from './APNSDevicesStore';
import Actions from './APNSDevicesActions';

import Devices from '../Devices';
import APNSDialog from './APNSDeviceDialog';

export default React.createClass({

  displayName: 'APNSDevices',

  mixins: [
    Reflux.connect(Store)
  ],

  componentWillMount() {
    Actions.fetch();
  },

  render() {
    return (
      <div>
        <APNSDialog />
        <Devices
          listItemIcon="apple"
          getChekcedItems={Store.getCheckedItems}
          actions={Actions}
          emptyItemHandleClick={Actions.showDialog}
          emptyItemContent="Add APNS Device"
          hideDialogs={this.state.hideDialogs}
          isLoading={this.state.isLoading}
          items={this.state.items}/>
      </div>
    );
  }
});
