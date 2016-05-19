import React from 'react';
import {Link} from 'react-router';

import Actions from './SchedulesActions';
import ScriptsStore from '../Scripts/ScriptsStore';

import {MenuItem, Styles} from 'syncano-material-ui';
import {ColumnList} from '../../common/';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'SchedulesListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  contextTypes: {
    params: React.PropTypes.object
  },

  render() {
    const {instanceName} = this.context.params;
    const {item, onIconClick, showDeleteDialog} = this.props;
    const script = ScriptsStore.getScriptById(item.script);
    const scriptLabel = script ? script.label : '';

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon.Socket
          id={item.id.toString()}
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
          <Link to={{
            name: 'script',
            params: {
              instanceName,
              scriptId: item.script
            }
          }}>
            {scriptLabel}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          <Link to={{
            name: 'schedule-traces',
            params: {
              instanceName,
              scheduleId: item.id
            }
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
