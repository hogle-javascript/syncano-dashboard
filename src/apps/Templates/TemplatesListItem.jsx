import React from 'react';
import {State, Navigation} from 'react-router';
import _ from 'lodash';

import {DialogsMixin} from '../../mixins';

import Actions from './TemplatesActions';

import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList, Truncate} from 'syncano-components';
import {LinkWrapper} from '../../common/';

const Column = ColumnList.Column;

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
          className="col-xs-12"
          id={item.name}
          iconClassName="arrow-up-bold"
          keyName="name"
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={
            <LinkWrapper
              to="template"
              params={_.merge({}, this.getParams(), {templateName: item.name})}>
              <Truncate text={item.name}/>
            </LinkWrapper>
          }>
        </Column.CheckIcon>
        <Column.Desc className="col-flex-1">{item.content_type}</Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Template" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Template" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
