import React from 'react';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

export default ({primaryText = 'Delete All', checkedItemsCount, disabled, ...other}) => {
  return (
    <MenuItem
      {...other}
      primaryText={primaryText}
      disabled={disabled || !checkedItemsCount}/>
  );
};
