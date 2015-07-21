import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import UsersActions from './UsersActions';
import UsersStore from './UsersStore';
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'UsersList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      items     : this.props.items,
      isLoading : this.props.isLoading
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items     : nextProps.items,
      isLoading : nextProps.isLoading
    })
  },

  // List
  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
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
      }
    }
  },

  renderItemGroups(groups) {
    var styles = this.getStyles();

    if (groups === undefined) {
      return
    } else if (groups.length === 0) {
      return 'No group';
    }

    var itemGroups = groups.map(function(group) {
      return (
        <li style={styles.groupsListItem}>{group.label}</li>
      )
    });

    return (
      <ul style={styles.groupsList}>{itemGroups}</ul>
    )
  },

  renderItem(item) {
    return (
      <Common.ColumnList.Item
        checked = {item.checked}
        key     = {item.id}
      >
        <Common.ColumnList.Column.CheckIcon
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
        >
          {item.username}
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.ID>{item.id}</Common.ColumnList.Column.ID>
        <Common.ColumnList.Column.Desc>{this.renderItemGroups(item.groups)}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Date date={item.profile.updated_at} />
        <Common.ColumnList.Column.Date date={item.profile.created_at} />
      </Common.ColumnList.Item>
    )
  },

  getList() {
    var items = this.state.items.map(item => this.renderItem(item));

    if (items.length > 0) {
      return items;
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    )
  },

  render() {
    return (
      <div>
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.CheckIcon.Header>{this.props.name}</Common.ColumnList.Column.CheckIcon.Header>
          <Common.ColumnList.Column.ID.Header>ID</Common.ColumnList.Column.ID.Header>
          <Common.ColumnList.Column.Desc.Header>Groups</Common.ColumnList.Column.Desc.Header>
          <Common.ColumnList.Column.Date.Header>Updated</Common.ColumnList.Column.Date.Header>
          <Common.ColumnList.Column.Date.Header>Created</Common.ColumnList.Column.Date.Header>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.state.isLoading}>
            {this.getList()}
          </Common.Loading>
        </Common.Lists.List>
      </div>
    );
  }
});

