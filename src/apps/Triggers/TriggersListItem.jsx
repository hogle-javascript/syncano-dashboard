import React from 'react';

import {Dialogs} from '../../mixins';

import Actions from './TriggersActions';
import SnippetsStore from '../Snippets/SnippetsStore';

import MenuItem from 'syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'TriggersListItem',

  mixins: [
    Dialogs
  ],

  render() {
    let item = this.props.item;
    let snippet = SnippetsStore.getSnippetById(item.codebox);
    let snippetLabel = snippet ? snippet.label : '';

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='arrow-up-bold'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          {item.label}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Desc className="col-flex-1">{item.class}</Column.Desc>
        <Column.Desc className="col-sm-4">{snippetLabel}</Column.Desc>
        <Column.Desc className="col-sm-7">{item.signal}</Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Trigger" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Trigger" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});
