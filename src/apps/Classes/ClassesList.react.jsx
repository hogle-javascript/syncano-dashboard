import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import ClassesActions from './ClassesActions';
import ClassesStore from './ClassesStore';

import Common from '../../common';

export default React.createClass({

  displayName: 'ClassesList',

  mixins: [
    Reflux.connect(ClassesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  // List
  handleItemIconClick(id, state) {
    ClassesActions.checkItem(id, state);
  },

  handleItemClick(className) {
    SessionStore.getRouter().transitionTo(
      'classes-data-objects',
      {
        instanceName : SessionStore.getInstance().name,
        className    : className
      }
    );
    console.info('ClassesList::handleItemClick');
  },

  renderItem(item) {

    return (
      <Common.ColumnList.Item
        key          = {item.name}
        id           = {item.name}
        checked      = {item.checked}
        handleClick  = {this.handleItemClick}
      >
        <Common.ColumnList.Column.CheckIcon
          id              = {item.name.toString()}
          icon            = {item.metadata.icon}
          background      = {item.metadata.color}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
        >
          {item.name}
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.Desc>{item.description}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.ID className="col-xs-5 col-md-5">
          {item.objects_count}
        </Common.ColumnList.Column.ID>
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
    )
  },

  render() {
    return (
      <Common.Lists.Container>
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.CheckIcon.Header>{this.props.name}</Common.ColumnList.Column.CheckIcon.Header>
          <Common.ColumnList.Column.Desc.Header>Description</Common.ColumnList.Column.Desc.Header>
          <Common.ColumnList.Column.ID.Header className="col-xs-5 col-md-5">Objects</Common.ColumnList.Column.ID.Header>
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

