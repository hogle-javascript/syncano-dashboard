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

// List
import Lists from '../../common/Lists';
import Item from '../../common/ColumnList/Item.react';
import EmptyListItem from '../../common/ColumnList/EmptyListItem.react';
import Header from '../../common/ColumnList/Header.react';
import Loading from '../../common/Loading/Loading.react';
import ColumnDate from '../../common/ColumnList/Column/Date.react';
import ColumnID from '../../common/ColumnList/Column/ID.react';
import ColumnText from '../../common/ColumnList/Column/Text.react';
import ColumnKey from '../../common/ColumnList/Column/Key.react';
import ColumnCheckIcon from '../../common/ColumnList/Column/CheckIcon.react';

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
      <Item
        checked = {item.checked}
        key     = {item.id}>
        <ColumnCheckIcon
          id              = {item.id.toString()}
          icon            = 'key'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
        >
          {item.description}
        </ColumnCheckIcon>
        <ColumnID>{item.id}</ColumnID>
        <ColumnKey color="black">{item.api_key}</ColumnKey>
        <ColumnText>
          {ignore_acl}
          {allow_user_create}
        </ColumnText>
        <ColumnDate date={item.created_at} />
      </Item>
    )
  },

  getList() {
    var items = this.state.items.map(item => {
      return this.renderItem(item)
    });

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return (
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyListItem>
    );
  },

  render() {
    return (
      <Lists.Container>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnID.Header>ID</ColumnID.Header>
          <ColumnKey.Header>Key</ColumnKey.Header>
          <ColumnText.Header>Permissions</ColumnText.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <Lists.List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </Lists.List>
      </Lists.Container>
    );
  }
});

