import React from 'react';

import Actions from './ChannelsActions';

import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ChannelsListItem',

  render() {
    let item = this.props.item;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id={item.name}
          icon={'bullhorn'}
          keyName="name"
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <ColumnList.Link
            name={item.name}
            link={item.links.poll}
            tooltip="Copy Channel Socket url"/>
        </Column.CheckIcon>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Desc className="col-xs-4 col-md-4">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </Column.Desc>
        <Column.Desc className="col-xs-4 col-md-4">{item.type}</Column.Desc>
        <Column.Desc className="col-xs-3 col-md-3">
          {item.custom_publish ? 'Yes' : 'No'}
        </Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Channel Socket"/>
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Channel Socket"/>
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
