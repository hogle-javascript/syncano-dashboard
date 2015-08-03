import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import ZeroClipboard from 'react-zeroclipboard';

import FormMixin from '../../mixins/FormMixin';
import HeaderMixin from '../Header/HeaderMixin';

import Store from './ProfileAuthenticationStore';
import Actions from './ProfileActions';

import MUI from 'material-ui';
import Container from '../../common/Container';

export default Radium(React.createClass({

  displayName: 'ProfileAuthentication',

  mixins: [
    Reflux.connect(Store),
    React.addons.LinkedStateMixin,
    HeaderMixin,
    FormMixin
  ],

  validatorConstraints: {
    currentPassword: {
      presence: true
    },
    newPassword: {
      presence: true
    },
    confirmNewPassword: {
      presence: true,
      equality: 'newPassword'
    }
  },

  headerMenuItems: [
    {
      route: 'profile-settings',
      label: 'Profile'
    },
    {
      route: 'profile-authentication',
      label: 'Authentication'
    },
    {
      route: 'profile-billing',
      label: 'Billing'
    },
    {
      route: 'profile-invitations',
      label: 'Invitations'
    }
  ],

  getStyles() {
    return {
      content: {
        padding         : '24px 48px 48px'
      },
      contentRow: {
        display         : '-webkit-flex; display: flex',
        alignItems      : 'center'
      },
      accountKey: {
        margin          : '0 16px 0 0'
      },
      form: {
        maxWidth        : 416
      },
      updateButton: {
        height          : 36,
        lineHeight      : '36px',
        boxShadow       : 0
      },
      updateButtonLabel : {
        lineHeight      : '36px',
        fontWeight      : 400,
        paddingLeft     : 30,
        paddingRight    : 30
      }
    }
  },

  handleCopyClick() {
    this.refs.snackbar.show();
  },

  handleResetClick() {
    Actions.resetKey();
  },

  handleSuccessfullValidation() {
    Actions.changePassword(this.state);
  },

  render() {
    let styles = this.getStyles();

    return (
      <Container.Profile
        headerText = 'Authentication'
        show       = {this.state.isLoading}>
        <div style={styles.content}>
          <h6>Account key</h6>
          <div style={styles.contentRow}>
            <p style={styles.accountKey}>{this.state.account_key}</p>
            <ZeroClipboard text={this.state.account_key}>
              <MUI.FlatButton
                label   = "COPY"
                primary = {true}
                onClick = {this.handleCopyClick} />
            </ZeroClipboard>
            <MUI.FlatButton
              label   = "RESET"
              primary = {true}
              onClick = {this.handleResetClick} />
          </div>
          <MUI.Snackbar
            ref     = "snackbar"
            message = "API key copied to the clipboard" />
        </div>
        <div style={styles.content}>
          <h6>Password</h6>
          {this.renderFormNotifications()}
          <form
            style         = {styles.form}
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">
            <MUI.TextField
              ref               = "currentPassword"
              type              = "password"
              valueLink         = {this.linkState('currentPassword')}
              errorText         = {this.getValidationMessages('currentPassword').join(' ')}
              name              = "currentPassword"
              floatingLabelText = "Current password"
              className         = "text-field"
              autoComplete      = "currentPassword"
              hintText          = "Current password"
              fullWidth         = {true} />
            <MUI.TextField
              ref               = "newPassword"
              type              = "password"
              valueLink         = {this.linkState('newPassword')}
              errorText         = {this.getValidationMessages('newPassword').join(' ')}
              name              = "newPassword"
              floatingLabelText = "New password"
              className         = "text-field"
              autoComplete      = "newPassword"
              hintText          = "New password"
              fullWidth         = {true} />
            <MUI.TextField
              ref               = "confirmNewPassword"
              type              = "password"
              valueLink         = {this.linkState('confirmNewPassword')}
              errorText         = {this.getValidationMessages('confirmNewPassword').join(' ')}
              name              = "confirmNewPassword"
              floatingLabelText = "Confirm new password"
              className         = "text-field vm-6-b"
              autoComplete      = "confirmNewPassword"
              hintText          = "Confirm new password"
              fullWidth         = {true} />
            <MUI.RaisedButton
              type       = "submit"
              label      = "Update"
              style      = {styles.updateButton}
              labelStyle = {styles.updateButtonLabel}
              className  = "raised-button"
              secondary  = {true} />
          </form>
        </div>
      </Container.Profile>
    );
  }
}));
