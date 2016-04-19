import React from 'react';
import {Link, State} from 'react-router';

import {SnackbarNotificationMixin} from '../../mixins';

import Actions from './ScriptEndpointsActions';
import ScriptsStore from '../Scripts/ScriptsStore';

import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList, Clipboard} from 'syncano-components';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptEndpointsListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  mixins: [
    State,
    SnackbarNotificationMixin
  ],

  render() {
    let {item, onIconClick, showDeleteDialog} = this.props;
    let publicString = item.public.toString();
    let link = item.public ? item.links['public-link'] : item.links.self;
    let script = ScriptsStore.getScriptById(item.codebox);
    let scriptLabel = script ? script.label : '';

    return (
      <ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}>
        <Column.CheckIcon.Socket
          className="col-xs-12"
          id={item.name}
          iconClassName="socket-script-endpoint"
          iconColor={Color.getColorByName('red', 'light')}
          keyName="name"
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.name}
          secondaryText={
            <Clipboard
              text={link}
              copyText={`${SYNCANO_BASE_URL.slice(0, -1)}${link}`}
              onCopy={() => this.setSnackbarNotification({
                message: 'Script Endpoint url copied!'
              })}
              tooltip="Copy Script Endpoint url"
              type="link" />
          }/>
        <Column.Desc className="col-flex-1">
          {item.description}
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link
            to="script"
            params={{
              instanceName: this.getParams().instanceName,
              scriptId: item.codebox
            }}>
            {scriptLabel}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link
            to="scriptEndpoint-traces"
            params={{
              instanceName: this.getParams().instanceName,
              scriptEndpointName: item.name
            }}>
            Traces
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">{publicString}</Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

