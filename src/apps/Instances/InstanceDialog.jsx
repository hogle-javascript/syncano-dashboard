import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import moment from 'moment';

import {DialogMixin, DialogsMixin, FormMixin} from '../../mixins';

import Actions from './InstanceDialogActions';
import Store from './InstanceDialogStore';

import {TextField, FlatButton, DropDownMenu, MenuItem, FontIcon} from 'material-ui';
import {colors as Colors} from 'material-ui/styles/';
import DropZone from 'react-dropzone';
import {Color, Dialog, Icon, Notification, ColorIconPicker, Truncate, Show, Loading} from '../../common/';

export default React.createClass({
  displayName: 'InstanceDialog',

  mixins: [
    Reflux.connect(Store),
    Reflux.ListenerMixin,
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true,
      length: {
        minimum: 5
      }
    },
    description: {
      length: {
        maximum: 256
      }
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (!this.state._dialogVisible && nextState._dialogVisible && nextState._dialogMode !== 'edit') {
      Actions.fetchAllFullBackups();
      Actions.fetchAllPartialBackups();
      this.setState({
        name: Store.genUniqueName(),
        metadata: {
          color: Color.getRandomColorName(),
          icon: Icon.Store.getRandomIconPickerIcon()
        }
      });
    }
  },

  getStyles() {
    return {
      dropZone: {
        marginLeft: -8,
        height: 140,
        width: '70%',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#AAA',
        color: '#AAA',
        backgroundColor: '#EEE'
      },
      dropZoneContainer: {
        marginTop: 25
      },
      dropZoneDescription: {
        padding: 15,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        minHeight: '100%'
      },
      uploadIcon: {
        fontSize: 56,
        color: '#AAA'
      },
      dropdownHeaderItem: {
        paddingTop: 6,
        paddingBottom: 6,
        borderBottom: '1px solid #DDD',
        borderTop: '1px solid #DDD'
      },
      backupListItem: {
        fontSize: 11,
        color: '#AAA',
        fontWeight: 800,
        height: 15
      },
      restoreFromFileListItem: {
        paddingTop: 8,
        paddingBottom: 8
      }
    };
  },

  handleAddSubmit() {
    const {name, description, metadata, selectedBackup, backupFile} = this.state;

    if (this.props.handleSubmit) {
      this.listenTo(Actions.createInstance.completed, this.extendSubmit);
    }

    if (selectedBackup !== 'None') {
      const backup = selectedBackup === 'File' ? backupFile : selectedBackup;

      return Actions.createInstanceFromBackup({name, description, metadata}, backup);
    }

    Actions.createInstance({name, description, metadata});
  },

  handleEditSubmit() {
    const {name, initialName, description, metadata} = this.state;

    if (initialName && initialName !== name) {
      Actions.renameAndUpdateInstance(initialName, name, {description, metadata});
    } else {
      Actions.updateInstance(name, {description, metadata});
    }
  },

  handleColorChange(color) {
    const {metadata} = this.state;

    this.setState({metadata: _.merge({}, metadata, {color})});
  },

  handleIconChange(icon) {
    const {metadata} = this.state;

    this.setState({metadata: _.merge({}, metadata, {icon})});
  },

  handleInstanceNameFieldFocus() {
    const {name} = this.state;

    this.setState({
      notificationShowed: true,
      initialName: name
    });
  },

  handleChangeBackup(event, index, value) {
    this.setState({
      selectedBackup: value
    });
  },

  handleDropBackupFile(file) {
    this.setState({
      backupFile: file[0]
    });
  },

  initDialogs() {
    const {isLoading} = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteInstanceDialog',
        ref: 'deleteInstanceDialog',
        title: 'Delete an Instance',
        handleConfirm: Actions.removeInstances,
        items: [this.state],
        groupName: 'Instance',
        isLoading
      }
    }];
  },

  extendSubmit() {
    this.props.handleSubmit();
    this.stopListeningTo(Actions.createInstance.completed);
  },

  renderNotification() {
    return (
      <Notification type="warning">
        Do you want to change the name? It will affect all of your apps!
      </Notification>
    );
  },

  renderDropDownItems(fullBackups, partialBackups) {
    const styles = this.getStyles();
    const fileItem = (
      <MenuItem
        key="dropdownBackupFile"
        style={styles.restoreFromFileListItem}
        value="File"
        primaryText="Restore Instance from file" />
    );
    const emptyItem = (
      <MenuItem
        key="dropdownBackupEmpty"
        style={styles.restoreFromFileListItem}
        value="None"
        label="Restore instance from backup"
        primaryText="None" />
    );
    const fullBackupsHeader = (
      <MenuItem
        key="dropdownFullBackupHeader"
        style={styles.dropdownHeaderItem}
        disabled={true}
        primaryText="FULL BACKUPS" />
    );
    const partialBackupsHeader = (
      <MenuItem
        key="dropdownPartialBackupHeader"
        style={styles.dropdownHeaderItem}
        disabled={true}
        primaryText="PARTIAL BACKUPS" />
    );
    let partialBackupsItems = _.map(_.sortBy(partialBackups, 'instance'), (backup) => {
      const createdAt = moment().format('Do MM YYYY, HH:mm', backup.created_at);
      const text = <Truncate text={`${backup.label} ${createdAt}`} />;

      return (
        <MenuItem
          key={`dropdownPartialBackup${backup.id}`}
          value={backup.id}
          primaryText={text}>
          <div style={styles.backupListItem}>
            {backup.instance}
          </div>
        </MenuItem>
      );
    });

    partialBackupsItems.unshift(fileItem);
    partialBackupsItems.unshift(partialBackupsHeader);
    partialBackupsItems.unshift(emptyItem);

    if (!fullBackups.length) {
      return partialBackupsItems;
    }

    let fullBackupsItems = _.map(_.sortBy(fullBackups, 'instance'), (backup) => {
      const createdAt = moment().format('Do MM YYYY, HH:mm', backup.created_at);
      const text = <Truncate text={`${backup.label} ${createdAt}`} />;

      return (
        <MenuItem
          key={`dropdownFullBackup${backup.id}`}
          value={backup.id}
          primaryText={text}>
          <div style={styles.backupListItem}>
            {backup.instance}
          </div>
        </MenuItem>
      );
    });

    fullBackupsItems.unshift(fullBackupsHeader);

    return partialBackupsItems.concat(fullBackupsItems);
  },

  renderContent() {
    const {
      name,
      notificationShowed,
      fullBackups,
      partialBackups,
      description,
      selectedBackup,
      backupFile
    } = this.state;
    const styles = this.getStyles();
    const dropZoneDescription = backupFile ? backupFile.name : null;
    const title = this.hasEditMode() ? 'Update' : 'Add';

    return (
      <div>
        {DialogsMixin.getDialogs(this.initDialogs())}
        {this.renderFormNotifications()}
        <Dialog.ContentSection>
          <TextField
            ref="name"
            name="name"
            autoFocus={true}
            fullWidth={true}
            value={name}
            onChange={(event, value) => this.setState({name: value})}
            errorText={this.getValidationMessages('name').join(' ')}
            hintText="Instance's name"
            onFocus={this.handleInstanceNameFieldFocus}
            floatingLabelText="Name"/>
          {this.hasEditMode() && notificationShowed ? this.renderNotification() : null}
        </Dialog.ContentSection>
        <Dialog.ContentSection>
          <TextField
            ref="description"
            name="description"
            fullWidth={true}
            multiLine={true}
            value={description}
            onChange={(event, value) => this.setState({description: value})}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Instance's description"
            floatingLabelText="Description (optional)"/>
        </Dialog.ContentSection>
        <Show if={!this.hasEditMode()}>
          <DropDownMenu
            style={{width: '80%', marginLeft: -32}}
            onChange={this.handleChangeBackup}
            value={selectedBackup}>
            {this.renderDropDownItems(fullBackups, partialBackups)}
          </DropDownMenu>
        </Show>
        <Show if={!this.hasEditMode() && selectedBackup === 'File'}>
          <div style={styles.dropZoneContainer}>
            <DropZone
              onDrop={this.handleDropBackupFile}
              style={styles.dropZone}>
              <div style={styles.dropZoneDescription}>
                <FontIcon
                  style={styles.uploadIcon}
                  className={backupFile ? 'synicon-file' : 'synicon-cloud-upload'} />
                <div>
                  {dropZoneDescription || 'Click or Drag & Drop to upload partial backup file'}
                </div>
              </div>
            </DropZone>
          </div>
        </Show>
      </div>
    )
  },

  renderLoading() {
    return (
      <div>
        <div
          className="vm-3-b"
          style={{textAlign: 'center'}}>
          {`We're restoring your backup, please wait...`}
        </div>
        <Loading show={true} />
      </div>
    )
  },

  render() {
    const {
      open,
      metadata,
      isLoading,
      canSubmit,
      isRestoring
    } = this.state;
    const title = this.hasEditMode() ? 'Update' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={!isRestoring && `${title} an Instance`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        onConfirm={this.handleFormValidation}
        showCloseButton={!isRestoring}
        actions={!isRestoring &&
          <div>
            {this.hasEditMode()
              ? <FlatButton
                  style={{float: 'left'}}
                  labelStyle={{color: Colors.red400}}
                  label="DELETE AN INSTANCE"
                  onTouchTap={() => this.refs.deleteInstanceDialog.show()} />
              : null
            }
            <Dialog.StandardButtons
              disabled={!canSubmit}
              handleCancel={this.handleCancel}
              handleConfirm={this.handleFormValidation}/>
          </div>
        }
        sidebar={!isRestoring && [
          <Dialog.SidebarBox key="sidebarbox">
            <Dialog.SidebarSection>
              Instance gathers all the data associated with a project into a shared space. It can be an equivalent
               of an app or a piece of functionality.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection last={true}>
              <Dialog.SidebarLink to="http://docs.syncano.io/#adding-an-instance">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
          </Dialog.SidebarBox>,
          <ColorIconPicker
            key="coloriconpicker"
            icon={metadata.icon}
            color={metadata.color}
            onIconChange={this.handleIconChange}
            onColorChange={this.handleColorChange} />
        ]}>
        {!isRestoring ? this.renderContent() : this.renderLoading()}
      </Dialog.FullPage>
    );
  }
});
