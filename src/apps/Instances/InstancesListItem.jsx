import React from 'react';

import Mixins from '../../mixins/';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';
import InstancesActions from './InstancesActions';

import MenuItem from 'syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'InstancesListItem',

  mixins: [
    Mixins.Dialogs
  ],

  handleItemClick(instanceName) {
    SessionActions.fetchInstance(instanceName);
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
    let handleRemoveUserInstance = InstancesActions.removeInstances.bind(null, [item]);
    let handleRemoveShared = InstancesActions.removeSharedInstance.bind(null, [item], SessionStore.getUser().id);
    let handleRemoveInstance = Store.amIOwner(item) ? handleRemoveUserInstance : handleRemoveShared;

    item.metadata = item.metadata || {};

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}
        handleClick={this.handleItemClick.bind(null, item.name)}>
        <Column.CheckIcon
          id={item.name}
          icon={item.metadata.icon}
          background={Common.Color.getColorByName(item.metadata.color)}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}
          handleNameClick={this.handleItemClick}>
          {item.name}
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
            onTouchTap={this.showDialog.bind(null, 'pickColorIconDialog')}
            primaryText="Customize an Instance" />
          <MenuItem
            className="dropdown-item-instance-delete"
            onTouchTap={this.showMenuDialog.bind(null, item.name, handleRemoveInstance)}
            primaryText={removeText} />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});
