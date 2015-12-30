import React from 'react';

import Actions from './DevicesActions';

import {ColumnList, Container, Lists} from '../../common';
import ListItem from './DevicesListItem';

let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'DevicesList',

  getDefaultProps() {
    return {
      itemIcon: 'android'
    };
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        icon={this.props.itemIcon}
        item={item}/>
    );
  },

  render() {
    let checkedItems = 5;

    return (
      <div>
        <Lists.Container>
          <ColumnList.Header>
            <Column.ColumnHeader
              primary={true}
              columnName="CHECK_ICON"
              className="col-xs-14">
              Device
            </Column.ColumnHeader>
            <Column.ColumnHeader
              className="col-xs-13"
              columnName="DESC">
              User
            </Column.ColumnHeader>
            <Column.ColumnHeader columnName="DESC">
              Active
            </Column.ColumnHeader>
            <Column.ColumnHeader columnName="DATE">
              Registered
            </Column.ColumnHeader>
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Device"
                multipleItemsText="Delete Devices"
                onTouchTap={this.test}/>
            </Lists.Menu>
          </ColumnList.Header>
          <Lists.List
            {...this.props}
            renderItem={this.renderItem}/>
        </Lists.Container>
      </div>
    );
  }
});
