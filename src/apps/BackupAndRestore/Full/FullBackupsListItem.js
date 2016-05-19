import React from 'react';
import Filesize from 'filesize';

import {MenuItem} from 'syncano-material-ui';
import {ColumnList, Color, Truncate} from '../../../common';

const Column = ColumnList.Column;

const FullBackupsListItem = ({item, onIconClick, showDeleteDialog}) =>
  <ColumnList.Item
    checked={item.checked}
    key={item.id}
    id={item.id}>
    <ColumnList.Column.CheckIcon
      className="col-sm-10"
      id={item.id.toString()}
      iconClassName='backup-restore'
      background={Color.getColorByName('blue', 'xlight')}
      checked={item.checked}
      handleIconClick={onIconClick}
      primaryText={
        <Truncate text={item.label}/>
      }/>
    <Column.Desc>{item.description}</Column.Desc>
    <ColumnList.Column.Text>{item.status}</ColumnList.Column.Text>
    <ColumnList.Column.Text>{Filesize(item.size)}</ColumnList.Column.Text>
    <Column.Date date={item.created_at}/>
    <Column.Menu>
      <MenuItem
        className="dropdown-full-backup-details"
        onTouchTap={() => console.log('details')}
        primaryText="Details" />
      <MenuItem
        className="dropdown-full-backup-download"
        onTouchTap={() => console.log('restore')}
        primaryText="Restore" />
      <MenuItem
        className="dropdown-full-backup-delete"
        onTouchTap={showDeleteDialog}
        primaryText="Delete" />
    </Column.Menu>
  </ColumnList.Item>;

FullBackupsListItem.displayName = 'FullBackupListItem';
FullBackupsListItem.propTypes = {
  onIconClick: React.PropTypes.func.isRequired,
  showDeleteDialog: React.PropTypes.func.isRequired
};

export default FullBackupsListItem;
