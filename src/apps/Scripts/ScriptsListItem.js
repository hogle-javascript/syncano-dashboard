import React from 'react';
import {State} from 'react-router';
import _ from 'lodash';

import Actions from './ScriptsActions';
import Store from './ScriptsStore';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Truncate} from 'syncano-components';
import {LinkWrapper} from '../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptsListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  mixins: [State],

  render() {
    const {item, onIconClick, showDeleteDialog} = this.props;
    const runtime = Store.getRuntimeColorIcon(item.runtime_name) || {};

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}
        id={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          iconClassName={runtime.icon}
          background={runtime.color}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={
            <LinkWrapper
              to="script"
              params={_.merge({}, this.getParams(), {scriptId: item.id})}>
              <Truncate text={item.label}/>
            </LinkWrapper>
          }
          secondaryText={`ID: ${item.id}`}/>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-script-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit" />
          <MenuItem
            className="dropdown-item-script-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
