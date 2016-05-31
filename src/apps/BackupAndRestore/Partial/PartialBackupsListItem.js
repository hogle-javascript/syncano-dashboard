import React from 'react';
import Filesize from 'filesize';

import RestoreDialogActions from '../RestoreDialogActions';

import {MenuItem} from 'material-ui';
import {ColumnList, Color, Truncate} from '../../../common';

const Column = ColumnList.Column;

const PartialBackupsListItem = ({item, onIconClick, showDeleteDialog, showRestoreDialog}) =>
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
      }
      secondaryText={`ID: ${item.id}`}/>
    <Column.Desc>{item.description}</Column.Desc>
    <ColumnList.Column.Text>{item.status}</ColumnList.Column.Text>
    <ColumnList.Column.Text>{Filesize(item.size)}</ColumnList.Column.Text>
    <ColumnList.Column.Text>
      <Truncate
        withTooltip={true}
        text={item.author.email} />
    </ColumnList.Column.Text>
    <Column.Date date={item.created_at}/>
    <Column.Menu handleClick={() => RestoreDialogActions.setClickedBackup(item)}>
      <MenuItem
        className="dropdown-partial-backup-download"
        onTouchTap={() => window.open(item.archive, '_self')}
        primaryText="Download" />
      <MenuItem
        className="dropdown-partial-backup-download"
        onTouchTap={showRestoreDialog}
        primaryText="Restore" />
      <MenuItem
        className="dropdown-partial-backup-delete"
        onTouchTap={showDeleteDialog}
        primaryText="Delete" />
    </Column.Menu>
  </ColumnList.Item>;

PartialBackupsListItem.displayName = 'PartialBackupListItem';
PartialBackupsListItem.propTypes = {
  onIconClick: React.PropTypes.func.isRequired,
  showDeleteDialog: React.PropTypes.func.isRequired
};

export default PartialBackupsListItem;
