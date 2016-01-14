import React from 'react';
import {Link, State, Navigation} from 'react-router';

import {DialogsMixin} from '../../mixins';

import Actions from './ClassesActions';
import Store from './ClassesStore';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color, Truncate} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ClassesListItem',

  mixins: [
    State,
    Navigation,
    DialogsMixin
  ],

  handleClassDropdownClick(item) {
    Actions.setClickedClass(item);
  },

  handleItemNameClick(className) {
    console.info('ClassesListItem::handleItemClick');
    this.transitionTo('classes-data-objects', {
      instanceName: this.getParams().instanceName,
      className
    });
  },

  redirectToEditClassView(className) {
    let classNameParam = className || Store.getCheckedItem().name;

    this.transitionTo('classes-edit', {
      instanceName: this.getParams().instanceName,
      className: classNameParam
    });
  },

  render() {
    let item = this.props.item;
    let objectsCount = item.objects_count < 1000 ? item.objects_count : `~ ${item.objects_count}`;
    let metadata = item.metadata;

    return (
      <ColumnList.Item
        key={item.name}
        id={item.name}
        checked={item.checked}>
        <Column.CheckIcon
          id={item.name.toString()}
          icon={metadata && metadata.icon ? metadata.icon : 'table-large'}
          background={Color.getColorByName(metadata && metadata.color ? metadata.color : 'blue')}
          checked={item.checked}
          keyName="name"
          handleIconClick={this.props.onIconClick}>
          <Truncate
            onClick={this.handleItemNameClick.bind(null, item.name)}
            style={{cursor: 'pointer'}}
            text={item.name}/>
        </Column.CheckIcon>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.ID className="col-xs-3 col-md-3">
          <Link
            to="users"
            params={{
              instanceName: this.getParams().instanceName
            }}>
            {item.group}
          </Link>
        </Column.ID>
        <Column.Desc className="col-xs-6 col-md-6">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </Column.Desc>
        <Column.ID className="col-xs-4 col-md-4">
          {objectsCount}
        </Column.ID>
        <Column.Date date={item.created_at}/>
        <Column.Menu handleClick={this.handleClassDropdownClick.bind(null, item)}>
          <MenuItem
            className="dropdown-item-edit-class"
            onTouchTap={this.redirectToEditClassView.bind(null, item.name)}
            primaryText="Edit a Class"/>
          <MenuItem
            className="dropdown-item-customize-class"
            onTouchTap={this.props.showCustomizeDialog}
            primaryText="Customize a Class"/>
          <MenuItem
            className="dropdown-item-delete-class"
            disabled={item.protectedFromDelete}
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Class"/>
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
