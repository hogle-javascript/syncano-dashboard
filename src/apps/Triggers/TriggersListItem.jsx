import React from 'react';
import {Link, State} from 'react-router';

import {DialogsMixin} from '../../mixins';

import Actions from './TriggersActions';
import ScriptsStore from '../Scripts/ScriptsStore';
import ClassesStore from '../Classes/ClassesStore';

import {MenuItem, Styles} from 'syncano-material-ui';
import {ColumnList} from 'syncano-components';
import {DataObjectsAmount} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'TriggersListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  mixins: [
    State,
    DialogsMixin
  ],

  render() {
    const {item, onIconClick, showDeleteDialog} = this.props;
    const script = ScriptsStore.getScriptById(item.codebox);
    const scriptLabel = script ? script.label : '';
    const instanceName = this.getParams().instanceName;
    const itemClass = ClassesStore.getClassByName(item.class);

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon.Socket
          id={item.id.toString()}
          iconClassName="socket-trigger"
          iconColor={Styles.Colors.amberA200}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.label}/>
        <Column.Desc className="col-flex-1">
          <DataObjectsAmount
            className={itemClass ? itemClass.name : null}
            dataObjects={itemClass.objects_count} />
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link to="script" params={{
            instanceName,
            scriptId: item.codebox
          }}>
            {scriptLabel}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link
            to="trigger-traces"
            params={{
              instanceName,
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
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Trigger" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
