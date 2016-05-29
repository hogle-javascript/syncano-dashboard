import React from 'react';
import {MenuItem} from 'material-ui';
import {colors as Colors} from 'material-ui/styles/';
import {ColumnList} from '../../common/';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ProfileInvitationsListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showAcceptDialog: React.PropTypes.func.isRequired,
    showDeclineDialog: React.PropTypes.func.isRequired
  },

  render() {
    const item = this.props.item;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          iconClassName='account'
          background={Colors.blue500}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}
          primaryText={item.instance}/>
        <Column.Desc>{item.inviter}</Column.Desc>
        <Column.Desc>{item.role}</Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-invitation-accept"
            onTouchTap={this.props.showAcceptDialog}
            primaryText="Accept"/>
          <MenuItem
            className="dropdown-item-invitation-decline"
            onTouchTap={this.props.showDeclineDialog}
            primaryText="Decline"/>
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
