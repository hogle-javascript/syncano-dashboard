import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';
import WebhooksActions from './WebhooksActions';
import WebhooksStore from './WebhooksStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'WebhooksList',

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

  renderItem(item) {

    // TODO: move to store
    return (
      <Common.ColumnList.Item
        checked = {item.checked}
        key     = {item.name}
      >
        <Common.ColumnList.Column.CheckIcon
          id              = {item.name.toString()}
          icon            = 'arrow-up-bold'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick} 
        >
          {item.name}
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.Desc className="col-xs-8">{item.description}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Desc className="col-xs-8">{item.codebox}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Desc>{item.public.toString()}</Common.ColumnList.Column.Desc>
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
          <Common.ColumnList.Column.Desc.Header className="col-xs-8">Description</Common.ColumnList.Column.Desc.Header>
          <Common.ColumnList.Column.Desc.Header className="col-xs-8">CodeBox</Common.ColumnList.Column.Desc.Header>
          <Common.ColumnList.Column.Desc.Header>Public</Common.ColumnList.Column.Desc.Header>
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

