import React, {Component} from 'react';

import FullBackupActions from './Full/FullBackupsActions';
import PartialBackupsActions from './Partial/PartialBackupsActions';
import RestoreFromFileDialogActions from './RestoreFromFileDialogActions';

import BackupsInnerToolbar from './BackupsInnerToolbar';
import FullBackupsDialog from './Full/FullBackupsDialog';
import PartialBackupsDialog from './Partial/PartialBackupsDialog';
import RestoreFromFileDialog from './RestoreFromFileDialog';
import {ListItem, FontIcon, RaisedButton} from 'material-ui';
import {colors as Colors} from 'material-ui/styles';
import {Popover} from '../../common';

export default class BackupAndRestore extends Component {
  handleCreateBackup(type) {
    const createBackup = {
      full: FullBackupActions.showDialog,
      partial: PartialBackupsActions.showDialog
    };

    createBackup[type]();
    this.refs.createBackupPopover.hide();
  }

  togglePopover(event) {
    if (this.refs.createBackupPopover) {
      this.refs.createBackupPopover.toggle(event);
    }
  }

  render() {
    const {children} = this.props;

    return (
      <div>
        <FullBackupsDialog />
        <PartialBackupsDialog />
        <RestoreFromFileDialog />
        <BackupsInnerToolbar>
          <RaisedButton
            label="Restore from file"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={RestoreFromFileDialogActions.showDialog} />
          <RaisedButton
            label="Create Backup"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={this.togglePopover.bind(this)}/>
          <Popover
            ref="createBackupPopover"
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            style={{padding: '8px 0'}}>
            <ListItem
              leftIcon={
                <FontIcon
                  color={Colors.blue400}
                  className="synicon-backup-restore"
                />
              }
              onTouchTap={() => this.handleCreateBackup('full')}
              primaryText="Full Backup"/>
            <ListItem
              leftIcon={<FontIcon color={Colors.blue400} className="synicon-backup-restore"/>}
              onTouchTap={() => this.handleCreateBackup('partial')}
              primaryText="Partial Backup"/>
          </Popover>
        </BackupsInnerToolbar>
        {children}
      </div>
    );
  }
}
