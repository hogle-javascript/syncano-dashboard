import React from 'react';

import Actions from './ScriptsActions';
import Store from './ScriptsStore';

import {MenuItem} from 'material-ui';
import {ColumnList, Truncate, LinkWrapper} from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptsListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  contextTypes: {
    params: React.PropTypes.object
  },

  render() {
    const {params} = this.context;
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
              to={{
                name: 'script',
                params: {...params, scriptId: item.id}
              }}>
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
