import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';

import UnsavedDataMixin from './UnsavedDataMixin';
import Mixins from '../../mixins';

import Store from './SnippetStore';
import Actions from './SnippetActions';

import MUI from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container';

let SnackbarNotificationMixin = Common.SnackbarNotification.Mixin;

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
    Mixins.Mousetrap,
    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.Form,
    MUI.Utils.Styles
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
      container: {
        margin: '25px auto',
        width: '100%',
        maxWidth: '600px'
      },
      field: {
        margin: '10px 14px'
      },
      deleteIcon: {
        padding: '24px 12px'
      },
      buttonsSection: {
        margin: '15px 20px 0'
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
    let newField = {
      key: this.refs.newFieldKey.getValue(),
      value: this.refs.newFieldValue.getValue()
    };

    if (this.hasKey(newField.key)) {
      this.refs.newFieldKey.setErrorText('Field with this name already exist. Please choose another.');
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
    let newField = {
      key: this.refs[`fieldKey${index}`].getValue(),
      value: this.refs[`fieldValue${index}`].getValue()
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

  initDialogs() {
    return [{
      dialog: Common.Dialog,
      params: {
        key: 'unsavedDataWarn',
        ref: 'unsavedDataWarn',
        title: 'Unsaved Snippet config',
        actions: [
          {
            text: 'Just leave',
            onClick: this._handleContinueTransition
          },
          {
            text: 'Continue editing',
            onClick: this.handleCancel.bind(null, 'unsavedDataWarn')
          }
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
          className="row"
          key={index}>
          <MUI.TextField
            key={`fieldKey${index}`}
            ref={`fieldKey${index}`}
            hintText="Key"
            defaultValue={field.key}
            value={this.state.snippetConfig[index].key}
            style={styles.field}
            onChange={this.handleUpdateKey.bind(this, field.key, index)} />
          <MUI.TextField
            key={`fieldValue${index}`}
            ref={`fieldValue${index}`}
            hintText="Value"
            defaultValue={field.value}
            value={this.state.snippetConfig[index].value}
            style={styles.field}
            onChange={this.handleUpdateKey.bind(this, field.key, index)} />
          <MUI.IconButton
            iconClassName="synicon-close"
            style={styles.deleteIcon}
            tooltip="Delete key"
            onClick={this.handleDeleteKey.bind(this, index)}/>
        </div>
      );
    });

    return configFields;
  },

  renderNewFiledSection() {
    let styles = this.getStyles();

    return (
      <form
        key="form"
        className="row"
        onSubmit={this.handleAddField}>
        <MUI.TextField
          className="config-input-key"
          ref="newFieldKey"
          key="newFieldKey"
          hintText="Key"
          defaultValue=""
          style={styles.field} />
        <MUI.TextField
          className="config-input-value"
          ref="newFieldValue"
          key="newFieldValue"
          hintText="Value"
          defaultValue=""
          style={styles.field} />
        <MUI.IconButton
          className="add-field-button"
          iconClassName="synicon-plus"
          tooltip="Add field"
          type="submit"
          style={styles.deleteIcon} />
      </form>
    );
  },

  renderButtons() {
    let styles = this.getStyles();

    return (
      <div
        className="row align-right"
        style={styles.buttonsSection}>
        <MUI.FlatButton
          label="Cancel"
          onClick={this.handleCancelChanges} />
        <MUI.RaisedButton
          label="Save"
          style={styles.saveButton}
          secondary={true}
          onTouchTap={this.handleFormValidation} />
      </div>
    );
  },

  render() {
    let styles = this.getStyles();

    if (!this.state.snippetConfig) {
      return null;
    }

    return (
      <div>
        <Container style={styles.container}>
          {this.getDialogs()}
          {this.renderFields()}
          {this.renderNewFiledSection()}
          {this.renderButtons()}
          <Common.Show if={this.getValidationMessages('config').length > 0}>
            <div style={styles.notification}>
              <Common.Notification type="error">
                {this.getValidationMessages('config').join(' ')}
              </Common.Notification>
            </div>
          </Common.Show>
        </Container>
      </div>
    );
  }
}));
