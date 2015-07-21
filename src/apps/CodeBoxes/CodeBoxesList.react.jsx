import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import CodeBoxesActions from './CodeBoxesActions';
import CodeBoxesStore from './CodeBoxesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'CodeBoxesList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(CodeBoxesStore),
    HeaderMixin
  ],

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({items : nextProps.items})
  },

  // List
  handleItemIconClick(id, state) {
    CodeBoxesActions.checkItem(id, state);
  },

  handleItemClick(itemId) {
    // Redirect to edit screen
    this.transitionTo('codebox-edit', {
      instanceName: this.getParams().instanceName,
      codeboxId: itemId
    });
  },

  renderItem(item) {
    var runtime = CodeBoxesStore.getRuntimeColorIcon(item.runtime_name);

    return (
      <Common.ColumnList.Item
        checked     = {item.checked}
        key         = {item.id}
        id          = {item.id}
        handleClick = {this.handleItemClick}
      >
        <Common.ColumnList.Column.CheckIcon
          id              = {item.id}
          icon            = {runtime.icon}
          background      = {runtime.color}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          handleNameClick = {this.handleItemClick}
        >
          {item.label}
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.Desc>{item.description}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Date date={item.created_at} />
      </Common.ColumnList.Item>
    )
  },

  getList() {
    var items = this.state.items.map(item => {
      this.renderItem(item)
    });

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
          <Common.ColumnList.Column.Desc.Header>Description</Common.ColumnList.Column.Desc.Header>
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
