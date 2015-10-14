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
import Common from '../../common'
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
      let refNames = _.keys(this.refs, (ref) => {
        return ref
      }).filter((refName) => _.includes(refName, 'field') || _.includes(refName, 'Field'));

      _.forEach(refNames, (refName) => {
        let inputNode = this.refs[refName].refs.input.getDOMNode();

        if (inputNode && !_.includes(inputNode.className, 'mousetrap')) {
          inputNode.classList.add('mousetrap');
        }
      })
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
        margin: '20px 10px'
      },
      wrongConfigSnackbar: {
        color: MUI.Styles.Colors.red400
      },
      deleteIcon: {
        padding: '24px 12px'
      }
    }
  },

  isConfigValid() {
    let configValue = this.state.currentCodeBox ? this.state.currentCodeBox.config : null;

    if (configValue) {
      try {
        JSON.parse(configValue);
        return true
      } catch (err) {
        return false
      }
    }
  },

  isSaved() {
    if (this.state.currentCodeBox && this.state.originalConfig) {
      return _.isEqual(this.state.currentCodeBox.config, this.state.originalConfig)
    }
  },

  handleAddField() {
    let currentCodeBox = this.state.currentCodeBox;
    let newKey = this.refs.newFieldKey.getValue();
    let newValue = this.refs.newFieldValue.getValue();

    if (_.has(currentCodeBox.config, newKey)) {
      this.refs.newFieldKey.setErrorText('Config already have key with this name. Please choose another name.');
      return
    }

    _.set(currentCodeBox.config, newKey, newValue);
    this.setState({currentCodeBox}, () => {
      this.refs.newFieldKey.clearValue();
      this.refs.newFieldValue.clearValue();
    }, this.runAutoSave())
  },

  handleUpdate() {
    let config = this.state.currentCodeBox.config;

    Actions.updateCodeBox(this.state.currentCodeBox.id, {config});
    this.setSnackbarNotification({
      message: 'Saving...'
    });
  },

  handleDeleteKey(key) {
    let currentCodeBox = this.state.currentCodeBox;

    delete currentCodeBox.config[key];
    this.setState({currentCodeBox});
  },

  handleUpdateKey(key) {
    let currentCodeBox = this.state.currentCodeBox;
    let newKey = this.refs[`fieldKey${key}`].getValue();
    let newValue = this.refs[`fieldValue${key}`].getValue();
    let newField = {};

    newField[newKey] = newValue;

    if (key !== newKey && _.has(currentCodeBox.config, newKey)) {
      this.refs[`fieldKey${key}`].setErrorText('Config already have key with this name. Please choose another name.');
      return;
    }

    currentCodeBox.config = _.omit(currentCodeBox.config, key);
    _.assign(currentCodeBox.config, newField);

    this.setState({currentCodeBox});
    this.refs[`fieldKey${key}`].setErrorText(null);
    this.runAutoSave();
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
    }]
  },

  renderFields() {
    if (!this.state.currentCodeBox) {
      return null
    }

    let styles = this.getStyles();
    let codeboxConfig = this.state.currentCodeBox ? this.state.currentCodeBox.config : {};
    let configFields = _.map(_.keys(codeboxConfig), (key) => {
      return (
        <div
          className="row"
          key={`row${key}`}>
          <MUI.TextField
            key={`fieldKey${key}`}
            ref={`fieldKey${key}`}
            hintText="Key"
            defaultValue={key}
            style={styles.field}
            onBlur={this.handleUpdateKey.bind(null, key)}
            onFocus={this.clearAutosaveTimer} />
          <MUI.TextField
            key={`fieldValue${key}`}
            ref={`fieldValue${key}`}
            hintText="Value"
            defaultValue={codeboxConfig[key]}
            style={styles.field}
            onBlur={this.handleUpdateKey.bind(null, key)}
            onFocus={this.clearAutosaveTimer} />
          <MUI.IconButton
            iconClassName="synicon-delete"
            style={styles.deleteIcon}
            tooltip="Delete key"
            onClick={this.handleDeleteKey.bind(null, key)}/>
        </div>
      )
    });

    return _.sortBy(configFields, 'key');
  },

  renderNewFiledSection() {
    let styles = this.getStyles();

    return (
      <div>
        <div className="row">
          <MUI.TextField
            ref="newFieldKey"
            hintText="Key"
            defaultValue=""
            style={styles.field} />
          <MUI.TextField
            ref="newFieldValue"
            hintText="Value"
            defaultValue=""
            style={styles.field} />
        </div>
        <div>
          <MUI.RaisedButton
            label="Add field"
            secondary={true}
            onClick={this.handleAddField}
            style={styles.addButton} />
          <MUI.Checkbox
            ref="autosaveCheckbox"
            name="autoSaveCheckbox"
            label="Autosave"
            style={styles.addButton}
            defaultChecked={this.isAutosaveEnabled()}
            onCheck={this.saveCheckboxState} />
        </div>
      </div>
    )
  },

  render() {
    let styles = this.getStyles();

    if (!this.state.currentCodeBox) {
      return null
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
    )
  }
}))
