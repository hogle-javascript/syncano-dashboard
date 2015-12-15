import React from 'react';

import Actions from './ChannelsActions';

import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ChannelsListItem',

  render() {
    let item = this.props.item;

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id={item.name}
          icon={'bullhorn'}
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <Common.ColumnList.Link
            name={item.name}
            link={item.links.poll}
            tooltip="Copy Channel Socket url"/>
        </Column.CheckIcon>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Desc className="col-xs-5 col-md-5">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </Column.Desc>
        <Column.Desc className="col-xs-5 col-md-5">{item.type}</Column.Desc>
        <Column.Desc className="col-xs-5 col-md-5">
          {item.custom_publish ? 'Yes' : 'No'}
        </Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-channel-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Channel"/>
          <MenuItem
            className="dropdown-item-channel-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Channel"/>
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});
