import React from 'react';
import Reflux from 'reflux';

import {FormMixin} from '../../mixins';

import Actions from './ProfileActions';
import Store from './ProfileSettingsStore';

import {TextField, RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
import {InnerToolbar} from '../../common';

export default React.createClass({

  displayName: 'ProfileSettings',

  mixins: [
    Reflux.connect(Store),
    FormMixin
  ],

  validatorConstraints: {
    firstName: {
      presence: true
    },
    lastName: {
      presence: true
    }
  },

  getStyles() {
    return {
      form: {
        maxWidth: 416
      },
      updateButton: {
        height: 36,
        lineHeight: '36px',
        boxShadow: 0
      },
      updateButtonLabel: {
        lineHeight: '36px',
        fontWeight: 400,
        paddingLeft: 30,
        paddingRight: 30
      }
    };
  },

  handleSuccessfullValidation() {
    Actions.updateSettings(this.state);
  },

  render() {
    let styles = this.getStyles();

    return (
      <div>
        <InnerToolbar title="Profile"/>
        <Container>
          {this.renderFormNotifications()}
          <form
            style={styles.form}
            onSubmit={this.handleFormValidation}
            acceptCharset="UTF-8"
            method="post">
            <TextField
              ref="firstName"
              valueLink={this.linkState('firstName')}
              defaultValue={this.state.firstName}
              errorText={this.getValidationMessages('firstName').join(' ')}
              name="firstName"
              floatingLabelText="First name"
              autoComplete="firstName"
              hintText="First name"
              fullWidth={true}/>
            <TextField
              ref="lastName"
              valueLink={this.linkState('lastName')}
              defaultValue={this.state.lastName}
              errorText={this.getValidationMessages('lastName').join(' ')}
              name="lastName"
              floatingLabelText="Last name"
              autoComplete="lastName"
              hintText="Last name"
              fullWidth={true}/>
            <TextField
              ref="email"
              name="email"
              value={this.state.email}
              floatingLabelText="Email"
              className="vm-6-b"
              autoComplete="email"
              hintText="Your email"
              disabled={true}
              fullWidth={true}/>
            <RaisedButton
              type="submit"
              label="Update"
              style={styles.updateButton}
              labelStyle={styles.updateButtonLabel}
              className="raised-button"
              disabled={!this.state.canSubmit}
              primary={true}/>
          </form>
        </Container>
      </div>
    );
  }
});
