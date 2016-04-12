import React from 'react';
import InnerToolbarDropdown from '../../common/InnerToolbar/InnerToolbarDropdown';
import {MenuItem} from 'syncano-material-ui';

export default () => {
  return (
    <InnerToolbarDropdown>
      <MenuItem value="sockets" primaryText="All" />
      <MenuItem value="data" primaryText="Data Endpoints" />
      <MenuItem value="script-endpoints" primaryText="Script Endpoints" />
      <MenuItem value="triggers" primaryText="Triggers" />
      <MenuItem value="schedules" primaryText="Schedules" />
      <MenuItem value="channels" primaryText="Channels" />
      <MenuItem value="push-notifications" primaryText="Push Notifications" />
    </InnerToolbarDropdown>
  );
};

