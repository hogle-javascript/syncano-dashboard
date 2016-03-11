import React from 'react';
import {Link, State} from 'react-router';

import {DialogsMixin} from '../../mixins';

import Actions from './TriggersActions';
import ScriptsStore from '../Scripts/ScriptsStore';

import {MenuItem, Styles} from 'syncano-material-ui';
import {ColumnList} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'TriggersListItem',

  mixins: [
    State,
    DialogsMixin
  ],

  render() {
    const {item} = this.props;
    const script = ScriptsStore.getScriptById(item.codebox);
    const scriptLabel = script ? script.label : '';

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon.Socket
          id={item.id.toString()}
          iconClassName="socket-trigger"
          iconColor={Styles.Colors.amberA200}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}
          primaryText={item.label}/>
        <Column.Desc className="col-flex-1">
          {item.class}
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link to="script" params={{
            instanceName: this.getParams().instanceName,
            scriptId: item.codebox
          }}>
            {scriptLabel}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link
            to="trigger-traces"
            params={{
              instanceName: this.getParams().instanceName,
              triggerId: item.id
            }}>
            Traces
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          {item.signal}
        </Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Trigger" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Trigger" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
