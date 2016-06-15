import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import moment from 'moment';

import { DialogMixin, DialogsMixin, FormMixin } from '../../mixins';

import Actions from './InstanceDialogActions';
import Store from './InstanceDialogStore';

import { TextField, FlatButton, DropDownMenu, MenuItem } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Color, Dialog, Icon, Notification, ColorIconPicker, Truncate, Show, Loading } from '../../common/';

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
      // Actions.fetchAllPartialBackups();
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
    const { name, description, metadata, selectedBackup, backupFile } = this.state;

    if (this.props.handleSubmit) {
      this.listenTo(Actions.createInstance.completed, this.extendSubmit);
    }

    if (selectedBackup !== 'None' || backupFile) {
      const backup = backupFile || selectedBackup;

      return Actions.createInstanceFromBackup({ name, description, metadata }, backup);
    }

    Actions.createInstance({ name, description, metadata });
  },

  handleEditSubmit() {
    const { name, initialName, description, metadata } = this.state;

    if (initialName && initialName !== name) {
      Actions.renameAndUpdateInstance(initialName, name, { description, metadata });
    } else {
      Actions.updateInstance(name, { description, metadata });
    }
  },

  handleColorChange(color) {
    const { metadata } = this.state;

    this.setState({ metadata: _.merge({}, metadata, { color }) });
  },

  handleIconChange(icon) {
    const { metadata } = this.state;

    this.setState({ metadata: _.merge({}, metadata, { icon }) });
  },

  handleInstanceNameFieldFocus() {
    const { name } = this.state;

    this.setState({
      notificationShowed: true,
      initialName: name
    });
  },

  handleChangeBackup(event, index, value) {
    this.setState({
      selectedBackup: value,
      backupFile: null
    });
  },

  handleUploadBackupFile(file) {
    this.setState({
      backupFile: file,
      selectedBackup: 'None'
    });
  },

  initDialogs() {
    const { isLoading } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteInstanceDialog',
        ref: 'deleteInstanceDialog',
        title: 'Delete an Instance',
        handleConfirm: Actions.removeInstances,
        items: [this.state],
        withConfirm: true,
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
    let partialBackupsItems = [];
    let fullBackupsItems = [];
    let allBackupsItems = [];
    const styles = this.getStyles();
    const emptyItem = (
      <MenuItem
        key="dropdownBackupEmpty"
        style={styles.restoreFromFileListItem}
        value="None"
        primaryText="None"
      />
    );
    const fullBackupsHeader = (
      <MenuItem
        key="dropdownFullBackupHeader"
        style={styles.dropdownHeaderItem}
        disabled
        primaryText="FULL BACKUPS"
      />
    );
    const partialBackupsHeader = (
      <MenuItem
        key="dropdownPartialBackupHeader"
        style={styles.dropdownHeaderItem}
        disabled
        primaryText="PARTIAL BACKUPS"
      />
    );

    if (!fullBackups.length && !partialBackups.length) {
      return emptyItem;
    }

    if (partialBackups.length) {
      partialBackupsItems = _.filter(_.sortBy(partialBackups, 'instance'), { status: 'success' })
        .map((backup) => {
          const createdAt = moment().format('Do MM YYYY, HH:mm', backup.created_at);
          const text = <Truncate text={`${backup.label} ${createdAt}`} />;

          return (
            <MenuItem
              key={`dropdownPartialBackup${backup.id}`}
              value={backup.id}
              primaryText={text}
            >
              <div style={styles.backupListItem}>
                {backup.instance}
              </div>
            </MenuItem>
          );
        });
      partialBackupsItems.unshift(partialBackupsHeader);
    }

    if (fullBackups.length) {
      fullBackupsItems = _.filter(_.sortBy(fullBackups, 'instance'), { status: 'success' })
        .map((backup) => {
          const createdAt = moment().format('Do MM YYYY, HH:mm', backup.created_at);
          const text = <Truncate text={`${backup.label} ${createdAt}`} />;

          return (
            <MenuItem
              key={`dropdownFullBackup${backup.id}`}
              value={backup.id}
              primaryText={text}
            >
              <div style={styles.backupListItem}>
                {backup.instance}
              </div>
            </MenuItem>
          );
        });
      fullBackupsItems.unshift(fullBackupsHeader);
    }

    allBackupsItems = partialBackupsItems.concat(fullBackupsItems);
    allBackupsItems.unshift(emptyItem);

    return allBackupsItems;
  },

  renderContent() {
    const {
      name,
      notificationShowed,
      fullBackups,
      partialBackups,
      // backupFile,
      description,
      selectedBackup
    } = this.state;

    return (
      <div>
        {DialogsMixin.getDialogs(this.initDialogs())}
        {this.renderFormNotifications()}
        <Dialog.ContentSection>
          <TextField
            ref="name"
            name="name"
            autoFocus
            fullWidth
            value={name}
            onChange={(event, value) => this.setState({ name: value })}
            errorText={this.getValidationMessages('name').join(' ')}
            hintText="Instance's name"
            onFocus={this.handleInstanceNameFieldFocus}
            floatingLabelText="Name"
          />
          {this.hasEditMode() && notificationShowed ? this.renderNotification() : null}
        </Dialog.ContentSection>
        <Dialog.ContentSection>
          <TextField
            ref="description"
            name="description"
            fullWidth
            multiLine
            value={description}
            onChange={(event, value) => this.setState({ description: value })}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Instance's description"
            floatingLabelText="Description (optional)"
          />
        </Dialog.ContentSection>
        <Show if={!this.hasEditMode()}>
          <Dialog.ContentSection
            className="vp-3-t"
            style={{ paddingTop: 16, marginLeft: -16 }}
            title="Restore Instance from backup"
          >
            <DropDownMenu
              className="col-sm-20"
              style={{ marginLeft: -24, maxWidth: 280 }}
              onChange={this.handleChangeBackup}
              value={selectedBackup}
            >
              {this.renderDropDownItems(fullBackups, partialBackups)}
            </DropDownMenu>
            {/* eslint-disable no-inline-comments*/}
            {/* <DropZone.UploadFileButton
              key="uploadBackupFile"
              primary={true}
              style={{marginTop: 12}}
              labelColor="#FFF"
              iconStyle={{color: '#FFF'}}
              iconClassName={backupFile ? 'synicon-file' : 'synicon-cloud-upload'}
              uploadButtonLabel={backupFile ? backupFile.name : 'Upload partial backup file'}
              getFile={this.handleUploadBackupFile} /> */}
          </Dialog.ContentSection>
        </Show>
      </div>
    );
  },

  renderLoading() {
    return (
      <div>
        <div
          className="vm-3-b"
          style={{ textAlign: 'center' }}
        >
          {'We\'re restoring your backup, please wait...'}
        </div>
        <Loading show />
      </div>
    );
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
                style={{ float: 'left' }}
                labelStyle={{ color: Colors.red400 }}
                label="DELETE AN INSTANCE"
                onTouchTap={() => this.refs.deleteInstanceDialog.show()}
              />
              : null
            }
            <Dialog.StandardButtons
              disabled={!canSubmit}
              handleCancel={this.handleCancel}
              handleConfirm={this.handleFormValidation}
            />
          </div>
        }
        sidebar={!isRestoring && [
          <Dialog.SidebarBox key="sidebarbox">
            <Dialog.SidebarSection>
              Instance gathers all the data associated with a project into a shared space. It can be an equivalent
               of an app or a piece of functionality.
            </Dialog.SidebarSection>
            <Dialog.SidebarSection>
              <Dialog.SidebarLink to="http://docs.syncano.io/#adding-an-instance">
                Learn more
              </Dialog.SidebarLink>
            </Dialog.SidebarSection>
            <Show if={!this.hasEditMode()}>
              <Dialog.SidebarSection title="Restore from Backup">
                When adding a new instance, you can restore it from an existing backup. Use the dropdown menu
                to do a restore from a full or partial backup that is available within your account.
                You can also do a partial backup restore from a zip archive.
              </Dialog.SidebarSection>
              <Dialog.SidebarSection last>
                <Dialog.SidebarLink to="http://docs.syncano.io/v1.1/docs/overview-9">
                  Learn more
                </Dialog.SidebarLink>
              </Dialog.SidebarSection>
            </Show>
          </Dialog.SidebarBox>,
          <ColorIconPicker
            key="coloriconpicker"
            icon={metadata.icon}
            color={metadata.color}
            onIconChange={this.handleIconChange}
            onColorChange={this.handleColorChange}
          />
        ]}
      >
        {!isRestoring ? this.renderContent() : this.renderLoading()}
      </Dialog.FullPage>
    );
  }
});
