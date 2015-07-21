import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import ChannelsActions from './ChannelsActions';
import ChannelsStore from './ChannelsStore';

// Components
import MUI from 'material-ui';

// List
import List from '../../common/Lists/List.react';
import ListContainer from '../../common/Lists/ListContainer.react';
import Item from '../../common/ColumnList/Item.react';
import EmptyListItem from '../../common/ColumnList/EmptyListItem.react';
import Header from '../../common/ColumnList/Header.react';
import Loading from '../../common/Loading/Loading.react';
import ColumnDesc from '../../common/ColumnList/Column/Desc.react';
import ColumnDate from '../../common/ColumnList/Column/Date.react';
import ColumnCheckIcon from '../../common/ColumnList/Column/CheckIcon.react';

export default React.createClass({

  displayName: 'ChannelsList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ChannelsStore),
    HeaderMixin
  ],

  componentWillReceiveProps(nextProps) {
    this.setState({items : nextProps.items})
  },

  // List
  handleItemIconClick(id, state) {
    ChannelsActions.checkItem(id, state);
  },

  handleItemClick(itemId) {
  },

  renderItem(item) {
    return (
      <Item
        checked = {item.checked}
        key     = {item.id}
      >
        <ColumnCheckIcon
          id              = {item.name}
          icon            = {'bullhorn'}
          background      = {MUI.Styles.Colors.lightBlueA100}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          handleNameClick = {this.handleItemClick}
        >
          {item.name}
        </ColumnCheckIcon>
        <ColumnDesc>{item.description}</ColumnDesc>
        <ColumnDesc className="col-xs-5 col-md-5">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </ColumnDesc>
        <ColumnDesc className="col-xs-5 col-md-5">{item.type}</ColumnDesc>
        <ColumnDesc className="col-xs-5 col-md-5">{item.custom_publish ? 'Yes' : 'No'}</ColumnDesc>
        <ColumnDate date={item.created_at} />
      </Item>
    )
  },

  getList() {
    var items = this.state.items.map(item => {
      return this.renderItem(item);
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
      <ListContainer>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Description</ColumnDesc.Header>
          <ColumnDesc.Header className="col-xs-5 col-md-5">Permissions</ColumnDesc.Header>
          <ColumnDesc.Header className="col-xs-5 col-md-5">Type</ColumnDesc.Header>
          <ColumnDesc.Header className="col-xs-5 col-md-5">Custom publish</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </List>
      </ListContainer>
    );
  }
});
