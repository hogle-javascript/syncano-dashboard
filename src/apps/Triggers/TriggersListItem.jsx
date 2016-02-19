import React from 'react';
import {Link, State} from 'react-router';

import {DialogsMixin} from '../../mixins';

import Actions from './TriggersActions';
import ScriptsStore from '../Scripts/ScriptsStore';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color} from 'syncano-components';

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
        <Column.CheckIcon
          id={item.id.toString()}
          icon='arrow-up-bold'
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}
          primaryText={item.label}/>
        <Column.Desc className="col-flex-1">
          <Link to="classes-edit" params={{
            instanceName: this.getParams().instanceName,
            className: item.class
          }}>
            {item.class}
          </Link>
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
