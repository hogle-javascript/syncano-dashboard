import React from 'react';
import {State, Link} from 'react-router';

// Stores and Actions
import Actions from './SchedulesActions';
import SnippetsStore from '../Snippets/SnippetsStore';

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
    let snippet = SnippetsStore.getSnippetById(item.codebox);
    let snippetLabel = snippet ? snippet.label : '';

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
          <Common.Truncate text={item.label}/>
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Desc className="col-flex-1">{item.crontab}</Column.Desc>
        <Column.Desc className="col-sm-4">
          <Link to="snippet-edit" params={{
            instanceName: this.getParams().instanceName,
            snippetId: item.codebox
          }}>
            {snippetLabel}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-sm-4">
          <Link to="schedule-traces" params={{
            instanceName: this.getParams().instanceName,
            scheduleId: item.id
          }}>
            Traces
          </Link>
        </Column.Desc>
        <Column.Date className="col-sm-3" date={item.scheduled_next}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Schedule Socket" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText="Delete a Schedule Socket" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});

