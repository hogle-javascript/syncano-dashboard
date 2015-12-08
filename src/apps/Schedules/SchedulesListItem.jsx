import React from 'react';
import {State, Link} from 'react-router';

// Stores and Actions
import Actions from './SchedulesActions';
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';

// Components
import Common from '../../common';
import MenuItem from '../../../node_modules/syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'SchedulesListItem',

  mixins: [
    State
  ],

  render() {
    let item = this.props.item;
    let codeBox = CodeBoxesStore.getCodeBoxById(item.codebox);
    let codeBoxLabel = codeBox ? codeBox.label : '';

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon="camera-timer"
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          {item.label}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Desc className="col-sm-6">{codeBoxLabel}</Column.Desc>
        <Column.Desc>{item.crontab}</Column.Desc>
        <Column.Desc>
          <Link to="schedule-traces" params={{
            instanceName: this.getParams().instanceName,
            scheduleId: item.id
          }}>
            Traces
          </Link>
        </Column.Desc>
        <Column.Date date={item.scheduled_next}/>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Schedule" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Schedule" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});

