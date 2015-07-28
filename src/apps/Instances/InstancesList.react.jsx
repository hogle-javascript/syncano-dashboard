import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import ColorStore from '../../common/Color/ColorStore';
import SessionActions from '../Session/SessionActions';
import InstancesActions from './InstancesActions';

import Common from '../../common';

export default React.createClass({

  displayName: 'InstancesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin
  ],

  getInitialState() {
    return {
      listType: this.props.listType,
      items: this.props.items
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({items : nextProps.items})
  },

  // List
  handleItemIconClick(id, state) {
    console.info('InstancesList::handleItemIconClick', id, state);
    InstancesActions.checkItem(id, state);
  },

  handleItemClick(instanceName) {
    // Redirect to main instance screen
    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName: instanceName});
  },

  renderItem(item) {
    return (
      <Common.ColumnList.Item
        checked     = {item.checked}
        id          = {item.name}
        key         = {item.name}
        handleClick = {this.handleItemClick}
      >
        <Common.ColumnList.Column.CheckIcon
          id              = {item.name}
          icon            = {item.metadata.icon}
          background      = {ColorStore.getColorByName(item.metadata.color)}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          handleNameClick = {this.handleItemClick}
        >
          {item.name}
        </Common.ColumnList.Column.CheckIcon>
        <Common.ColumnList.Column.Desc>{item.description}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Date date={item.created_at} />
      </Common.ColumnList.Item>
    )
  },

  getList() {
    if (this.state.items === null) {
      return <Common.Loading show={true} />

    }

    if (this.state.items.length === 0) {
      return(
        <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
          {this.props.emptyItemContent}
        </Common.ColumnList.EmptyItem>
      )
    }

    var items = this.state.items.map(item => this.renderItem(item));
    items.reverse();
    return items;
  },

  getStyles() {
    return {
      list: {
        padding: 0,
        background: 'none'
      }
    }
  },

  render() {
    var styles = this.getStyles();

    return (
      <Common.Lists.Container className='instances-list-container'>
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.CheckIcon.Header>{this.props.name}</Common.ColumnList.Column.CheckIcon.Header>
          <Common.ColumnList.Column.Desc.Header>Description</Common.ColumnList.Column.Desc.Header>
          <Common.ColumnList.Column.Date.Header>Created</Common.ColumnList.Column.Date.Header>
        </Common.ColumnList.Header>
        <Common.Lists.List style={styles.list}>
          {this.getList()}
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});
