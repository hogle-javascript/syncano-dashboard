import React, {Component} from 'react';
import {RouteHandler} from 'react-router';

import BackupsInnerToolbar from './BackupsInnerToolbar';
import {ListItem, FontIcon, RaisedButton, Styles} from 'syncano-material-ui';
import {Popover} from '../../common';

export default class BackupAndRestore extends Component {
  handleCreateBackup(type) {
    const createBackup = {
      full: () => console.log('create full backup'),
      partial: () => console.log('create partial backup')
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
    return (
      <div>
        <BackupsInnerToolbar>
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
                  color={Styles.Colors.blue400}
                  className="synicon-backup-restore"
                />
              }
              onTouchTap={() => this.handleCreateBackup('full')}
              primaryText="Full Backup"/>
            <ListItem
              leftIcon={<FontIcon color={Styles.Colors.blue400} className="synicon-backup-restore"/>}
              onTouchTap={() => this.handleCreateBackup('partial')}
              primaryText="Partial Backup"/>
          </Popover>
        </BackupsInnerToolbar>
        <RouteHandler />
      </div>
    );
  }
};
