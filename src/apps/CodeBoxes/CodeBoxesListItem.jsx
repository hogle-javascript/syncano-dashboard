import React from 'react';
import {Link, State} from 'react-router';

import {SnackbarNotificationMixin} from '../../mixins';

import Actions from './CodeBoxesActions';
import SnippetsStore from '../Snippets/SnippetsStore';

import {MenuItem, FontIcon} from 'syncano-material-ui';
import {Color, ColumnList, Truncate, Clipboard, Tooltip} from 'syncano-components';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'CodeBoxesListItem',

  mixins: [
    State,
    SnackbarNotificationMixin
  ],

  render() {
    let {item, onIconClick, showDeleteDialog} = this.props;
    let publicString = item.public.toString();
    let link = item.public ? item.links['public-link'] : item.links.self;
    let snippet = SnippetsStore.getSnippetById(item.codebox);
    let snippetLabel = snippet ? snippet.label : '';

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
          handleIconClick={onIconClick}
          primaryText={item.name}
          secondaryText={
            <Clipboard
              copyText={link}
              onCopy={() => this.setSnackbarNotification({
                message: 'Script Socket url copied!'
              })}>
              <Tooltip tooltip="Copy Script Socket url">
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
          <Link
            to="snippet"
            params={{
              instanceName: this.getParams().instanceName,
              snippetId: item.codebox
            }}>
            {snippetLabel}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link
            to="codeBox-traces"
            params={{
              instanceName: this.getParams().instanceName,
              codeBoxName: item.name
            }}>
            Traces
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">{publicString}</Column.Desc>
        <Column.Desc className="col-flex-1"/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Script Socket" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Script Socket" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

