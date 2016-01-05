import React from 'react';

import Actions from '../DevicesActions';

import DeviceDialog from '../DeviceDialog';

export default React.createClass({

  displayName: 'APNSDeviceDialog',

  render() {
    return (
      <div>
        <DeviceDialog
          handleAddSubmit={Actions.createAPNSDevice}
          handleEditSubmit={Actions.updateAPNSDevice} />
      </div>
    );
  }
});
