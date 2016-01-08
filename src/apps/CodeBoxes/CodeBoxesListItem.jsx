import React from 'react';
import {Link, State} from 'react-router';

import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './CodeBoxesActions';

// Components
import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'CodeBoxesListItem',

  mixins: [
    State,
    DialogsMixin
  ],

  render() {
    let item = this.props.item;
    let publicString = item.public.toString();
    let link = item.public ? item.links['public-link'] : item.links.self;

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id={item.name.toString()}
          icon='arrow-up-bold'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <Common.ColumnList.Link
            name={item.name}
            link={link}
            tooltip="Copy CobeBox Socket url"/>
        </Column.CheckIcon>
        <Column.Desc className="col-flex-1">{item.description}</Column.Desc>
        <Column.Desc className="col-xs-4">
          <Link
            to="codeBox-traces"
            params={{
              instanceName: this.getParams().instanceName,
              codeBoxName: item.name
            }}>
            Traces
          </Link>
        </Column.Desc>
        <Column.Desc className="col-xs-4">
          <Link
            to="snippet"
            params={{
              instanceName: this.getParams().instanceName,
              snippetId: item.codebox
            }}>
            {item.codebox}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-xs-3">{publicString}</Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a CodeBox Socket" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a CodeBox Socket" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});

