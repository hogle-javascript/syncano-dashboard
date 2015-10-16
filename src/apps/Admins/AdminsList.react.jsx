import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionStore from '../Session/SessionStore';

// Components
import Common from '../../common';

export default React.createClass({

  displayName: 'AdminsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      items: this.props.items,
      isLoading: this.props.isLoading
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      isLoading: nextProps.isLoading
    });
  },

  getStyles() {
    return {
      ownerLabel: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14,
        marginTop: 4
      }
    };
  },

  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  renderItem(item) {
    let styles = this.getStyles();
    let isOwner = item.id === SessionStore.getInstance().owner.id;

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Common.ColumnList.Column.CheckIcon
          className="col-xs-25 col-md-20"
          id={item.id.toString()}
          icon='account'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}
          checkable={!isOwner}>
          <div>
            <div>{item.email}</div>
            <div style={styles.ownerLabel}>
              {isOwner ? 'Owner (cannot be edited)' : null}
            </div>
          </div>
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.Desc>{item.role}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Date date={item.created_at}/>
      </Common.ColumnList.Item>
    );
  },

  renderList() {
    let items = this.state.items || [];

    if (items.length > 0) {
      items = items.map((item) => this.renderItem(item));

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
      <Common.Lists.Container className="admin-list">
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-xs-25 col-md-20">
            {this.props.name}
          </Common.ColumnList.Column.ColumnHeader>
          <Common.ColumnList.Column.ColumnHeader columnName="DESC">Role</Common.ColumnList.Column.ColumnHeader>
          <Common.ColumnList.Column.ColumnHeader columnName="DATE">Created</Common.ColumnList.Column.ColumnHeader>
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

