import React from 'react';
import {State} from 'react-router';

import {DialogsMixin} from '../../mixins';

import Actions from './TemplatesActions';

import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'TemplatesListItem',

  mixins: [
    State,
    DialogsMixin
  ],

  render() {
    let item = this.props.item;

    return (
      <ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id={item.name.toString()}
          icon='arrow-up-bold'
          keyName="name"
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
        </Column.CheckIcon>
        <Column.Desc className="col-flex-1">{item.name}</Column.Desc>
        <Column.Desc className="col-sm-6">{item.content_type}</Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Template Socket" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Template Socket" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

