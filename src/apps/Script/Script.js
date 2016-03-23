import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import {State, Navigation} from 'react-router';

import {DialogsMixin, FormMixin, MousetrapMixin, SnackbarNotificationMixin} from '../../mixins';
import AutosaveMixin from './ScriptAutosaveMixin';

import Store from './ScriptStore';
import Actions from './ScriptActions';

import {RaisedButton, FontIcon, Checkbox, FlatButton, TextField, IconButton} from 'syncano-material-ui';
import {Loading, Show, TogglePanel, SelectFieldWrapper} from 'syncano-components';
import {Dialog, InnerToolbar, Editor, Notification} from '../../common';
import Traces from '../Traces';

export default React.createClass({
  displayName: 'Script',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store),
    SnackbarNotificationMixin,
    AutosaveMixin,
    FormMixin,
    MousetrapMixin,
    DialogsMixin
  ],

  autosaveAttributeName: 'scriptSourceAutosave',

  componentDidMount() {
    Actions.fetch();
    this.bindShortcut(['command+s', 'ctrl+s'], () => {
      this.handleUpdate();
      return false;
    });

    this.runScript = _.debounce(Actions.runScript, 500, {leading: true});
  },

  componentWillUnmount() {
    Store.clearCurrentScript();
  },

  getStyles() {
    return {
      notification: {
        marginTop: 20
      },
      lastResultContainer: {
        zIndex: 1,
        position: 'fixed',
        bottom: 20,
        right: 100
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
      }
    };
  },

  getToolbarTitle() {
    let currentScript = this.state.currentScript;

    return currentScript ? `Script: ${currentScript.label} (id: ${currentScript.id})` : '';
  },

  getConfigObject() {
    const {scriptConfig} = this.state;
    const scriptConfigObject = _.reduce(scriptConfig, (result, item) => {
      result[item.key] = item.value;
      return result;
    }, {});

    return scriptConfigObject;
  },

  isSaved() {
    const {currentScript} = this.state;

    if (!currentScript || !this.refs.editorSource) {
      return true;
    }

    const initialSource = currentScript.source;
    const currentSource = this.refs.editorSource.editor.getValue();

    return _.isEqual(initialSource, currentSource) && _.isEqual(currentScript.config, this.getConfigObject());
  },

  isConfigValid() {
    const {scriptConfig} = this.state;

    return _.uniq(_.pluck(scriptConfig, 'key')).length === scriptConfig.length;
  },

  hasKey(newKey) {
    const {scriptConfig} = this.state;
    const existingKeys = _.pluck(scriptConfig, 'key');

    return _.includes(existingKeys, newKey);
  },

  handleOnSourceChange() {
    this.resetForm();
    this.runAutoSave();
  },

  handleRunScript() {
    const {isPayloadValid, currentScript, payloadValue} = this.state;

    this.handleUpdate();
    if (isPayloadValid) {
      this.runScript({
        id: currentScript.id,
        payload: payloadValue
      });
    } else {
      this.setSnackbarNotification({message: "Can't run Script with invalid payload"});
    }
  },

  handleAddField(event) {
    event.preventDefault();
    const {scriptConfig} = this.state;

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
    this.runAutoSave(0);
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
    const source = this.refs.editorSource.editor.getValue();

    this.clearAutosaveTimer();
    Actions.updateScript(this.state.currentScript.id, {config, source});
    this.setSnackbarNotification({message: 'Saving...'});
  },

  handleDeleteKey(index) {
    const scriptConfig = this.state.scriptConfig;

    scriptConfig.splice(index, 1);
    this.runAutoSave(0);
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
    return [
      {
        dialog: Dialog.FullPage,
        params: {
          key: 'scriptTraces',
          ref: 'scriptTraces',
          title: `Traces for ${this.getToolbarTitle()}`,
          actions: [],
          onRequestClose: () => this.handleCancel('scriptTraces'),
          children: <Traces.List
                      isLoading={this.state.isLoading}
                      tracesFor="script"
                      name="Traces"
                      items={this.state.traces}/>
        }
      },
      {
        dialog: Dialog.FullPage,
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
      }
    ];
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
              errorText={this.getValidationMessages('configValueType').join(' ')}
              fullWidth={true}
              style={styles.field}/>
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
    const {configValueType} = this.state;

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
          <SelectFieldWrapper
            key="newFieldType"
            ref="newFieldType"
            name="configValueType"
            hintText="Value Type"
            floatingLabelText="Value Type"
            options={Store.getScriptConfigValueTypes()}
            value={configValueType}
            onChange={this.setSelectFieldValue.bind(null, 'configValueType')}
            errorText={this.getValidationMessages('configValueType').join(' ')}
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
    const {currentScript, lastTraceStatus, isLoading, lastTraceDuration, lastTraceResult} = this.state;
    let source = null;
    let editorMode = 'python';

    if (currentScript) {
      source = currentScript.source;
      editorMode = Store.getEditorMode();
    }

    return (
      <div className="col-flex-1" style={{padding: 0, height: '100px', display: 'flex', flexDirection: 'column'}}>
        {this.getDialogs()}
        <InnerToolbar
          title={this.getToolbarTitle()}
          backFallback={() => this.transitionTo('scripts', this.getParams())}
          forceBackFallback={true}
          backButtonTooltip="Go back to Scripts list">
          <div style={{display: 'inline-block'}}>
            <Checkbox
              ref="autosaveCheckbox"
              name="autosaveCheckbox"
              label="Autosave"
              labelStyle={{whiteSpace: 'nowrap', width: 'auto'}}
              defaultChecked={this.isAutosaveEnabled()}
              onCheck={this.saveCheckboxState}/>
          </div>
          <RaisedButton
            label="TRACES"
            style={{marginRight: 5, marginLeft: 20}}
            onTouchTap={() => this.showDialog('scriptTraces')}/>
          <RaisedButton
            label="SAVE"
            style={{marginLeft: 5, marginRight: 5}}
            onTouchTap={() => this.handleUpdate()} />
          <RaisedButton
            label="RUN"
            primary={true}
            style={{marginLeft: 5, marginRight: 0}}
            icon={<FontIcon className="synicon-play"/>}
            onTouchTap={this.handleRunScript}/>
        </InnerToolbar>
        <Loading show={isLoading || !currentScript}>
          <div className="row">
            <div className="col-flex-1" style={{borderRight: '1px solid rgba(224,224,224,.5)', display: 'flex'}}>
              <TogglePanel
                title="Code"
                initialOpen={true}
                style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <Show if={this.getValidationMessages('source').length > 0}>
                  <div style={styles.notification}>
                    <Notification type="error">
                      {this.getValidationMessages('source').join(' ')}
                    </Notification>
                  </div>
                </Show>
                <Editor
                  ref="editorSource"
                  mode={editorMode}
                  onChange={this.handleOnSourceChange}
                  onLoad={this.clearAutosaveTimer}
                  value={source}/>
              </TogglePanel>
            </div>
            <div className="col-flex-1" style={{padding: 0, maxWidth: 600}}>

              <div style={{borderBottom: '1px solid rgba(224,224,224,.5)'}}>
                <TogglePanel
                  title="Config"
                  initialOpen={true}>
                  <div>
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
                </TogglePanel>
              </div>

              <div style={{borderBottom: '1px solid rgba(224,224,224,.5)'}}>
                <TogglePanel
                  title="Payload"
                  initialOpen={true}>
                  <Editor
                    name="payload-editor"
                    ref="payloadSource"
                    mode="json"
                    height="200px"
                    onChange={(payload) => this.setState({payloadValue: payload})}
                    value={[
                      '{',
                      '    "foo": "bar",',
                      '    "bar": "foo"',
                      '}'
                    ].join('\n')} />
                </TogglePanel>
              </div>

              <div>
                <TogglePanel
                  title="Result"
                  initialOpen={true}>
                  <div style={{
                    color: '#444',
                    fontFamily: "Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace",
                    fontSize: 12
                  }}>
                    {lastTraceResult}
                  </div>
                </TogglePanel>
              </div>
            </div>
            <Show if={lastTraceDuration && lastTraceStatus}>
              <div style={styles.lastResultContainer}>
                <Notification type={lastTraceStatus === 'success' ? 'info' : 'error'}>
                  {`Last run status: ${lastTraceStatus} Duration: ${lastTraceDuration}ms`}
                </Notification>
              </div>
            </Show>
          </div>
        </Loading>
      </div>
    );
  }
});
