import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import ChannelsActions from './ChannelsActions';
import ChannelsStore from './ChannelsStore';

// Components
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ChannelsList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ChannelsStore),
    HeaderMixin
  ],

  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.items})
  },

  // List
  handleItemIconClick(id, state) {
    ChannelsActions.checkItem(id, state);
  },

  renderItem(item) {
    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id = {item.name}
          icon = {'bullhorn'}
          background = {Common.Color.getColorByName('blue', 'xlight')}
          checked = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          handleNameClick = {this.handleItemClick} >
          {item.name}
        </Column.CheckIcon>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Desc className="col-xs-5 col-md-5">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </Column.Desc>
        <Column.Desc className="col-xs-5 col-md-5">{item.type}</Column.Desc>
        <Column.Desc className="col-xs-5 col-md-5">
          {item.custom_publish ? 'Yes' : 'No'}
        </Column.Desc>
        <Column.Date date={item.created_at}/>
      </Common.ColumnList.Item>
    )
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
      <Common.Lists.Container>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.Desc.Header>Description</Column.Desc.Header>
          <Column.Desc.Header className="col-xs-5">Permissions</Column.Desc.Header>
          <Column.Desc.Header className="col-xs-5">Type</Column.Desc.Header>
          <Column.Desc.Header className="col-xs-5">Custom publish</Column.Desc.Header>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
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
