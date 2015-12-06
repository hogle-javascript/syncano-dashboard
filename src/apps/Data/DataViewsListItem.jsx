import React from 'react';

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
    Mixins.Dialogs
  ],

  handleClassClick(className) {
    let params = this.getParams();

    params.className = className;
    this.context.router.transitionTo('classes-edit', params);
  },

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
        <Column.Desc className="col-xs-5">
          <a onClick={this.handleClassClick.bind(this, item.class)}>{item.class}</a>
        </Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Data Endpoint" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.showMenuDialog.bind(null, item.name, Actions.removeDataViews.bind(null, [item]))}
            primaryText="Delete a Data Endpoint" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});

