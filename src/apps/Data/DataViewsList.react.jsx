import React from 'react';
import Router from 'react-router';

// Stores and Actions
import Actions from './DataViewsActions';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Components
import Common from '../../common';
import MenuItem from 'material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'DataViewsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  // List
  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  showMenuDialog(listItem, handleConfirm, event) {
    this.refs.menuDialog.show(listItem.name, handleConfirm, event.target.innerHTML)
  },

  renderItem(item) {
    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.name}>
        <Column.CheckIcon
          id={item.name}
          icon='table'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}>
          {item.name}
        </Column.CheckIcon>
        <Column.Desc className="col-flex-1">{item.description}</Column.Desc>
        <Column.Desc className="col-xs-9">{item.class}</Column.Desc>
        <Column.Date date={item.created_at} />
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Data Endpoint" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.showMenuDialog.bind(null, item, Actions.removeDataViews.bind(null, [item]))}
            primaryText="Delete a Data Endpoint" />
        </Column.Menu>
      </Common.ColumnList.Item>
    )
  },

  renderList() {
    let items = this.props.items.map((item) => this.renderItem(item));

    if (items.length > 0) {
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
        <Common.ColumnList.Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Description
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-9">
            Class
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU"></Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.props.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});

