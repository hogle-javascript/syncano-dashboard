import React from 'react';
import pluralize from 'pluralize';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

export default React.createClass({
  displayName: 'ListMenuItem',

  render() {
    const {primaryText, checkedItemsCount, ...other} = this.props;

    return (
      <MenuItem
        {...other}
        primaryText={pluralize(primaryText, checkedItemsCount)}
        disabled={this.props.disabled || !checkedItemsCount}/>
    );
  }
});
