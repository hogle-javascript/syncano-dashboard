import React from 'react';
import {withRouter} from 'react-router';

import {DialogsMixin} from '../../mixins/';

// Stores and Actions
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color, Truncate} from '../../common/';

let Column = ColumnList.Column;

export default withRouter(React.createClass({
  displayName: 'InstancesListItem',

  propTypes: {
    onIconClick: React.PropTypes.func.isRequired,
    showDeleteDialog: React.PropTypes.func.isRequired
  },

  mixins: [DialogsMixin],

  render() {
    const {item, onIconClick, showDeleteDialog, router} = this.props;

    return (
      <ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}>
        <Column.CheckIcon
          id={item.name}
          iconClassName={item.metadata.icon}
          background={Color.getColorByName(item.metadata.color)}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={
            <Truncate
              onClick={() => router.push({name: 'instance', params: {instanceName: item.name}})}
              style={{cursor: 'pointer'}}
              text={item.name}/>
          }/>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu handleClick={() => Actions.setClickedInstance(item)}>
          <MenuItem
            className="dropdown-item-instance-edit"
            onTouchTap={() => InstanceDialogActions.showDialog(item)}
            primaryText="Edit" />
          <MenuItem
            className="dropdown-item-instance-delete"
            onTouchTap={showDeleteDialog}
            primaryText={Store.amIOwner(item) ? 'Delete' : 'Leave'} />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
}));
