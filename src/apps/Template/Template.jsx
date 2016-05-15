import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import _ from 'lodash';
import Helmet from 'react-helmet';

import {DialogsMixin, FormMixin, MousetrapMixin, SnackbarNotificationMixin} from '../../mixins';
import AutosaveMixin from '../Script/ScriptAutosaveMixin';

import Store from './TemplateStore';
import Actions from './TemplateActions';

import {Checkbox, FontIcon, RaisedButton, TextField} from 'syncano-material-ui';
import {InnerToolbar, Editor, Notification, Show, Loading, TogglePanel, Truncate} from '../../common/';

export default React.createClass({
  displayName: 'Template',

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
    autosaveAttributeName: 'templateContentAutosave',
    editorRefs: ['contextEditor', 'contentEditor', 'previewEditor']
  },

  validatorConstraints() {
    const {successValidationAction} = this.state;
    let validataObj = {};

    validataObj.dataSourceUrl = (value) => {
      let urlValidation = {
        url: {
          message: '^Invalid URL'
        }
      };

      if (successValidationAction === 'tabRender') {
        urlValidation = {
          presence: true
        };
      }

      if (value && value.indexOf(SYNCANO_BASE_URL) === -1) {
        urlValidation = {
          inclusion: {
            within: [],
            message: '^Invalid endpoint URL'
          }
        };
      }

      return urlValidation;
    };

    return validataObj;
  },

  componentDidMount() {
    Actions.fetch();
    this.bindShortcut(['command+s', 'ctrl+s'], () => {
      this.handleUpdate();
      return false;
    });
    this._handleUpdate = _.debounce(this.handleUpdate, 500, {leading: true});
    this._handleRender = _.debounce(this.handleRender, 500, {leading: true});
  },

  componentDidUpdate() {
    const {renderedTemplate} = this.state;

    if (renderedTemplate) {
      const value = _.isObject(renderedTemplate) ? JSON.stringify(renderedTemplate, null, '\t') : renderedTemplate;

      this.refs.previewEditor.editor.setValue(value);
    }
  },

  componentWillUnmount() {
    Store.clearTemplate();
  },

  getStyles() {
    return {
      notification: {
        marginBottom: 20
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

  isSaved() {
    const {template} = this.state;
    const contentEditor = this.refs.contentEditor;
    const contextEditor = this.refs.contextEditor;

    if (template && contentEditor && contextEditor) {
      const contentEditorValue = contentEditor.editor.getValue();
      const contextEditorValue = contextEditor.editor.getValue();
      const isContentSaved = _.isEqual(template.content, contentEditorValue);
      const isContextSaved = _.isEqual(JSON.stringify(template.context, null, '\t'), contextEditorValue);

      return isContentSaved && isContextSaved;
    }

    return true;
  },

  handleUpdate() {
    const {template} = this.state;
    const content = this.refs.contentEditor.editor.getValue();
    const context = this.refs.contextEditor.editor.getValue();

    if (this.areEditorsLoaded()) {
      this.clearAutosaveTimer();
      Actions.setDataSource(this.refs.dataSourceUrl.getValue());
      Actions.updateTemplate(template.name, {content, context});
      this.setSnackbarNotification({message: 'Saving...'});
    }
  },

  handleOnSourceChange() {
    this.resetForm();
    this.runAutoSave();
  },

  handleSuccessfullValidation() {
    const {successValidationAction} = this.state;
    const flagMap = {
      update: this._handleUpdate,
      render: this._handleRender,
      tabRender: this._handleUpdate
    };

    flagMap[successValidationAction]();
  },

  handleRender() {
    if (!this.areEditorsLoaded()) {
      return null;
    }

    const {template} = this.state;
    const {dataSourceUrl} = this.refs;

    if (dataSourceUrl && dataSourceUrl.getValue().length) {
      return Actions.renderFromEndpoint(template.name, dataSourceUrl.getValue());
    }

    Actions.renderTemplate(template.name, template.context);
  },

  setFlag(successValidationAction) {
    Actions.setFlag(successValidationAction, this.handleFormValidation);
  },

  renderErrorNotifications(errorsKey) {
    const styles = this.getStyles();

    return (
      <Show if={this.getValidationMessages(errorsKey).length}>
        <div style={styles.notification}>
          <Notification type="error">
            {this.getValidationMessages(errorsKey).join(' ')}
          </Notification>
        </div>
      </Show>
    );
  },

  renderRunButtons(label, iconName, flagName) {
    return (
      <RaisedButton
        label={label}
        primary={true}
        style={{marginLeft: 5, marginRight: 0}}
        icon={<FontIcon
          className={iconName}
          style={{marginTop: '-4px'}} />}
        onTouchTap={() => this.setFlag(flagName)}/>
    );
  },

  render() {
    const {template, isLoading} = this.state;
    const instanceName = this.getParams().instanceName;
    const title = `Template: ${template.name}`;

    return (
      <div className="col-flex-1" style={{padding: 0, display: 'flex', flexDirection: 'column'}}>
        <Helmet title={title} />
        <InnerToolbar title={title}>
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
              label="SAVE"
              style={{marginLeft: 5, marginRight: 5}}
              onTouchTap={() => this.setFlag('update')} />
            {this.renderRunButtons('RENDER', 'synicon-play', 'render')}
            {this.renderRunButtons('RENDER IN TAB', 'synicon-open-in-new', 'tabRender')}
          </Show>
        </InnerToolbar>

        <Loading
          show={isLoading}
          style={{display: 'flex', flex: 1}}>
          <div className="row" style={{flex: 1}}>
            <div className="col-flex-1" style={{borderRight: '1px solid rgba(224,224,224,.5)', display: 'flex'}}>
              <TogglePanel
                title="Code"
                initialOpen={true}
                style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{position: 'relative', flex: 1}}>
                  <Editor
                    ref="contentEditor"
                    name="contentEditor"
                    mode="django"
                    onChange={this.handleOnSourceChange}
                    onLoad={this.clearAutosaveTimer}
                    value={template.content}
                    width="100%"
                    height="calc(100% - 60px)"
                    style={{position: 'absolute'}} />
                  <div style={{position: 'absolute', bottom: 0, margin: '5px auto -20px auto', width: '100%'}}>
                    {this.renderErrorNotifications('content')}
                  </div>
                </div>
              </TogglePanel>
            </div>
            <div className="col-flex-1" style={{padding: 0, maxWidth: 600, display: 'flex', flexDirection: 'column'}}>

              <div style={{borderBottom: '1px solid rgba(224,224,224,.5)'}}>
                <TogglePanel
                  title="Data source URL"
                  initialOpen={true}>
                  <TextField
                    ref="dataSourceUrl"
                    name="dataSourceUrl"
                    fullWidth={true}
                    valueLink={this.linkState('dataSourceUrl')}
                    errorText={this.getValidationMessages('dataSourceUrl').join(' ')}
                    hintText={<Truncate text={`e.g. ${SYNCANO_BASE_URL}v1.1/instances/${instanceName}/classes/`}/>}
                    floatingLabelText="Data source URL"/>
                </TogglePanel>
              </div>

              <div style={{borderBottom: '1px solid rgba(224,224,224,.5)'}}>
                <TogglePanel
                  title="Context"
                  initialOpen={true}>
                  <Editor
                    name="contextEditor"
                    ref="contextEditor"
                    mode="json"
                    height="200px"
                    onChange={this.handleOnSourceChange}
                    onLoad={this.clearAutosaveTimer}
                    value={JSON.stringify(template.context, null, '\t') || [
                      '{',
                      '    "foo": "bar",',
                      '    "bar": "foo"',
                      '}'
                    ].join('\n')} />
                </TogglePanel>
                <div style={{padding: '10px 20px 10px 20px'}}>
                  {this.renderErrorNotifications('context')}
                </div>
              </div>

              <div style={{flex: 1, display: 'flex'}}>
                <TogglePanel
                  title="Preview"
                  initialOpen={true}
                  style={{display: 'flex', flexDirection: 'column'}}>
                  <div style={{position: 'relative', flex: 1, minHeight: 200}}>
                    <Editor
                      name="previewEditor"
                      ref="previewEditor"
                      mode="html"
                      readOnly={true}
                      width="100%"
                      height="100%"
                      style={{position: 'absolute'}} />
                  </div>
                </TogglePanel>
              </div>
            </div>
          </div>
        </Loading>
      </div>
    );
  }
});
