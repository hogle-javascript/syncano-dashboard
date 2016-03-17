import React from 'react';
import {IconMenu, IconButton, MenuItem} from 'syncano-material-ui';

export default ({children, checkedItemsCount, handleSelectAll, handleUnselectAll}) => (
  <IconMenu
    iconButtonElement={
      <IconButton
        touch={true}
        tooltipPosition="bottom-left"
        iconClassName="synicon-dots-vertical" />
    }
    anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}>
    <MenuItem
      primaryText="Select All"
      onTouchTap={handleSelectAll}/>
    <MenuItem
      primaryText="Unselect All"
      disabled={!checkedItemsCount}
      onTouchTap={handleUnselectAll}/>
    {React.Children.map(children, (child) => React.cloneElement(child, {checkedItemsCount}))}
  </IconMenu>
);
