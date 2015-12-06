import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import ListItem from './AdminsListItem';
import Common from '../../common';

export default React.createClass({

  displayName: 'AdminsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation,
    Mixins.List,
    Mixins.Dialogs
  ],

  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  renderItem(item) {
    return <ListItem onIconClick={this.handleItemIconClick} item={item}/>;
  },

  render() {
    return (
      <Common.Lists.Container className="admin-list">
        <Common.ColumnList.Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-xs-25 col-md-20">
            {this.props.name}
          </Common.ColumnList.Column.ColumnHeader>
          <Common.ColumnList.Column.ColumnHeader columnName="DESC">Role</Common.ColumnList.Column.ColumnHeader>
          <Common.ColumnList.Column.ColumnHeader columnName="DATE">Created</Common.ColumnList.Column.ColumnHeader>
          <Common.ColumnList.Column.ColumnHeader columnName="MENU"/>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.props.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});

