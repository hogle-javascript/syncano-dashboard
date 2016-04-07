import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';

import {DialogsMixin, FormMixin, MousetrapMixin, SnackbarNotificationMixin} from '../../mixins';
import AutosaveMixin from './TemplateAutosaveMixin';

import Store from './TemplateStore';
import Actions from './TemplateActions';

import {Checkbox, FontIcon, RaisedButton, TextField} from 'syncano-material-ui';
import {Show, Loading, TogglePanel, Truncate} from 'syncano-components';
import {InnerToolbar, Editor, Notification} from '../../common';

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

  autosaveAttributeName: 'templateContentAutosave',

  validatorConstraints() {
    let validataObj = {};

    validataObj.dataSourceUrl = (value) => {
      let urlValidation = {
        url: {
          message: '^Invalid URL'
        }
      };

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
  },

  componentDidUpdate() {
    const {renderedTemplate} = this.state;

    if (renderedTemplate) {
      this.refs.previewEditor.editor.setValue(renderedTemplate);
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
      const isNewContent = template.content === contentEditorValue;
      const isNewContext = template.context === contextEditorValue;

      return !(isNewContent || isNewContext);
    }

    return true;
  },

  handleUpdate() {
    const {template} = this.state;
    const content = this.refs.contentEditor.editor.getValue();
    const context = this.refs.contextEditor.editor.getValue();

    this.clearAutosaveTimer();
    Actions.updateTemplate(template.name, {content, context});
    this.setSnackbarNotification({message: 'Saving...'});
  },

  handleOnSourceChange() {
    this.resetForm();
    this.runAutoSave();
  },

  handleSuccessfullValidation() {
    this.handleRender();
  },

  handleRender() {
    const {template} = this.state;
    const dataSourceUrlValue = this.refs.dataSourceUrl.getValue();

    if (dataSourceUrlValue.length) {
      return Actions.renderFromEndpoint(template.name, dataSourceUrlValue);
    }

    Actions.renderTemplate(template.name, template.context);
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

  render() {
    const {template, isLoading} = this.state;
    const instanceName = this.getParams().instanceName;

    return (
      <div>
        <InnerToolbar
          title={`Template: ${template.name}`}>
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
            onTouchTap={() => this.handleUpdate()} />
          <RaisedButton
            label="RENDER"
            primary={true}
            style={{marginLeft: 5, marginRight: 0}}
            icon={<FontIcon className="synicon-play"/>}
            onTouchTap={this.handleFormValidation}/>
        </InnerToolbar>

        <Loading show={isLoading}>
          <div className="row">
            <div className="col-flex-1" style={{borderRight: '1px solid rgba(224,224,224,.5)', display: 'flex'}}>
              <TogglePanel
                title="Code"
                initialOpen={true}
                style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                {this.renderErrorNotifications('content')}
                <Editor
                  ref="contentEditor"
                  name="contentEditor"
                  mode="django"
                  onChange={this.handleOnSourceChange}
                  onLoad={this.clearAutosaveTimer}
                  value={template.content}/>
              </TogglePanel>
            </div>
            <div className="col-flex-1" style={{padding: 0, maxWidth: 600}}>

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
                    hintText={<Truncate text={`e.g. https://api.syncano.rocks/v1/instances/${instanceName}/classes/`}/>}
                    onChange={this.handleOnSourceChange}
                    floatingLabelText="Data source URL"/>
                </TogglePanel>
              </div>

              <div style={{borderBottom: '1px solid rgba(224,224,224,.5)'}}>
                <TogglePanel
                  title="Context"
                  initialOpen={true}>
                  {this.renderErrorNotifications('context')}
                  <Editor
                    name="contextEditor"
                    ref="contextEditor"
                    mode="json"
                    height="200px"
                    onChange={this.handleOnSourceChange}
                    onLoad={this.clearAutosaveTimer}
                    value={JSON.stringify(this.state.template.context, null, '\t') || [
                      '{',
                      '    "foo": "bar",',
                      '    "bar": "foo"',
                      '}'
                    ].join('\n')} />
                </TogglePanel>
              </div>

              <div>
                <TogglePanel
                  title="Preview"
                  initialOpen={true}>
                  <Editor
                    name="previewEditor"
                    ref="previewEditor"
                    mode="html"
                    readOnly={true}
                    value="" />
                </TogglePanel>
              </div>
            </div>
          </div>
        </Loading>
      </div>
    );
  }
});
