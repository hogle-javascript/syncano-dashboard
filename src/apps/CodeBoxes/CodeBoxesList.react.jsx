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
      <Item
        checked     = {item.checked}
        key         = {item.id}
        id          = {item.id}
        handleClick = {this.handleItemClick}
      >
        <ColumnCheckIcon
          id              = {item.id}
          icon            = {runtime.icon}
          background      = {runtime.color}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          handleNameClick = {this.handleItemClick}
        >
          {item.label}
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
    return (
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyListItem>
    );
  },

  render() {
    return (
      <Lists.Container>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Description</ColumnDesc.Header>
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
