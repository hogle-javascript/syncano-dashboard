import React from 'react';
import {State, Navigation} from 'react-router';

// Stores and Actions
import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'CodeBoxesListItem',

  mixins: [
    State,
    Navigation
  ],

  handleItemClick(itemId) {
    this.transitionTo('codebox-edit', {
      instanceName: this.getParams().instanceName,
      codeboxId: itemId
    });
  },

  render() {
    let item = this.props.item;
    let runtime = Store.getRuntimeColorIcon(item.runtime_name);

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}
        id={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon={runtime.icon}
          background={runtime.color}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <div style={{cursor: 'pointer'}} onClick={this.handleItemClick.bind(null, item.id)}>
            {item.label}
          </div>
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-codebox-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a CodeBox" />
          <MenuItem
            className="dropdown-item-codebox-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a CodeBox" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});
