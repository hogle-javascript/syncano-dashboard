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
import InstancesStore from './InstancesStore';

// List
import Lists from '../../common/Lists';
import Item from '../../common/ColumnList/Item.react';
import EmptyListItem from '../../common/ColumnList/EmptyListItem.react';
import Header from '../../common/ColumnList/Header.react';
import Loading from '../../common/Loading/Loading.react';
import ColumnDesc from '../../common/ColumnList/Column/Desc.react';
import ColumnDate from '../../common/ColumnList/Column/Date.react';
import ColumnCheckIcon from '../../common/ColumnList/Column/CheckIcon.react';

export default React.createClass({

  displayName: 'InstancesList',

  mixins: [
    Router.State,
    Router.Navigation,
    Reflux.connect(InstancesStore, 'instancesStore'),
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
      <Item
        checked     = {item.checked}
        id          = {item.name}
        key         = {item.name}
        handleClick = {this.handleItemClick}
      >
        <ColumnCheckIcon
          id              = {item.name}
          icon            = {item.metadata.icon}
          background      = {ColorStore.getColorByName(item.metadata.color)}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          handleNameClick = {this.handleItemClick}
        >
          {item.name}
        </ColumnCheckIcon>
        <ColumnDesc>{item.description}</ColumnDesc>
        <ColumnDate date={item.created_at} />
      </Item>
    )
  },

  getList() {
    var items = this.state.items.map(item => {
      return this.renderItem(item)
    });

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return(
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyListItem>
    )
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
      <Lists.Container>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Description</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <Lists.List style={styles.list}>
          <Loading show={this.state.instancesStore.isLoading}>
            {this.getList()}
          </Loading>
        </Lists.List>
      </Lists.Container>
    );
  }
});
