import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import ApiKeysActions from './ApiKeysActions';
import ApiKeysStore from './ApiKeysStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'ApiKeysList',

  mixins: [
    Reflux.connect(ApiKeysStore),
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  handleItemIconClick(id, state) {
    ApiKeysActions.checkItem(id, state);
  },

  renderItem(item) {

    var ignore_acl = null,
        allow_user_create = null;

    if (item.ignore_acl) {
      ignore_acl = <div>Ignore ACL</div>;
    }
    if (item.allow_user_create) {
      allow_user_create = <div>Allow user creation</div>;
    }

    return (
      <Common.ColumnList.Item
        checked = {item.checked}
        key     = {item.id}>
        <Common.ColumnList.Column.CheckIcon
          id              = {item.id.toString()}
          icon            = 'key'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
        >
          {item.description}
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.ID>{item.id}</Common.ColumnList.Column.ID>
        <Common.ColumnList.Column.Key color="black">{item.api_key}</Common.ColumnList.Column.Key>
        <Common.ColumnList.Column.Text>
          {ignore_acl}
          {allow_user_create}
        </Common.ColumnList.Column.Text>
        <Common.ColumnList.Column.Date date={item.created_at} />
      </Common.ColumnList.Item>
    )
  },

  getList() {
    var items = this.state.items.map(item => this.renderItem(item));

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    );
  },

  render() {
    return (
      <Common.Lists.Container>
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.CheckIcon.Header>{this.props.name}</Common.ColumnList.Column.CheckIcon.Header>
          <Common.ColumnList.Column.ID.Header>ID</Common.ColumnList.Column.ID.Header>
          <Common.ColumnList.Column.Key.Header>Key</Common.ColumnList.Column.Key.Header>
          <Common.ColumnList.Column.Text.Header>Permissions</Common.ColumnList.Column.Text.Header>
          <Common.ColumnList.Column.Date.Header>Created</Common.ColumnList.Column.Date.Header>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.state.isLoading}>
            {this.getList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});

