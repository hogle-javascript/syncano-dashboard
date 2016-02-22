import React from 'react';
import {State, Link} from 'react-router';

import Actions from './SchedulesActions';
import ScriptsStore from '../Scripts/ScriptsStore';

import {MenuItem, Styles} from 'syncano-material-ui';
import {ColumnList} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'SchedulesListItem',

  mixins: [State],

  render() {
    const {item, onIconClick, showDeleteDialog} = this.props;
    const script = ScriptsStore.getScriptById(item.codebox);
    const scriptLabel = script ? script.label : '';

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          withCircle={false}
          iconClassName="socket-schedule"
          iconColor={Styles.Colors.lime400}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={item.label}
          secondaryText={`ID: ${item.id}`}/>
        <Column.Date
          className="col-flex-1"
          date={item.scheduled_next} />
        <Column.Desc className="col-flex-1">
          <Link to="script" params={{
            instanceName: this.getParams().instanceName,
            scriptId: item.codebox
          }}>
            {scriptLabel}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link to="schedule-traces" params={{
            instanceName: this.getParams().instanceName,
            scheduleId: item.id
          }}>
            Traces
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          {item.crontab}
        </Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Schedule Socket" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Schedule Socket" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

