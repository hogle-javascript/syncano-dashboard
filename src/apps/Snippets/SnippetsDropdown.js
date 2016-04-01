import React from 'react';
import InnerToolbarDropdown from '../../common/InnerToolbar/InnerToolbarDropdown';
import {MenuItem} from 'syncano-material-ui';

export default () => (
  <InnerToolbarDropdown>
    <MenuItem value="snippets" primaryText="All" />
    <MenuItem value="scripts" primaryText="Scripts" />
    <MenuItem value="templates" primaryText="Templates" />
  </InnerToolbarDropdown>
);

