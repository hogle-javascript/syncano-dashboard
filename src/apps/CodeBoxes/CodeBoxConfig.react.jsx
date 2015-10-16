import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';

import AutosaveMixin from './CodeBoxAutosaveMixin';
import UnsavedDataMixin from './UnsavedDataMixin';
import Mixins from '../../mixins';

import Store from './CodeBoxStore';
import Actions from './CodeBoxActions';

import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

let SnackbarNotificationMixin = Common.SnackbarNotification.Mixin;

export default Radium(React.createClass({

  displayName: 'CodeBoxConfig',

  mixins: [
    Reflux.connect(Store),
    React.addons.LinkedStateMixin,
    Router.Navigation,

    SnackbarNotificationMixin,
    AutosaveMixin,
    UnsavedDataMixin,
    Mixins.Mousetrap,
    Mixins.Dialogs
  ],

  autosaveAttributeName: 'codeBoxConfigAutosave',

  componentDidMount() {
    Actions.fetch();
    this.bindShortcut(['command+s', 'ctrl+s'], () => {
      this.handleUpdate();
      return false;
    });
  },

  componentWillUpdate() {
    // 'mousetrap' class has to be added directly to input element to make CMD + S works

    if (this.state.currentCodeBox) {
      let refNames = _.keys(this.refs)
        .filter((refName) => _.includes(refName, 'field') || _.includes(refName, 'Field'));

      _.forEach(refNames, (refName) => {
        let inputNode = this.refs[refName].refs.input.getDOMNode();

        if (inputNode && !_.includes(inputNode.className, 'mousetrap')) {
          inputNode.classList.add('mousetrap');
        }
      });
    }
  },

  getStyles() {
    return {
      container: {
        margin: '25px auto',
        width: '100%',
        maxWidth: '600px'
      },
      field: {
        margin: '10px 10px'
      },
      addButton: {
        margin: '20px 10px',
        maxWidth: '120px'
      },
      wrongConfigSnackbar: {
        color: MUI.Styles.Colors.red400
      },
      deleteIcon: {
        padding: '24px 12px'
      }
    };
  },

  getConfigObject() {
    let codeBoxConfig = this.state.codeBoxConfig;
    let codeBoxConfigObject = _.reduce(codeBoxConfig, (result, item) => {
      result[item.key] = item.value;
      return result;
    }, {});

    return codeBoxConfigObject;
  },

  isSaved() {
    return _.isEqual(this.state.currentCodeBox.config, this.getConfigObject());
  },

  isKeyExist(newKey) {
    let existingKeys = _.pluck(this.state.codeBoxConfig, 'key');

    return _.includes(existingKeys, newKey);
  },

  handleAddField() {
    let codeBoxConfig = this.state.codeBoxConfig;
    let newField = {
      key: this.refs.newFieldKey.getValue(),
      value: this.refs.newFieldValue.getValue()
    };

    if (newField.key === '') {
      this.refs.newFieldKey.setErrorText('This field cannot be empty');
      return;
    }

    if (this.isKeyExist(newField.key)) {
      this.refs.newFieldKey.setErrorText('Config already have key with this name. Please choose another name.');
      return;
    }

    codeBoxConfig.push(newField);
    this.setState({codeBoxConfig});
    this.refs.newFieldKey.clearValue();
    this.refs.newFieldValue.clearValue();
    this.runAutoSave();
  },

  handleUpdate() {
    this.clearAutosaveTimer();
    this.handleUpdateAllKeys();
    let config = this.getConfigObject();

    Actions.updateCodeBox(this.state.currentCodeBox.id, {config});
    this.setSnackbarNotification({
      message: 'Saving...'
    });
  },

  handleDeleteKey(index) {
    let codeBoxConfig = this.state.codeBoxConfig;

    codeBoxConfig.splice(index, 1);
    this.setState({codeBoxConfig});
  },

  handleUpdateAllKeys() {
    _.forEach(this.state.codeBoxConfig, (field, index) => {
      this.handleUpdateKey(field.key, index);
    });
  },

  handleUpdateKey(key, index) {
    let codeBoxConfig = this.state.codeBoxConfig;
    let newField = {
      key: this.refs[`fieldKey${key}`].getValue(),
      value: this.refs[`fieldValue${key}`].getValue()
    };

    if (key !== newField.key && this.isKeyExist(newField.key)) {
      this.refs[`fieldKey${key}`].setErrorText('Config already have key with this name. Please choose another name.');
      return;
    }

    codeBoxConfig[index] = newField;

    this.setState({codeBoxConfig}, () => {
      this.refs[`fieldKey${newField.key}`].setErrorText(null);
    });
  },

  initDialogs() {
    return [{
      dialog: Common.Dialog,
      params: {
        ref: 'unsavedDataWarn',
        title: 'Unsaved CodeBox config',
        actions: [
          {
            text: 'Just leave',
            onClick: this._handleContinueTransition
          },
          {
            text: 'Continue editing',
            onClick: this.handleCancel
          }
        ],
        modal: true,
        children: "You're leaving CodeBox Config with unsaved changes. Are you sure you want to continue?"
      }
    }];
  },

  renderFields() {
    if (!this.state.codeBoxConfig) {
      return null;
    }

    let styles = this.getStyles();
    let codeboxConfig = this.state.codeBoxConfig ? this.state.codeBoxConfig : [];
    let configFields = _.map(codeboxConfig, (field, index) => {
      return (
        <div
          className="row"
          key={index}>
          <MUI.TextField
            key={`fieldKey${field.key}`}
            ref={`fieldKey${field.key}`}
            hintText="Key"
            defaultValue={field.key}
            style={styles.field}
            onChange={this.runAutoSave}
            onBlur={this.handleUpdateKey.bind(null, field.key, index)} />
          <MUI.TextField
            key={`fieldValue${field.key}`}
            ref={`fieldValue${field.key}`}
            hintText="Value"
            defaultValue={field.value}
            style={styles.field}
            onChange={this.runAutoSave}
            onBlur={this.handleUpdateKey.bind(null, field.key, index)} />
          <MUI.IconButton
            iconClassName="synicon-delete"
            style={styles.deleteIcon}
            tooltip="Delete key"
            onClick={this.handleDeleteKey.bind(null, index)}/>
        </div>
      );
    });

    return _.sortBy(configFields, 'key');
  },

  renderNewFiledSection() {
    let styles = this.getStyles();

    return (
      <div>
        <div className="row">
          <MUI.TextField
            className="config-input-key"
            ref="newFieldKey"
            hintText="Key"
            defaultValue=""
            style={styles.field} />
          <MUI.TextField
            className="config-input-value"
            ref="newFieldValue"
            hintText="Value"
            defaultValue=""
            style={styles.field} />
        </div>
        <div>
          <MUI.RaisedButton
            className="add-field-button"
            label="Add field"
            secondary={true}
            onClick={this.handleAddField}
            style={styles.addButton} />
          <MUI.Checkbox
            className="config-autosave-checkbox"
            ref="autosaveCheckbox"
            name="autoSaveCheckbox"
            label="Autosave"
            style={styles.addButton}
            defaultChecked={this.isAutosaveEnabled()}
            onCheck={this.saveCheckboxState} />
        </div>
      </div>
    );
  },

  render() {
    let styles = this.getStyles();

    if (!this.state.codeBoxConfig) {
      return null;
    }

    return (
      <div>
        <Container style={styles.container}>
          {this.getDialogs()}
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
            tooltip="Click here to save CodeBox"
            mini={true}
            onClick={this.handleUpdate}
            iconClassName="synicon-content-save"/>
          </Common.Fab>
          {this.renderFields()}
        </Container>
        <Container style={styles.container}>
          {this.renderNewFiledSection()}
        </Container>
      </div>
    );
  }
}));
