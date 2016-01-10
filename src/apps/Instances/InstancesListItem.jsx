import React from 'react';
import {Navigation} from 'react-router';

import {DialogsMixin} from '../../mixins/';

// Stores and Actions
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color} from '../../common';
import {Truncate} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'InstancesListItem',

  mixins: [
    Navigation,
    DialogsMixin
  ],

  handleItemClick(instanceName) {
    this.transitionTo('instance', {instanceName});
  },

  handleClickItemDropdown(item) {
    Actions.setClickedInstance(item);
  },

  showInstanceEditDialog(instance) {
    InstanceDialogActions.showDialog(instance);
  },

  render() {
    let item = this.props.item;
    let removeText = Store.amIOwner(item) ? 'Delete an Instance' : 'Leave an Instance';

    item.metadata = item.metadata || {};

    return (
      <ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}>
        <Column.CheckIcon
          id={item.name}
          icon={item.metadata.icon}
          background={Color.getColorByName(item.metadata.color)}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <Truncate
            onClick={this.handleItemClick.bind(null, item.name)}
            style={{cursor: 'pointer'}}
            text={item.name}/>
        </Column.CheckIcon>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu handleClick={this.handleClickItemDropdown.bind(null, item)}>
          <MenuItem
            className="dropdown-item-instance-edit"
            onTouchTap={this.showInstanceEditDialog.bind(null, item)}
            primaryText="Edit an Instance" />
          <MenuItem
            className="dropdown-item-customize"
            onTouchTap={this.props.showCustomizeDialog}
            primaryText="Customize an Instance" />
          <MenuItem
            className="dropdown-item-instance-delete"
            onTouchTap={this.props.showDeleteDialog}
            primaryText={removeText} />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
