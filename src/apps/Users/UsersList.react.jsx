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

let Column = Common.ColumnList.Column;

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
    }

    if (groups.length === 0) {
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
        <Column.CheckIcon
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
        >
          {item.username}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Desc>{this.renderItemGroups(item.groups)}</Column.Desc>
        <Column.Date date={item.profile.updated_at} />
        <Column.Date date={item.profile.created_at} />
      </Common.ColumnList.Item>
    )
  },

  getList() {
    var items = this.state.items.map(item => this.renderItem(item));

    if (items.length > 0) {
      return items;
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick.bind(null, null)}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    )
  },

  render() {
    return (
      <div>
        <Common.ColumnList.Header>
          <Column.CheckIcon.Header>{this.props.name}</Column.CheckIcon.Header>
          <Column.ID.Header>ID</Column.ID.Header>
          <Column.Desc.Header>Groups</Column.Desc.Header>
          <Column.Date.Header>Updated</Column.Date.Header>
          <Column.Date.Header>Created</Column.Date.Header>
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

