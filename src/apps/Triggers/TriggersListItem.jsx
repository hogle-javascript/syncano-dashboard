import React from 'react';
import {Link, State} from 'react-router';

import {DialogsMixin} from '../../mixins';

import Actions from './TriggersActions';
import SnippetsStore from '../Snippets/SnippetsStore';

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
    const snippet = SnippetsStore.getSnippetById(item.codebox);
    const snippetLabel = snippet ? snippet.label : '';

    return (
      <ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          withCircle={false}
          iconClassName="socket-trigger"
          iconColor={Styles.Colors.amberA200}
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
          <Link to="snippet" params={{
            instanceName: this.getParams().instanceName,
            snippetId: item.codebox
          }}>
            {snippetLabel}
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
