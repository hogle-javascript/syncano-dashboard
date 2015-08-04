import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ApiKeysList',

  mixins: [
    Reflux.connect(Store),
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  renderItem(item) {
    let ignore_acl = null,
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
        <Column.CheckIcon
          id              = {item.id.toString()}
          icon            = 'key'
          background      = {Common.Color.getColorByName('blue', 'xlight')}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
        >
          {item.description}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Key color="black">{item.api_key}</Column.Key>
        <Column.Text>
          {ignore_acl}
          {allow_user_create}
        </Column.Text>
        <Column.Date date={item.created_at} />
      </Common.ColumnList.Item>
    )
  },

  getList() {
    let items = this.state.items.map(item => this.renderItem(item));

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
          <Column.CheckIcon.Header>{this.props.name}</Column.CheckIcon.Header>
          <Column.ID.Header>ID</Column.ID.Header>
          <Column.Key.Header>Key</Column.Key.Header>
          <Column.Text.Header>Permissions</Column.Text.Header>
          <Column.Date.Header>Created</Column.Date.Header>
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

