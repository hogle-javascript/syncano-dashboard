import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import {DialogMixin, DialogsMixin, FormMixin} from '../../mixins';

import Actions from './InstanceDialogActions';
import Store from './InstanceDialogStore';

import {TextField, FlatButton, Utils, Styles} from 'syncano-material-ui';
import {Color} from 'syncano-components';
import {Dialog, Icon, Notification, ColorIconPicker} from '../../common';

export default React.createClass({
  displayName: 'InstanceDialog',

  mixins: [
    Reflux.connect(Store),
    Reflux.ListenerMixin,
    DialogMixin,
    FormMixin,
    Utils.Styles
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
      this.setState({
        name: Store.genUniqueName(),
        metadata: {
          color: Color.getRandomColorName(),
          icon: Icon.Store.getRandomIconPickerIcon()
        }
      });
    }
  },

  handleAddSubmit() {
    const {name, description, metadata} = this.state;

    if (this.props.handleSubmit) {
      this.listenTo(Actions.createInstance.completed, this.extendSubmit);
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
    this.setState({
      notificationShowed: true,
      initialName: this.state.name
    });
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteInstanceDialog',
        ref: 'deleteInstanceDialog',
        title: 'Delete an Instance',
        handleConfirm: Actions.removeInstances,
        isLoading: this.props.isLoading,
        items: [this.state],
        groupName: 'Instance'
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

  render() {
    const {open, metadata, notificationShowed, isLoading} = this.state;
    const title = this.hasEditMode() ? 'Update' : 'Add';

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} an Instance`}
        onRequestClose={this.handleCancel}
        open={open}
        isLoading={isLoading}
        actions={
          <div>
            {this.hasEditMode()
              ? <FlatButton
                  style={{float: 'left'}}
                  labelStyle={{color: Styles.Colors.red400}}
                  label="DELETE AN INSTANCE"
                  onTouchTap={() => this.refs.deleteInstanceDialog.show()} />
              : null
            }
            <Dialog.StandardButtons
              disabled={!this.state.canSubmit}
              handleCancel={this.handleCancel}
              handleConfirm={this.handleFormValidation}/>
          </div>
        }
        sidebar={
          <ColorIconPicker
            icon={metadata.icon}
            color={metadata.color}
            onIconChange={this.handleIconChange}
            onColorChange={this.handleColorChange}/>
        }>
        {DialogsMixin.getDialogs(this.initDialogs())}
        {this.renderFormNotifications()}
        <Dialog.ContentSection>
          <TextField
            ref="name"
            name="name"
            autoFocus={true}
            fullWidth={true}
            valueLink={this.linkState('name')}
            errorText={this.getValidationMessages('name').join(' ')}
            hintText="Instance's name"
            onFocus={this.handleInstanceNameFieldFocus}
            floatingLabelText="Name"/>
          {this.hasEditMode() && notificationShowed ? this.renderNotification() : null}
        </Dialog.ContentSection>
        <Dialog.ContentSection last={true}>
          <TextField
            ref="description"
            name="description"
            fullWidth={true}
            multiLine={true}
            valueLink={this.linkState('description')}
            errorText={this.getValidationMessages('description').join(' ')}
            hintText="Instance's description"
            floatingLabelText="Description (optional)"/>
        </Dialog.ContentSection>
      </Dialog.FullPage>
    );
  }
});
