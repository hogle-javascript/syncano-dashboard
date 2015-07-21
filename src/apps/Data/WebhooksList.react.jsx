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

// List
import Lists from '../../common/Lists';
import Item from '../../common/ColumnList/Item.react';
import EmptyListItem from '../../common/ColumnList/EmptyListItem.react';
import Header from '../../common/ColumnList/Header.react';
import Loading from '../../common/Loading/Loading.react';
import ColumnDate from '../../common/ColumnList/Column/Date.react';
import ColumnID from '../../common/ColumnList/Column/ID.react';
import ColumnDesc from '../../common/ColumnList/Column/Desc.react';
import ColumnKey from '../../common/ColumnList/Column/Key.react';
import ColumnCheckIcon from '../../common/ColumnList/Column/CheckIcon.react';

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
      <Item
        checked = {item.checked}
        key     = {item.name}
      >
        <ColumnCheckIcon
          id              = {item.name.toString()}
          icon            = 'arrow-up-bold'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick} 
        >
          {item.name}
        </ColumnCheckIcon>
        <ColumnDesc className="col-xs-8">{item.description}</ColumnDesc>
        <ColumnDesc className="col-xs-8">{item.codebox}</ColumnDesc>
        <ColumnDesc>{item.public.toString()}</ColumnDesc>
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
    return (
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyListItem>
    )
  },

  render() {
    return (
      <Lists.Container>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header className="col-xs-8">Description</ColumnDesc.Header>
          <ColumnDesc.Header className="col-xs-8">CodeBox</ColumnDesc.Header>
          <ColumnDesc.Header>Public</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <Lists.List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </Lists.List>
      </Lists.Container>
    );
  }
});

