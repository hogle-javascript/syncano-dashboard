import React from 'react';
import InnerToolbarDropdown from '../../common/InnerToolbar/InnerToolbarDropdown';
import {MenuItem} from 'syncano-material-ui';

export default () => (
  <InnerToolbarDropdown>
    <MenuItem value="sockets" primaryText="All" />
    <MenuItem value="data" primaryText="Data Endpoint" />
    <MenuItem value="script-endpoints" primaryText="Script Endpoint" />
    <MenuItem value="triggers" primaryText="Trigger" />
    <MenuItem value="schedules" primaryText="Schedule" />
    <MenuItem value="channels" primaryText="Channel" />
  </InnerToolbarDropdown>
);

