import React from 'react';
import {Link, State} from 'react-router';

import Actions from './DataViewsActions';

import {SnackbarNotificationMixin} from '../../mixins';

import {MenuItem, FontIcon} from 'syncano-material-ui';
import {Color, ColumnList, Truncate, Clipboard, Tooltip} from 'syncano-components';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DataViewsListItem',

  mixins: [
    State,
    SnackbarNotificationMixin
  ],

  render() {
    const {item, onIconClick, showDeleteDialog} = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id={item.name}
          icon='table'
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          keyName="name"
          handleIconClick={onIconClick}
          primaryText={item.name}
          primaryTextTooltip={item.description}
          secondaryText={
            <Clipboard
              copyText={item.links.self}
              onCopy={() => this.setSnackbarNotification({
                message: 'Data Socket url copied!'
              })}>
              <Tooltip tooltip="Copy Data Socket url">
                <div style={{display: 'flex'}}>
                  <Truncate text={item.links.self}/>
                  <FontIcon
                    color="#b8c0c9"
                    style={{fontSize: 16}}
                    className="synicon-link-variant" />
                </div>
              </Tooltip>
            </Clipboard>
          }/>
        <Column.Desc className="col-flex-1">
          <Link to="classes-edit" params={{
            instanceName: this.getParams().instanceName,
            className: item.class
          }}>
            {item.class}
          </Link>
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

