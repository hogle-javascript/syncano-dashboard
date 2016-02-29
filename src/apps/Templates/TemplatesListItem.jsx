import React from 'react';
import {State, Navigation} from 'react-router';

import {DialogsMixin} from '../../mixins';

import Actions from './TemplatesActions';

import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList, Truncate} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'TemplatesListItem',

  mixins: [
    State,
    Navigation,
    DialogsMixin
  ],

  handleItemClick(templateName) {
    this.transitionTo('template', {
      instanceName: this.getParams().instanceName,
      templateName
    });
  },

  render() {
    const {item, onIconClick, showDeleteDialog} = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-16"
          id={item.name.toString()}
          iconClassName='arrow-up-bold'
          keyName="name"
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={
            <Truncate
              onClick={() => this.handleItemClick(item.name)}
              text={item.name}
              style={{cursor: 'pointer'}}/>
          }>
        </Column.CheckIcon>
        <Column.Desc className="col-flex-1">{item.content_type}</Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Template Socket" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Template Socket" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

