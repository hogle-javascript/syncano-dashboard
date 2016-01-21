import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';

import UnsavedDataMixin from './UnsavedDataMixin';
import {DialogMixin, MousetrapMixin, DialogsMixin, FormMixin, SnackbarNotificationMixin} from '../../mixins';

import Store from './SnippetStore';
import Actions from './SnippetActions';

import {FlatButton, Utils, TextField, IconButton, RaisedButton} from 'syncano-material-ui';
import {Show, SelectFieldWrapper} from 'syncano-components';
import {Dialog, Notification} from '../../common';

export default Radium(React.createClass({
  displayName: 'SnippetConfig',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Router.Navigation,
    SnackbarNotificationMixin,
    UnsavedDataMixin,
    MousetrapMixin,
    DialogMixin,
    DialogsMixin,
    FormMixin,
    Utils.Styles
  ],

  componentDidMount() {
    Actions.fetch();
    this.bindShortcut(['command+s', 'ctrl+s'], () => {
      this.handleUpdate();
      return false;
    });
  },

  componentWillUpdate(nextProps, nextState) {
    // 'mousetrap' class has to be added directly to input element to make CMD + S works

    if (this.state.currentSnippet) {
      let refNames = _.keys(this.refs)
        .filter((refName) => _.includes(refName.toLowerCase(), 'field'));

      _.forEach(refNames, (refName) => {
        let inputNode = this.refs[refName].refs.input;

        if (inputNode && !_.includes(inputNode.className, 'mousetrap')) {
          inputNode.classList.add('mousetrap');
        }
      });
    }
    if (nextState.errors.config && nextState.errors.config.length > 0) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  },

  getStyles() {
    return {
      field: {
        margin: '6px 14px'
      },
      deleteIcon: {
        padding: '24px 12px 0'
      },
      buttonsSection: {
        margin: '30px 60px 0'
      },
      saveButton: {
        marginLeft: 10
      },
      notification: {
        marginTop: 20
      }
    };
  },

  getConfigObject() {
    let snippetConfig = this.state.snippetConfig;
    let snippetConfigObject = _.reduce(snippetConfig, (result, item) => {
      result[item.key] = item.value;
      return result;
    }, {});

    return snippetConfigObject;
  },

  isSaved() {
    return _.isEqual(this.state.currentSnippet.config, this.getConfigObject());
  },

  isConfigValid() {
    let snippetConfig = this.state.snippetConfig;

    return _.uniq(_.pluck(snippetConfig, 'key')).length === snippetConfig.length;
  },

  hasKey(newKey) {
    let snippetConfig = this.state.snippetConfig;
    let existingKeys = _.pluck(snippetConfig, 'key');

    return _.includes(existingKeys, newKey);
  },

  handleAddField(event) {
    event.preventDefault();
    let snippetConfig = this.state.snippetConfig;
    let configValueType = this.refs.newFieldType.refs.configValueType.props.value;
    let configKey = this.refs.newFieldKey.getValue();
    let configValue = this.refs.newFieldValue.getValue();

    let parsedValue = this.parseValue(configValue, configValueType);

    if (parsedValue === null) {
      this.refs.newFieldValue.setErrorText('This field should be a number');
      return;
    }

    let newField = {
      key: configKey,
      value: parsedValue,
      type: configValueType
    };

    if (this.hasKey(newField.key)) {
      this.refs.newFieldKey.setErrorText('Field with this Key already exist. Please choose another.');
      return;
    }

    if (newField.key === '') {
      this.refs.newFieldKey.setErrorText('This field cannot be blank.');
      return;
    }

    snippetConfig.push(newField);
    this.setState({snippetConfig});
    this.refs.newFieldKey.clearValue();
    this.refs.newFieldValue.clearValue();
    this.refs.newFieldKey.focus();
  },

  handleUpdate() {
    if (!this.isConfigValid()) {
      this.setState({
        errors: {
          config: ['Config save failed. One or more keys are not unique. Please verify keys and try again.']
        }
      });
      return;
    }
    let config = this.getConfigObject();

    Actions.updateSnippet(this.state.currentSnippet.id, {config});
    this.setSnackbarNotification({
      message: 'Saving...'
    });
  },

  handleDeleteKey(index) {
    let snippetConfig = this.state.snippetConfig;

    snippetConfig.splice(index, 1);
    this.clearValidations();
    this.setState({snippetConfig});
  },

  handleUpdateKey(key, index) {
    let snippetConfig = this.state.snippetConfig;
    let newValue = this.refs[`fieldValue${index}`].getValue();
    let type = this.refs[`fieldType${index}`].props.value;
    let parsedValue = this.parseValue(newValue, type);

    if (parsedValue === null) {
      this.refs[`fieldValue${index}`].setErrorText('This field should be a number');
      return;
    }

    let newField = {
      key: this.refs[`fieldKey${index}`].getValue(),
      value: parsedValue,
      type: this.refs[`fieldType${index}`].props.value
    };

    if (key !== newField.key && this.hasKey(newField.key)) {
      snippetConfig[index] = newField;
      this.setState({snippetConfig}, () => {
        this.refs[`fieldKey${index}`].setErrorText('Field with this name already exist. Please choose another.');
      });
      return;
    }
    snippetConfig[index] = newField;
    this.setState({snippetConfig});
    this.clearValidations();
  },

  handleCancelChanges() {
    let newState = this.state;

    newState.snippetConfig = Store.mapConfig(this.state.currentSnippet.config);
    this.replaceState(newState);
    this.clearValidations();
  },
  handleAddSubmit() {
    this.handleUpdate();
  },

  handleSelectFieldChange(fieldIndex, event, selectedIndex, value) {
    let fieldValueType = value;
    let fieldValue = this.refs[`fieldValue${fieldIndex}`].getValue();
    let snippetConfig = this.state.snippetConfig;
    let parsedValue = this.parseValue(fieldValue, fieldValueType);

    if (parsedValue) {
      snippetConfig[fieldIndex].type = fieldValueType;
      snippetConfig[fieldIndex].value = parsedValue;
      this.setState({snippetConfig});
    } else {
      this.refs[`fieldValue${fieldIndex}`].setErrorText('This field should be a number');
    }
  },

  parseValue(value, type) {
    let parsedValue = null;

    if (type === 'integer' && value === '') {
      parsedValue = 0;
    } else if (type === 'integer' && _.isNaN(Number(value))) {
      return parsedValue;
    } else if (type === 'integer' && !_.isNaN(Number(value))) {
      parsedValue = Number(value);
    } else {
      parsedValue = String(value);
    }

    return parsedValue;
  },

  initDialogs() {
    return [{
      dialog: Dialog,
      params: {
        key: 'unsavedDataWarn',
        ref: 'unsavedDataWarn',
        title: 'Unsaved Snippet config',
        actions: [
          <FlatButton
            label="Just leave"
            secondary={true}
            onTouchTap={this._handleContinueTransition}/>,
          <FlatButton
            label="Continue editing"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleCancel.bind(null, 'unsavedDataWarn')}/>
        ],
        modal: true,
        children: "You're leaving Snippet Config with unsaved changes. Are you sure you want to continue?"
      }
    }];
  },

  renderFields() {
    if (!this.state.snippetConfig) {
      return null;
    }

    let styles = this.getStyles();
    let snippetConfig = this.state.snippetConfig ? this.state.snippetConfig : [];
    let configFields = _.map(snippetConfig, (field, index) => {
      return (
        <div
          className="row align-center"
          key={index}>
          <TextField
            key={`fieldKey${index}`}
            ref={`fieldKey${index}`}
            hintText="Key"
            floatingLabelText="Key"
            defaultValue={field.key}
            value={this.state.snippetConfig[index].key}
            style={styles.field}
            onChange={this.handleUpdateKey.bind(this, field.key, index)}/>
          <TextField
            key={`fieldValue${index}`}
            ref={`fieldValue${index}`}
            hintText="Value"
            floatingLabelText="Value"
            defaultValue={field.value}
            value={this.state.snippetConfig[index].value}
            style={styles.field}
            onChange={this.handleUpdateKey.bind(this, field.key, index)}/>
          <SelectFieldWrapper
            key={`fieldType${index}`}
            ref={`fieldType${index}`}
            name="configValueType"
            hintText="Value Type"
            floatingLabelText="Value Type"
            options={Store.getSnippetConfigValueTypes()}
            value={this.state.snippetConfig[index].type}
            onTouchTap={this.handleSelectFieldClick}
            onChange={this.handleSelectFieldChange.bind(null, index)}
            errorText={this.getValidationMessages('config_value_type').join(' ')}
            fullWidth={false}
            style={styles.field}/>
          <div style={styles.deleteIcon}>
            <IconButton
              iconClassName="synicon-close"
              tooltip="Delete key"
              onClick={this.handleDeleteKey.bind(this, index)}/>
          </div>
        </div>
      );
    });

    return configFields;
  },

  renderNewFieldSection() {
    let styles = this.getStyles();

    return (
      <form
        key="form"
        className="row align-center"
        onSubmit={this.handleAddField}>
        <TextField
          className="config-input-key"
          ref="newFieldKey"
          key="newFieldKey"
          hintText="Key"
          floatingLabelText="Key"
          defaultValue=""
          style={styles.field}/>
        <TextField
          className="config-input-value"
          ref="newFieldValue"
          key="newFieldValue"
          hintText="Value"
          floatingLabelText="Value"
          defaultValue=""
          style={styles.field}/>
        <SelectFieldWrapper
          key="newFieldType"
          ref="newFieldType"
          name="configValueType"
          hintText="Value Type"
          floatingLabelText="Value Type"
          options={Store.getSnippetConfigValueTypes()}
          value={this.state.config_value_type}
          onChange={this.setSelectFieldValue.bind(null, 'config_value_type')}
          errorText={this.getValidationMessages('config_value_type').join(' ')}
          fullWidth={false}
          style={styles.field}/>
        <div style={styles.deleteIcon}>
          <IconButton
            className="add-field-button"
            iconClassName="synicon-plus"
            tooltip="Add field"
            type="submit"/>
        </div>
      </form>
    );
  },

  render() {
    let styles = this.getStyles();

    if (!this.state.snippetConfig) {
      return null;
    }

    return (
      <div>
        {this.getDialogs()}
        {this.renderFields()}
        {this.renderNewFieldSection()}
        <div
          className="row align-right"
          style={styles.buttonsSection}>
          <FlatButton
            label="Cancel"
            onClick={this.handleCancelChanges}/>
          <RaisedButton
            label="Save"
            style={styles.saveButton}
            secondary={true}
            onTouchTap={this.handleFormValidation}/>
        </div>
        <Show if={this.getValidationMessages('config').length > 0}>
          <div style={styles.notification}>
            <Notification type="error">
              {this.getValidationMessages('config').join(' ')}
            </Notification>
          </div>
        </Show>
      </div>
    );
  }
}));
