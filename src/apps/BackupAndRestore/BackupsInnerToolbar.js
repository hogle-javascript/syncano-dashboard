import React from 'react';
import {InnerToolbar} from '../../common';
// import BackupsDropdown from './BackupsDropdown';

export default ({children}) => (
  <InnerToolbar title="Backups">
    {children}
  </InnerToolbar>

  /* <InnerToolbar
        title="Backups:"
        menu={<BackupsDropdown/>}>
    */
);
