import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';

import UnsavedDataMixin from './UnsavedDataMixin';
import {MousetrapMixin, DialogsMixin, FormMixin, SnackbarNotificationMixin} from '../../mixins';

import Store from './ScriptStore';
import Actions from './ScriptActions';

import {FlatButton, Utils, TextField, IconButton} from 'syncano-material-ui';
import {Show, SelectFieldWrapper} from 'syncano-components';
import {Dialog, Notification} from '../../common';

export default Radium(React.createClass({
  displayName: 'ScriptConfig',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Router.Navigation,
    SnackbarNotificationMixin,
    UnsavedDataMixin,
    MousetrapMixin,
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

    if (this.state.currentScript) {
      const refNames = _.keys(this.refs)
        .filter((refName) => _.includes(refName.toLowerCase(), 'field'));

      _.forEach(refNames, (refName) => {
        const inputNode = this.refs[refName].refs.input;

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
      },
      deleteIcon: {
        width: 64,
        display: 'flex',
        alignItems: 'center'
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
    const scriptConfig = this.state.scriptConfig;
    const scriptConfigObject = _.reduce(scriptConfig, (result, item) => {
      result[item.key] = item.value;
      return result;
    }, {});

    return scriptConfigObject;
  },

  isSaved() {
    return _.isEqual(this.state.currentScript.config, this.getConfigObject());
  },

  isConfigValid() {
    const scriptConfig = this.state.scriptConfig;

    return _.uniq(_.pluck(scriptConfig, 'key')).length === scriptConfig.length;
  },

  hasKey(newKey) {
    const scriptConfig = this.state.scriptConfig;
    const existingKeys = _.pluck(scriptConfig, 'key');

    return _.includes(existingKeys, newKey);
  },

  handleAddField(event) {
    event.preventDefault();
    const scriptConfig = this.state.scriptConfig;
    const configValueType = this.refs.newFieldType.refs.configValueType.props.value;
    const configKey = this.refs.newFieldKey.getValue();
    const configValue = this.refs.newFieldValue.getValue();

    const parsedValue = this.parseValue(configValue, configValueType);

    if (parsedValue === null) {
      this.refs.newFieldValue.setErrorText('This field should be a number');
      return;
    }

    const newField = {
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

    scriptConfig.push(newField);
    this.setState({scriptConfig});
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
    const config = this.getConfigObject();

    Actions.updateScript(this.state.currentScript.id, {config});
    this.setSnackbarNotification({
      message: 'Saving...'
    });
  },

  handleDeleteKey(index) {
    const scriptConfig = this.state.scriptConfig;

    scriptConfig.splice(index, 1);
    this.clearValidations();
    this.setState({scriptConfig});
  },

  handleUpdateKey(key, index) {
    const scriptConfig = this.state.scriptConfig;
    const newValue = this.refs[`fieldValue${index}`].getValue();
    const type = this.refs[`fieldType${index}`].props.value;
    const parsedValue = this.parseValue(newValue, type);

    if (parsedValue === null) {
      this.refs[`fieldValue${index}`].setErrorText('This field should be a number');
      return;
    }

    const newField = {
      key: this.refs[`fieldKey${index}`].getValue(),
      value: parsedValue,
      type: this.refs[`fieldType${index}`].props.value
    };

    if (key !== newField.key && this.hasKey(newField.key)) {
      scriptConfig[index] = newField;
      this.setState({scriptConfig}, () => {
        this.refs[`fieldKey${index}`].setErrorText('Field with this name already exist. Please choose another.');
      });
      return;
    }
    scriptConfig[index] = newField;
    this.setState({scriptConfig});
    this.clearValidations();
  },

  handleCancelChanges() {
    const newState = this.state;

    newState.scriptConfig = Store.mapConfig(this.state.currentScript.config);
    this.replaceState(newState);
    this.clearValidations();
  },

  handleSuccessfullValidation() {
    this.handleUpdate();
  },

  handleTypeFieldChange(fieldIndex, event, selectedIndex, value) {
    const fieldValueType = value;
    const fieldValue = this.refs[`fieldValue${fieldIndex}`].getValue();
    const scriptConfig = this.state.scriptConfig;
    const parsedValue = this.parseValue(fieldValue, fieldValueType);

    if (parsedValue || parsedValue === 0) {
      scriptConfig[fieldIndex].type = fieldValueType;
      scriptConfig[fieldIndex].value = parsedValue;
      this.setState({scriptConfig});
    } else {
      this.refs[`fieldValue${fieldIndex}`].setErrorText('This field should be a number');
    }
  },

  parseValue(value, type) {
    // for integer type if value is empty string, convert to 0, if it's a valid number convert to int
    // if it's not a number either return null for error handling
    let parsedInt = value === '' ? 0 : Number(value);
    let obj = {
      string: value,
      integer: _.isNumber(parsedInt) ? parsedInt : null
    };

    return obj[type];
  },

  initDialogs() {
    return [{
      dialog: Dialog,
      params: {
        key: 'unsavedDataWarn',
        ref: 'unsavedDataWarn',
        title: 'Unsaved Script config',
        actions: [
          <FlatButton
            label="Just leave"
            secondary={true}
            onTouchTap={this._handleContinueTransition}/>,
          <FlatButton
            label="Continue editing"
            primary={true}
            keyboardFocused={true}
            onTouchTap={() => this.handleCancel('unsavedDataWarn')}/>
        ],
        modal: true,
        children: "You're leaving Script Config with unsaved changes. Are you sure you want to continue?"
      }
    }];
  },

  renderFields() {
    if (!this.state.scriptConfig) {
      return null;
    }

    const styles = this.getStyles();
    const scriptConfig = this.state.scriptConfig ? this.state.scriptConfig : [];
    const configFields = _.map(scriptConfig, (field, index) => {
      return (
        <div
          className="row align-center"
          key={index}>
          <div className="col-flex-1">
            <TextField
              key={`fieldKey${index}`}
              ref={`fieldKey${index}`}
              hintText="Key"
              floatingLabelText="Key"
              defaultValue={field.key}
              value={this.state.scriptConfig[index].key}
              style={styles.field}
              fullWidth={true}
              onChange={() => this.handleUpdateKey(field.key, index)}/>
          </div>
          <div className="col-flex-1">
            <TextField
              key={`fieldValue${index}`}
              ref={`fieldValue${index}`}
              hintText="Value"
              floatingLabelText="Value"
              defaultValue={field.value}
              value={this.state.scriptConfig[index].value}
              style={styles.field}
              fullWidth={true}
              onChange={() => this.handleUpdateKey(field.key, index)}/>
          </div>
          <div className="col-flex-1">
            <SelectFieldWrapper
              key={`fieldType${index}`}
              ref={`fieldType${index}`}
              name="configValueType"
              hintText="Value Type"
              floatingLabelText="Value Type"
              options={Store.getScriptConfigValueTypes()}
              value={this.state.scriptConfig[index].type}
              onTouchTap={this.handleSelectFieldClick}
              onChange={() => this.handleTypeFieldChange(index)}
              errorText={this.getValidationMessages('config_value_type').join(' ')}
              fullWidth={true}
              style={styles.field}/>
          </div>
          <div className="col-flex-0" style={styles.deleteIcon}>
            <IconButton
              iconClassName="synicon-close"
              tooltip="Delete key"
              onClick={() => this.handleDeleteKey(index)}/>
          </div>
        </div>
      );
    });

    return configFields;
  },

  renderNewFieldSection() {
    const styles = this.getStyles();

    return (
      <form
        key="form"
        className="row align-center"
        onSubmit={this.handleAddField}>
        <div className="col-flex-1">
          <TextField
            className="config-input-key"
            ref="newFieldKey"
            key="newFieldKey"
            hintText="Key"
            floatingLabelText="Key"
            defaultValue=""
            fullWidth={true}
            style={styles.field}/>
        </div>
        <div className="col-flex-1">
          <TextField
            className="config-input-value"
            ref="newFieldValue"
            key="newFieldValue"
            hintText="Value"
            floatingLabelText="Value"
            defaultValue=""
            fullWidth={true}
            style={styles.field}/>
        </div>
        <div className="col-flex-1">
          <SelectFieldWrapper
            key="newFieldType"
            ref="newFieldType"
            name="configValueType"
            hintText="Value Type"
            floatingLabelText="Value Type"
            options={Store.getScriptConfigValueTypes()}
            value={this.state.config_value_type}
            onChange={this.setSelectFieldValue.bind(null, 'config_value_type')}
            errorText={this.getValidationMessages('config_value_type').join(' ')}
            fullWidth={true}
            style={styles.field}/>
        </div>
        <div
          className="col-flex-0"
          style={styles.deleteIcon}>
          <IconButton
            className="add-field-button"
            iconStyle={{color: '#d2d2d2'}}
            iconClassName="synicon-plus"
            tooltip="Add field"
            type="submit"/>
        </div>
      </form>
    );
  },

  render() {
    const styles = this.getStyles();

    if (!this.state.scriptConfig) {
      return null;
    }

    return (
      <div>
        {this.getDialogs()}
        {this.renderFields()}
        {this.renderNewFieldSection()}
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
