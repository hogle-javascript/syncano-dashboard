import React from 'react';
import {MenuItem} from 'material-ui';

export default ({primaryText = 'Delete All', checkedItemsCount, disabled, ...other}) => {
  return (
    <MenuItem
      {...other}
      primaryText={primaryText}
      disabled={disabled || !checkedItemsCount}/>
  );
};
