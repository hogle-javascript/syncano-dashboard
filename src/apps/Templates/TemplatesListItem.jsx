import React from 'react';
import _ from 'lodash';

import Actions from './TemplatesActions';
import SessionStore from '../Session/SessionStore';

import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList, Truncate} from 'syncano-components';
import {LinkWrapper} from '../../common/';

const Column = ColumnList.Column;

export default ({item, onIconClick, showDeleteDialog}) => {
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
            params={_.merge({}, SessionStore.router.getCurrentParams(), {templateName: item.name})}>
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
};
