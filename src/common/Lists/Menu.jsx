import React from 'react';
import {IconMenu, IconButton} from 'syncano-material-ui';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

export default React.createClass({
  displayName: 'ListMenu',

  getChildrenWithCheckedItemsCount() {
    const {checkedItemsCount, ...other} = this.props;

    return React.Children.map(this.props.children, (child) => React.cloneElement(child, {checkedItemsCount}));
  },

  renderListIconMenuButton() {
    return (
      <IconButton
        touch={true}
        tooltipPosition='bottom-left'
        iconClassName='synicon-dots-vertical'/>
    );
  },

  render() {
    return (
      <IconMenu
        iconButtonElement={this.renderListIconMenuButton()}
        anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
        {this.getChildrenWithCheckedItemsCount()}
        <MenuItem
          primaryText="Unselect All"
          disabled={!this.props.checkedItemsCount}
          onTouchTap={this.props.actions.uncheckAll}/>
        <MenuItem
          primaryText="Select All"
          onTouchTap={this.props.actions.selectAll}/>
      </IconMenu>
    );
  }
});
