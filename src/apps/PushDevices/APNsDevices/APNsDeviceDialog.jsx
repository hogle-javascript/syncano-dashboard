import React from 'react';

import Actions from '../DevicesActions';

import DeviceDialog from '../DeviceDialog';

export default React.createClass({

  displayName: 'APNDeviceDialog',

  render() {
    return (
      <div>
        <DeviceDialog
          handleAddSubmit={Actions.createAPNsDevice}
          handleEditSubmit={Actions.updateAPNsDevice}/>
      </div>
    );
  }
});
