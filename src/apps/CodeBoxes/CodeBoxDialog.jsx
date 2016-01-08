import React from 'react';
import Reflux from 'reflux';

// Utils
import {DialogMixin, FormMixin} from '../../mixins';

// Stores and Actions
import Actions from './CodeBoxesActions';
import DialogStore from './CodeBoxDialogStore';
import SnippetsActions from '../Snippets/SnippetsActions';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'CodeBoxDialog',

  mixins: [
    Reflux.connect(DialogStore),
    DialogMixin,
    FormMixin
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    codebox: {
      presence: {
        message: `^Snippet can't be blank`
      }
    }
  },

  handleDialogShow() {
    console.info('CodeBoxDialog::handleDialogShow');
    SnippetsActions.fetch();
  },

  handleAddSubmit() {
    Actions.createCodeBox({
      name: this.state.name,
      codebox: this.state.codebox,
      description: this.state.description,
      public: this.state.public
    });
  },

  handleEditSubmit() {
    Actions.updateCodeBox(this.state.name, {
      codebox: this.state.codebox,
      description: this.state.description,
      public: this.state.public
    });
  },

  handleToogle(event, status) {
    let state = {};

    state[event.target.name] = status;
    this.setState(state);
  },

  render() {
    let title = this.hasEditMode() ? 'Edit' : 'Create';
    let dialogStandardActions = [
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        key="confirm"
        label="Confirm"
        primary={true}
        onTouchTap={this.handleFormValidation}
        ref="submit"/>
    ];

    return (
      <Common.Dialog
        key='dialog'
        ref='dialog'
        title={`${title} a CodeBox Socket`}
        defaultOpen={this.props.defaultOpen}
        actions={dialogStandardActions}
        open={this.state.open}
        modal={true}>
        {this.renderFormNotifications()}
        <MUI.TextField
          ref="name"
          name="name"
          fullWidth={true}
          disabled={this.hasEditMode()}
          valueLink={this.linkState('name')}
          errorText={this.getValidationMessages('name').join(' ')}
          hintText="Name of the CodeBox"
          floatingLabelText="Name"/>
        <MUI.TextField
          ref="description"
          name="description"
          fullWidth={true}
          valueLink={this.linkState('description')}
          errorText={this.getValidationMessages('description').join(' ')}
          hintText="Description of the CodeBox"
          floatingLabelText="Description"/>
        <MUI.SelectField
          className="snippet-dropdown"
          ref="snippet"
          name="snippet"
          floatingLabelText="Snippet"
          valueLink={this.linkState('codebox')}
          errorText={this.getValidationMessages('codebox').join(' ')}
          valueMember="payload"
          displayMember="text"
          fullWidth={true}
          menuItems={this.state.snippets}/>
        <MUI.Toggle
          ref='public'
          name='public'
          onToggle={this.handleToogle}
          style={{marginTop: 20}}
          defaultToggled={this.state.public}
          label='Make this CodeBox public?'/>
      </Common.Dialog>
    );
  }
});

