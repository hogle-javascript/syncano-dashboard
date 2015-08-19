import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'CodeBoxesList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    HeaderMixin
  ],

  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.items})
  },

  // List
  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleItemClick(itemId) {
    // Redirect to edit screen
    this.transitionTo('codebox-edit', {
      instanceName: this.getParams().instanceName,
      codeboxId: itemId
    });
  },

  renderItem(item) {
    let runtime = Store.getRuntimeColorIcon(item.runtime_name);

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}
        id={item.id}
        handleClick={this.handleItemClick.bind(null, item.id)}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon={runtime.icon}
          background={runtime.color}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}
          handleNameClick={this.handleItemClick}>
          {item.label}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Date date={item.created_at}/>
      </Common.ColumnList.Item>
    )
  },

  getList() {
    let items = this.state.items.map((item) => this.renderItem(item));

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
          <Column.Desc.Header>Description</Column.Desc.Header>
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
