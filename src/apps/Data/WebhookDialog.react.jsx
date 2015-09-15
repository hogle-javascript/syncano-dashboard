import React from 'react';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import WebhooksActions from './WebhooksActions';
import WebhookDialogStore from './WebhookDialogStore';
import CodeBoxesActions from '../CodeBoxes/CodeBoxesActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'WebhookDialog',

  mixins: [
    Reflux.connect(WebhookDialogStore),
    Mixins.Dialog,
    Mixins.Form
  ],

  validatorConstraints: {
    name: {
      presence: true
    },
    codebox: {
      presence: true
    }
  },

  handleDialogShow() {
    console.info('WebhookDialog::handleDialogShow');
    CodeBoxesActions.fetch();
  },

  handleAddSubmit() {
    WebhooksActions.createWebhook({
      name: this.state.name,
      codebox: this.state.codebox,
      description: this.state.description,
      public: this.state.public
    });
  },

  handleEditSubmit() {
    WebhooksActions.updateWebhook(
      this.state.name, {
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
    let title = this.hasEditMode() ? 'Edit' : 'Add';
    let dialogStandardActions = [
      <MUI.FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCancel}
        ref="cancel"/>,
      <MUI.FlatButton
        type="submit"
        key="confirm"
        label="Confirm"
        primary={true}
        ref="submit"/>
    ];

    return (
      <form
        onSubmit={this.handleFormValidation}
        method="post"
        acceptCharset="UTF-8">
        <Common.Dialog
          ref='dialog'
          title={title + ' a Webhook'}
          openImmediately={this.props.openImmediately}
          actions={dialogStandardActions}
          onShow={this.handleDialogShow}
          onDismiss={this.resetDialogState}
          modal={true}>
          <div>
            {this.renderFormNotifications()}
            <MUI.TextField
              ref="name"
              name="name"
              fullWidth={true}
              disabled={this.hasEditMode()}
              valueLink={this.linkState('name')}
              errorText={this.getValidationMessages('name').join(' ')}
              hintText="Name of the Webhook"
              floatingLabelText="Name"/>
            <MUI.TextField
              ref="description"
              name="description"
              fullWidth={true}
              valueLink={this.linkState('description')}
              errorText={this.getValidationMessages('description').join(' ')}
              hintText="Description of the Webhook"
              floatingLabelText="Description"/>
            <MUI.SelectField
              className="codebox-dropdown"
              ref="codebox"
              name="codebox"
              floatingLabelText="CodeBox"
              valueLink={this.linkState('codebox')}
              errorText={this.getValidationMessages('codebox').join(' ')}
              valueMember="payload"
              displayMember="text"
              fullWidth={true}
              menuItems={this.state.codeboxes}/>
            <MUI.Toggle
              ref='public'
              name='public'
              onToggle={this.handleToogle}
              style={{marginTop: 20}}
              defaultToggled={this.state.public}
              label='Make this Webhook public?'/>
          </div>
        </Common.Dialog>
      </form>
    );
  }
});

