import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './TriggersActions';
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';

// Components
import Common from '../../common';
import MenuItem from 'material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'TriggersList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      items: this.props.items,
      isLoading: this.props.isLoading
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      isLoading: nextProps.isLoading
    });
  },

  // List
  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  handleItemClick(itemId) {
    // Redirect to traces screen
    this.transitionTo('trigger-traces', {
      instanceName: this.getParams().instanceName,
      triggerId: itemId
    });
  },

  showMenuDialog(listItem, handleConfirm, event) {
    this.refs.menuDialog.show(listItem.label, handleConfirm, event.target.innerHTML);
  },

  renderItem(item) {
    let codeBox = CodeBoxesStore.getCodeBoxById(item.codebox);
    let codeBoxLabel = codeBox ? codeBox.label : '';

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}
        handleClick={this.handleItemClick.bind(null, item.id)}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='arrow-up-bold'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}>
          {item.label}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Desc className="col-sm-6">{codeBoxLabel}</Column.Desc>
        <Column.Desc className="col-sm-6">{item.class}</Column.Desc>
        <Column.Desc>{item.signal}</Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
          className="dropdown-item-edit"
          onTouchTap={Actions.showDialog.bind(null, item)}
          primaryText="Edit a Trigger" />
          <MenuItem
          className="dropdown-item-delete"
          onTouchTap={this.showMenuDialog.bind(null, item, Actions.removeTriggers.bind(null, [item]))}
          primaryText="Delete a Trigger" />
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
      <Common.Lists.Container className="triggers-list">
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-sm-6">
            CodeBox
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-sm-6">
            Class
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Signal</Column.ColumnHeader>
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

