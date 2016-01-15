import React from 'react';

import {DialogsMixin} from '../../mixins';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color, Truncate} from 'syncano-components';

export default React.createClass({
  displayName: 'AdminsInvitationsListItem',

  mixins: [DialogsMixin],

  render() {
    let item = this.props.item;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <ColumnList.Column.CheckIcon
          className="col-xs-25 col-md-20"
          id={item.id.toString()}
          icon='account'
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <Truncate text={item.email}/>
        </ColumnList.Column.CheckIcon>
        <ColumnList.Column.Desc>{item.role}</ColumnList.Column.Desc>
        <ColumnList.Column.Date date={item.created_at}/>
        <ColumnList.Column.Menu>
          <MenuItem
            onTouchTap={this.props.showResendDialog}
            className="dropdown-item-resend-invitation"
            primaryText="Resend an Invitation" />
          <MenuItem
            onTouchTap={this.props.showDeleteDialog}
            className="dropdown-item-remove-invitation"
            primaryText="Delete an Invitation" />
        </ColumnList.Column.Menu>
      </ColumnList.Item>
    );
  }
});
