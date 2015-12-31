import React from 'react';

// Stores and Actions
import Actions from './UsersActions';

// Components
import UserInfo from './UserInfo';
import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'UsersListItem',

  getInitialState() {
    return {
      userInfoVisible: false
    };
  },

  getStyles() {
    return {
      groupsList: {
        margin: '0 -4px',
        padding: 0,
        listStyle: 'none'
      },
      groupsListItem: {
        display: 'inline-block',
        lineHeight: '24px',
        border: '1px solid #ddd',
        borderRadius: 2,
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        padding: '0 4px',
        margin: 4,
        background: '#fff'
      },
      showInfoItem: {
        cursor: 'pointer'
      }
    };
  },

  toggleUserInfo() {
    this.setState({
      userInfoVisible: !this.state.userInfoVisible
    });
  },

  renderItemGroups(groups) {
    let styles = this.getStyles();

    if (typeof groups === 'undefined') {
      return true;
    }

    if (groups.length === 0) {
      return 'No group';
    }

    let itemGroups = groups.map((group) => <li key={group.label} style={styles.groupsListItem}>{group.label}</li>);

    return (
      <ul style={styles.groupsList}>{itemGroups}</ul>
    );
  },

  render() {
    let styles = this.getStyles();
    let item = this.props.item;

    return (
      <div>
        <Common.ColumnList.Item
          checked={item.checked}
          key={item.id}>
          <Column.CheckIcon
            id={item.id.toString()}
            icon='account'
            background={Common.Color.getColorByName('blue', 'xlight')}
            checked={item.checked}
            handleIconClick={this.props.onIconClick}>
            <Common.Truncate
              onClick={this.toggleUserInfo}
              style={styles.showInfoItem}
              text={item.username}/>
          </Column.CheckIcon>
          <Column.ID>{item.id}</Column.ID>
          <Column.Desc>{this.renderItemGroups(item.groups)}</Column.Desc>
          <Column.Date date={item.profile.updated_at}/>
          <Column.Date date={item.profile.created_at}/>
          <Column.Menu>
            <MenuItem
              className="dropdown-item-edit-user"
              onTouchTap={Actions.showDialog.bind(null, item)}
              primaryText="Edit a User"/>
            <MenuItem
              className="dropdown-item-delete-user"
              onTouchTap={this.props.showDeleteDialog}
              primaryText="Delete a User"/>
          </Column.Menu>
        </Common.ColumnList.Item>

        <div>
          <UserInfo
            visible={this.state.userInfoVisible}
            user={item}/>
        </div>
      </div>
    );
  }
});

