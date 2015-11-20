import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import Reflux from 'reflux';
import _ from 'lodash';

import UnsavedDataMixin from './UnsavedDataMixin';
import Mixins from '../../mixins';

import Store from './CodeBoxStore';
import Actions from './CodeBoxActions';

import MUI from 'syncano-material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

let SnackbarNotificationMixin = Common.SnackbarNotification.Mixin;

export default Radium(React.createClass({

  displayName: 'CodeBoxConfig',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    Router.Navigation,

    SnackbarNotificationMixin,
    UnsavedDataMixin,
    Mixins.Mousetrap,
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

    if (this.state.currentCodeBox) {
      let refNames = _.keys(this.refs)
        .filter((refName) => _.includes(refName.toLowerCase(), 'field'));

      _.forEach(refNames, (refName) => {
        let inputNode = this.refs[refName].refs.input.getDOMNode();

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

  isConfigValid() {
    let codeBoxConfig = this.state.codeBoxConfig;

    return _.uniq(_.pluck(codeBoxConfig, 'key')).length === codeBoxConfig.length;
  },

  hasKey(newKey) {
    let codeBoxConfig = this.state.codeBoxConfig;
    let existingKeys = _.pluck(codeBoxConfig, 'key');

    return _.includes(existingKeys, newKey);
  },

  handleAddField(event) {
    event.preventDefault();
    let codeBoxConfig = this.state.codeBoxConfig;
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

    codeBoxConfig.push(newField);
    this.setState({codeBoxConfig});
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

    Actions.updateCodeBox(this.state.currentCodeBox.id, {config});
    this.setSnackbarNotification({
      message: 'Saving...'
    });
  },

  handleDeleteKey(index) {
    let codeBoxConfig = this.state.codeBoxConfig;

    codeBoxConfig.splice(index, 1);
    this.clearValidations();
    this.setState({codeBoxConfig});
  },

  handleUpdateKey(key, index) {
    let codeBoxConfig = this.state.codeBoxConfig;
    let newField = {
      key: this.refs[`fieldKey${index}`].getValue(),
      value: this.refs[`fieldValue${index}`].getValue()
    };

    if (key !== newField.key && this.hasKey(newField.key)) {
      codeBoxConfig[index] = newField;
      this.setState({codeBoxConfig}, () => {
        this.refs[`fieldKey${index}`].setErrorText('Field with this name already exist. Please choose another.');
      });
      return;
    }
    codeBoxConfig[index] = newField;
    this.setState({codeBoxConfig});
    this.clearValidations();
  },

  handleCancelChanges() {
    let newState = this.state;

    newState.codeBoxConfig = Store.mapConfig(this.state.currentCodeBox.config);
    this.replaceState(newState);
    this.clearValidations();
  },

  handleSuccessfullValidation() {
    this.handleUpdate();
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
            key={`fieldKey${index}`}
            ref={`fieldKey${index}`}
            hintText="Key"
            defaultValue={field.key}
            value={this.state.codeBoxConfig[index].key}
            style={styles.field}
            onChange={this.handleUpdateKey.bind(this, field.key, index)} />
          <MUI.TextField
            key={`fieldValue${index}`}
            ref={`fieldValue${index}`}
            hintText="Value"
            defaultValue={field.value}
            value={this.state.codeBoxConfig[index].value}
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

    if (!this.state.codeBoxConfig) {
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
