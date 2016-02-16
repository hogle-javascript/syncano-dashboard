import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import {DialogMixin, FormMixin} from '../../mixins';

import Actions from './InstanceDialogActions';
import Store from './InstanceDialogStore';

import {FlatButton, RaisedButton, TextField, Utils} from 'syncano-material-ui';
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
    const title = this.hasEditMode() ? 'Update' : 'Create';
    const dialogCustomActions = [
      <FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <RaisedButton
        key="confirm"
        label="Confirm"
        secondary={true}
        style={{marginLeft: 8}}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Dialog.FullPage
        key="dialog"
        ref="dialog"
        title={`${title} an Instance`}
        onRequestClose={this.handleCancel}
        open={open}
        actions={dialogCustomActions}
        isLoading={isLoading}>
        {this.renderFormNotifications()}

        <div className="row">
          <div className="col-flex-0" style={{width: 226}}>
            <ColorIconPicker
              icon={metadata.icon}
              color={metadata.color}
              onIconChange={this.handleIconChange}
              onColorChange={this.handleColorChange} />
          </div>
          <div className="col-flex-1">
            <div className="vm-3-b">
              <TextField
                ref="name"
                name="name"
                fullWidth={true}
                valueLink={this.linkState('name')}
                errorText={this.getValidationMessages('name').join(' ')}
                hintText="Short name for your Instance"
                onFocus={this.handleInstanceNameFieldFocus}
                floatingLabelText="Name"/>
              {this.hasEditMode() && notificationShowed ? this.renderNotification() : null}
            </div>
            <TextField
              ref="description"
              name="description"
              fullWidth={true}
              multiLine={true}
              valueLink={this.linkState('description')}
              errorText={this.getValidationMessages('description').join(' ')}
              hintText="Multiline description of Instance (optional)"
              floatingLabelText="Description"/>
          </div>
        </div>
      </Dialog.FullPage>
    );
  }
});
