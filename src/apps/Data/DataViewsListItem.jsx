import React from 'react';
import {Link, State} from 'react-router';

import Mixins from '../../mixins';

// Stores and Actions
import Actions from './DataViewsActions';

// Components
import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'DataViewsListItem',

  mixins: [
    State,
    Mixins.Dialogs
  ],

  render() {
    let item = this.props.item;

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id={item.name}
          icon='table'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <Common.ColumnList.Link
            name={item.name}
            link={item.links.self}
            tooltip="Copy Data Socket url"/>
        </Column.CheckIcon>
        <Column.Desc className="col-flex-1">{item.description}</Column.Desc>
        <Column.Desc className="col-xs-11">
          <Link to="classes-edit" params={{
            instanceName: this.getParams().instanceName,
            className: item.class
          }}>
            {item.class}
          </Link>
        </Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Data Socket" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Data Socket" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});

