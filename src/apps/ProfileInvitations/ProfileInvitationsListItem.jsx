import React from 'react';

// Components
import MUI from 'syncano-material-ui';
import MenuItem from '../../../node_modules/syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ProfileInvitationsListItem',

  render() {
    let item = this.props.item;

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='account'
          background={MUI.Styles.Colors.blue500}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <Common.Truncate text={item.instance}/>
        </Column.CheckIcon>
        <Column.Desc>{item.inviter}</Column.Desc>
        <Column.Desc>{item.role}</Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-invitation-accept"
            onTouchTap={this.props.showAcceptDialog}
            primaryText="Accept Invitation"/>
          <MenuItem
            className="dropdown-item-invitation-decline"
            onTouchTap={this.props.showDeclineDialog}
            primaryText="Decline Invitation"/>
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});
