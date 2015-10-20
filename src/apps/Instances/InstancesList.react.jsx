import React from 'react';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import Actions from './InstancesActions';

import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'InstancesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.IsLoading({attr: 'state.items'})
  ],

  getInitialState() {
    return {
      listType: this.props.listType,
      items: this.props.items
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.items});
  },

  getStyles() {
    return {
      list: {
        padding: 0,
        background: 'none'
      }
    };
  },

  getList() {
    if (this.state.items.length === 0) {
      return (
        <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
          {this.props.emptyItemContent}
        </Common.ColumnList.EmptyItem>
      );
    }

    let items = this.state.items.map((item) => this.renderItem(item));

    items.reverse();
    return items;
  },

  // List
  handleItemIconClick(id, state) {
    console.info('InstancesList::handleItemIconClick', id, state);
    Actions.checkItem(id, state);
  },

  handleItemClick(instanceName) {
    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  renderItem(item) {
    item.metadata = item.metadata || {};

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}
        handleClick={this.handleItemClick.bind(null, item.name)}>
        <Column.CheckIcon
          id={item.name}
          icon={item.metadata.icon}
          background={Common.Color.getColorByName(item.metadata.color)}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}
          handleNameClick={this.handleItemClick}>
          {item.name}
        </Column.CheckIcon>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Date date={item.created_at}/>
      </Common.ColumnList.Item>
    );
  },

  renderLoaded() {
    let styles = this.getStyles();

    return (
      <Common.Lists.Container className='instances-list-container'>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List style={styles.list}>
          {this.getList()}
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});
