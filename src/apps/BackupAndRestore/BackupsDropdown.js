import React from 'react';
import InnerToolbarDropdown from '../../common/InnerToolbar/InnerToolbarDropdown';
import {MenuItem} from 'syncano-material-ui';

export default () => (
  <InnerToolbarDropdown>
    <MenuItem value="all-backups" primaryText="All" />
    <MenuItem value="partial-backups" primaryText="Partial" />
    <MenuItem value="full-backups" primaryText="Full" />
  </InnerToolbarDropdown>
);
