import React from 'react';
import {IconMenu, IconButton, MenuItem} from 'syncano-material-ui';

export default ({children, checkedItemsCount, handleSelectAll, handleUnselectAll, actions}) => (
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
      onTouchTap={handleSelectAll ? handleSelectAll : actions.selectAll}/>
    <MenuItem
      primaryText="Unselect All"
      disabled={!checkedItemsCount}
      onTouchTap={handleUnselectAll ? handleUnselectAll : actions.uncheckAll}/>
    {React.Children.map(children, (child) => React.cloneElement(child, {checkedItemsCount}))}
  </IconMenu>
);
