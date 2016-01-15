import React from 'react';

import {DialogsMixin} from '../../mixins/';

import Actions from './AdminsActions';
import SessionStore from '../Session/SessionStore';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color, Truncate} from 'syncano-components';

export default React.createClass({
  displayName: 'AdminsListItem',

  mixins: [DialogsMixin],

  getStyles() {
    return {
      ownerLabel: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14,
        marginTop: 4
      }
    };
  },

  renderEditAdmin(item, isOwner) {
    if (isOwner) {
      return true;
    }

    return (
      <MenuItem
        className="dropdown-item-edit-admin"
        onTouchTap={Actions.showDialog.bind(null, item)}
        primaryText="Edit an Admin" />
    );
  },

  render() {
    let item = this.props.item;
    let styles = this.getStyles();
    let isOwner = item.id === SessionStore.getInstance().owner.id;

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
          handleIconClick={this.props.onIconClick}
          checkable={!isOwner}>
          <div>
            <Truncate text={item.email}/>
            <div style={styles.ownerLabel}>
              {isOwner ? 'Owner (cannot be edited)' : null}
            </div>
          </div>
        </ColumnList.Column.CheckIcon>
        <ColumnList.Column.Desc>{item.role}</ColumnList.Column.Desc>
        <ColumnList.Column.Date date={item.created_at}/>
        <ColumnList.Column.Menu>
          {this.renderEditAdmin(item, isOwner)}
          <MenuItem
            className="dropdown-item-delete-admin"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete an Admin" />
        </ColumnList.Column.Menu>
      </ColumnList.Item>
    );
  }
});
