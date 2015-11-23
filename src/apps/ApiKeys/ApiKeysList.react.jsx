import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {Dialogs} from '../../mixins';

// Stores and Actions
import Actions from './ApiKeysActions';
import Store from './ApiKeysStore';

// Components
import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ApiKeysList',

  mixins: [
    Reflux.connect(Store),
    HeaderMixin,
    Router.State,
    Router.Navigation,
    Dialogs
  ],

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  renderItem(item) {
    let ignore_acl = null;
    let allow_user_create = null;

    if (item.ignore_acl) {
      ignore_acl = <div>Ignore ACL</div>;
    }
    if (item.allow_user_create) {
      allow_user_create = <div>Allow user creation</div>;
    }

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='key'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}>
          {item.description}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Key color="black">{item.api_key}</Column.Key>
        <Column.Text>
          {ignore_acl}
          {allow_user_create}
        </Column.Text>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            onTouchTap={this.showMenuDialog.bind(null, item.api_key, Actions.removeApiKeys.bind(null, [item]))}
            className="dropdown-item-delete-apikey"
            primaryText="Delete an API Key" />
          <MenuItem
            onTouchTap={this.showMenuDialog.bind(null, item.api_key, Actions.resetApiKey.bind(null, [item]))}
            className="dropdown-item-reset-apikey"
            primaryText="Reset an API Key" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  },

  renderList() {
    let items = this.state.items.map((item) => this.renderItem(item));

    if (items.length > 0) {
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
      <Common.Lists.Container className="api-keys-list">
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            columnName="CHECK_ICON"
            primary={true}>
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader columnName="KEY">Key</Column.ColumnHeader>
          <Column.ColumnHeader columnName="TEXT">Permissions</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU"/>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.state.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});

