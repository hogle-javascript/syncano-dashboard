import React from 'react';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

export default React.createClass({
  displayName: 'ListMenuItem',

  render() {
    const {singleItemText, multipleItemsText, checkedItemsCount, ...other} = this.props;

    return (
      <MenuItem
        {...other}
        primaryText={checkedItemsCount === 1 ? singleItemText : multipleItemsText}
        disabled={this.props.disabled || !checkedItemsCount}/>
    );
  }
});
