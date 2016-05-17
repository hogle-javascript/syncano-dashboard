import React from 'react';

import {DialogsMixin} from '../../../mixins';

import Actions from './FulBackupsActions';
import Store from './FullBackupsStore';

import ListItem from './FullBackupsListItem';
import {ColumnList} from 'syncano-components';
import {Lists, Dialog} from '../../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'FullBackupsList',

  mixins: [
    DialogsMixin
  ],

  initDialogs() {
    const {isLoading} = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteFullBackupDialog',
        ref: 'deleteFullBackupDialog',
        title: 'Remove Full Backup',
        handleConfirm: Actions.removeBackups,
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
        key={`full-backup-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteFullBackupDialog', item)} />
    );
  },

  render() {
    const checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="full-backups-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            className="col-sm-10">
            Full Backups
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
              <Lists.MenuItem onTouchTap={() => this.showDialog('deleteFullBackupDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          checkItem={this.checkItem}
          key="full-backups-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
