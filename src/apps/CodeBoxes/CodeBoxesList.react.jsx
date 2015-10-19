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
import MenuItem from 'material-ui/lib/menus/menu-item';

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
    this.setState({items: nextProps.items});
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

  showMenuDialog(listItem, handleConfirm, event) {
    this.refs.menuDialog.show(listItem.label, handleConfirm, event.target.innerHTML);
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
        <Column.Menu item={item}>
          <MenuItem
          className="dropdown-item-codebox-edit"
          onTouchTap={Actions.showDialog.bind(null, item)}
          primaryText="Edit a CodeBox" />
          <MenuItem
          className="dropdown-item-codebox-delete"
          onTouchTap={this.showMenuDialog.bind(null, item, Actions.removeCodeBoxes.bind(null, [item]))}
          primaryText="Delete a Codebox" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
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
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU"></Column.ColumnHeader>
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
