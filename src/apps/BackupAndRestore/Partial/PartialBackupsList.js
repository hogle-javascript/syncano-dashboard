import React from 'react';

import {DialogsMixin} from '../../../mixins';

import Actions from './PartialBackupsActions';
import Store from './PartialBackupsStore';

import ListItem from './PartialBackupsListItem';
import {ColumnList, Lists, Dialog} from '../../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'PartialBackupsList',

  mixins: [
    DialogsMixin
  ],

  initDialogs() {
    const {isLoading} = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deletePartialBackupDialog',
        ref: 'deletePartialBackupDialog',
        title: 'Remove Partial Backup',
        handleConfirm: Actions.removePartialBackups,
        items: Store.getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Backup',
        isLoading
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`partial-backup-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deletePartialBackupDialog', item)} />
    );
  },

  render() {
    const checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="partial-backups-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-sm-10">
            Partial Backups
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="TEXT">Status</Column.ColumnHeader>
          <Column.ColumnHeader columnName="TEXT">Size</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE"></Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}>
              <Lists.MenuItem onTouchTap={() => this.showDialog('deletePartialBackupDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemContent='Create Partial Backup'
          checkItem={this.checkItem}
          key="partial-backups-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
