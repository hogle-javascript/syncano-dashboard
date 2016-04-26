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

  mixinsConfig: {
    autosaveAttributeName: 'scriptSourceAutosave',
    editorRefs: ['editorSource', 'payloadSource']
  },

  validatorConstraints() {
    const {scriptConfig} = this.state;
    let validateObj = {};

    _.forEach(scriptConfig, (item, index) => {
      validateObj[`fieldKey${index}`] = (value, options) => {
        const keyValidation = {
          presence: {
            message: '^This field cannot be blank'
          }
        };

        if (_.filter(options, (fieldVal) => fieldVal === value).length > 1) {
          const uniqueKeyValidation = {
            inclusion: {
              within: [],
              message: '^This field must be unique'
            }
          };

          _.assign(keyValidation, uniqueKeyValidation);
        }

        return keyValidation;
      };
      if (item.type === 'integer') {
        validateObj[`fieldValue${index}`] = {
          numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: Number.MIN_SAFE_INTEGER,
            lessThanOrEqualTo: Number.MAX_SAFE_INTEGER,
            message: '^This value should be an integer type and range'
          }
        };
      }
    });

    return validateObj;
  },

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

  getValidatorAttributes() {
    const {scriptConfig} = this.state;

    if (!scriptConfig.length) {
      return {};
    }

    const attributes = _.reduce(scriptConfig, (all, item, index) => {
      all[`fieldKey${index}`] = item.key;
      all[`fieldValue${index}`] = item.value;
      return all;
    }, {});

    return attributes;
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
    const {currentScript} = this.state;

    return currentScript ? `Script: ${currentScript.label} (id: ${currentScript.id})` : '';
  },

  getConfigObject() {
    const {scriptConfig} = this.state;
    const scriptConfigObject = _.reduce(scriptConfig, (result, item) => {
      result[item.key] = item.type === 'integer' ? Number(item.value) : item.value.toString();
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

    const newField = {
      key: this.refs.newFieldKey.getValue(),
      value: this.refs.newFieldValue.getValue(),
      type: this.refs.newFieldType.refs.configValueType.props.value
    };

    scriptConfig.push(newField);
    this.setState({scriptConfig});
    this.refs.newFieldKey.clearValue();
    this.refs.newFieldValue.clearValue();
    this.refs.newFieldKey.focus();
  },

  handleUpdate() {
    const config = this.getConfigObject();
    const source = this.refs.editorSource.editor.getValue();

    if (this.areEditorsLoaded()) {
      this.clearAutosaveTimer();
      Actions.updateScript(this.state.currentScript.id, {config, source});
      this.setSnackbarNotification({message: 'Saving...'});
    }
  },

  handleDeleteKey(index) {
    const {scriptConfig} = this.state;

    scriptConfig.splice(index, 1);
    this.runAutoSave(0);
    this.clearValidations();
    this.setState({scriptConfig});
  },

  handleUpdateKey(key, index) {
    const {scriptConfig} = this.state;
    const newValue = this.refs[`fieldValue${index}`].getValue();
    const newType = this.refs[`fieldType${index}`].props.value;

    const newField = {
      key: this.refs[`fieldKey${index}`].getValue(),
      value: newValue,
      type: newType
    };

    scriptConfig[index] = newField;
    this.setState({scriptConfig});
  },

  handleSuccessfullValidation() {
    const {shouldRun} = this.state;

    if (shouldRun) {
      return this.handleRunScript();
    }

    this.handleUpdate();
  },

  handleTypeFieldChange(fieldIndex, type) {
    const {scriptConfig} = this.state;
    const value = scriptConfig[fieldIndex].value;

    scriptConfig[fieldIndex].type = type;
    if (value === 0 || value === '') {
      scriptConfig[fieldIndex].value = type === 'integer' ? 0 : '';
    }
    this.setState({scriptConfig});
  },

  setFlag(flag) {
    this.setState({shouldRun: flag}, this.handleFormValidation);
  },

  initDialogs() {
    const {isLoading, traces} = this.state;

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
                      isLoading={isLoading}
                      tracesFor="script"
                      name="Traces"
                      items={traces}/>
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
    const {scriptConfig} = this.state;

    if (!scriptConfig.length) {
      return null;
    }

    const styles = this.getStyles();
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
              value={scriptConfig[index].key}
              style={styles.field}
              fullWidth={true}
              errorText={this.getValidationMessages(`fieldKey${index}`).join(' ')}
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
              value={scriptConfig[index].type}
              onTouchTap={this.handleSelectFieldClick}
              onChange={(event, selectedIndex, value) => this.handleTypeFieldChange(index, value)}
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
              value={scriptConfig[index].value}
              style={styles.field}
              fullWidth={true}
              errorText={this.getValidationMessages(`fieldValue${index}`).join(' ')}
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
            errorText={this.getValidationMessages(`newFieldKey`).join(' ')}
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
            onChange={(event, index, value) => this.setSelectFieldValue('configValueType', event, index, value)}
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
      <div className="col-flex-1" style={{padding: 0, display: 'flex', flexDirection: 'column'}}>
        {this.getDialogs()}
        <InnerToolbar
          title={this.getToolbarTitle()}
          backFallback={() => this.transitionTo('scripts', this.getParams())}
          forceBackFallback={true}
          backButtonTooltip="Go back to Scripts list">
          <Show if={!isLoading}>
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
              onTouchTap={() => this.setFlag(false)} />
            <RaisedButton
              label="RUN"
              primary={true}
              style={{marginLeft: 5, marginRight: 0}}
              icon={<FontIcon className="synicon-play"/>}
              onTouchTap={() => this.setFlag(true)}/>
          </Show>
        </InnerToolbar>
        <Loading
          show={isLoading || !currentScript}
          style={{display: 'flex', flex: 1}}>
          <div className="row" style={{flex: 1}}>
            <div className="col-flex-1" style={{borderRight: '1px solid rgba(224,224,224,.5)', display: 'flex'}}>
              <TogglePanel
                title="Code"
                initialOpen={true}
                style={{display: 'flex', flexDirection: 'column'}}>
                <Show if={this.getValidationMessages('source').length > 0}>
                  <div style={styles.notification}>
                    <Notification type="error">
                      {this.getValidationMessages('source').join(' ')}
                    </Notification>
                  </div>
                </Show>
                <div style={{position: 'relative', flex: 1}}>
                  <Editor
                    ref="editorSource"
                    mode={editorMode}
                    onChange={this.handleOnSourceChange}
                    onLoad={this.clearAutosaveTimer}
                    value={source}
                    width="100%"
                    height="100%"
                    style={{position: 'absolute'}} />
                </div>
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
