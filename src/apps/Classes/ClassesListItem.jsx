import React from 'react';
import {Link, State, Navigation} from 'react-router';

import {DialogsMixin} from '../../mixins';

import Actions from './ClassesActions';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color} from 'syncano-components';
import {DataObjectsAmount} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ClassesListItem',

  mixins: [
    State,
    Navigation,
    DialogsMixin
  ],

  render() {
    const {item, onIconClick, showDeleteDialog} = this.props;
    const metadata = item.metadata;

    return (
      <ColumnList.Item
        key={item.name}
        id={item.name}
        checked={item.checked}>
        <Column.CheckIcon
          id={item.name}
          iconClassName={metadata && metadata.icon ? metadata.icon : 'table-large'}
          background={Color.getColorByName(metadata && metadata.color ? metadata.color : 'blue')}
          checked={item.checked}
          keyName="name"
          handleIconClick={onIconClick}
          primaryText={item.name}
          secondaryText={item.description}/>
        <Column.Desc className="col-flex-1">
          <DataObjectsAmount
            className={item.name}
            dataObjects={item.objects_count} />
        </Column.Desc>
        <Column.ID className="col-flex-1">
          <Link
            to="users"
            params={{
              instanceName: this.getParams().instanceName
            }}>
            {item.group}
          </Link>
        </Column.ID>
        <Column.Desc className="col-flex-1">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu handleClick={() => Actions.setClickedClass(item)}>
          <MenuItem
            className="dropdown-item-edit-class"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Class"/>
          <MenuItem
            className="dropdown-item-delete-class"
            disabled={item.protectedFromDelete}
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Class"/>
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
