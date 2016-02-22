import React from 'react';
import {State, Navigation} from 'react-router';

import Actions from './ScriptsActions';
import Store from './ScriptsStore';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Truncate} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptsListItem',

  mixins: [
    State,
    Navigation
  ],

  handleItemClick(itemId) {
    this.transitionTo('script', {
      instanceName: this.getParams().instanceName,
      scriptId: itemId
    });
  },

  render() {
    let item = this.props.item;
    let runtime = Store.getRuntimeColorIcon(item.runtime_name) || {};

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}
        id={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          iconClassName={runtime.icon}
          background={runtime.color}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}
          primaryText={
            <Truncate
              onClick={this.handleItemClick.bind(null, item.id)}
              text={item.label}
              style={{cursor: 'pointer'}}/>
          }
          secondaryText={`ID: ${item.id}`}/>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-script-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Script" />
          <MenuItem
            className="dropdown-item-script-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Script" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
