import React from 'react';

import Actions from './DataViewsActions';

import {SnackbarNotificationMixin} from '../../mixins';

import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList, Clipboard} from 'syncano-components';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DataViewsListItem',

  mixins: [SnackbarNotificationMixin],

  render() {
    const {item, onIconClick, showDeleteDialog} = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.name}>
        <Column.CheckIcon.Socket
          className="col-xs-12"
          id={item.name}
          iconClassName="socket-data"
          iconColor={Color.getColorByName('green', 'light')}
          checked={item.checked}
          keyName="name"
          handleIconClick={onIconClick}
          primaryText={item.name}
          primaryTextTooltip={item.description}
          secondaryText={
            <Clipboard
              text={item.links.self}
              copyText={`${SYNCANO_BASE_URL.slice(0, -1)}${item.links.self}`}
              onCopy={() => this.setSnackbarNotification({
                message: 'Data Socket url copied!'
              })}
              type="link"
              tooltip="Copy Data Socket url" />
          }/>
        <Column.Desc className="col-flex-1">
          {item.description}
        </Column.Desc>
        <Column.Desc className="col-flex-3">
          {item.class}
        </Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Data Socket" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Data Socket" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

