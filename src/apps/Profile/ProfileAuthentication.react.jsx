var React                      = require('react'),
    Reflux                     = require('reflux'),
    ZeroClipboard              = require('react-zeroclipboard'),

    HeaderMixin                = require('../Header/HeaderMixin'),
    FormMixin                  = require('../../mixins/FormMixin'),

    ProfileActions             = require('./ProfileActions'),
    ProfileAuthenticationStore = require('./ProfileAuthenticationStore'),

    mui                        = require('material-ui'),
    Common                     = require('../../common');

module.exports = React.createClass({

  displayName: 'ProfileAuthentication',

  mixins: [
    Reflux.connect(ProfileAuthenticationStore),
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

  getStyles: function() {
    return {
      content: {
        padding         : 48
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

  handleCopyClick: function() {
    this.refs.snackbar.show();
  },

  handleResetClick: function() {
    ProfileActions.resetKey();
  },

  handleSuccessfullValidation: function() {
    ProfileActions.changePassword(this.state);
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <Common.Container.Profile
        headerText = 'Authentication'
        show       = {this.state.isLoading}
      >
        <div style={styles.content}>
          <h6>Account key</h6>
          <p>{this.state.account_key}</p>
          <ZeroClipboard text={this.state.account_key}>
            <mui.FlatButton
              label   = "COPY"
              primary = {true}
              onClick = {this.handleCopyClick}
            />
          </ZeroClipboard>
          <mui.FlatButton
            label   = "RESET"
            primary = {true}
            onClick = {this.handleResetClick}
          />
          <mui.Snackbar
            ref     = "snackbar"
            message = "API key copied to the clipboard"
          />
        </div>
        <div style={styles.content}>
          <h6>Password</h6>
          {this.renderFormNotifications()}
          <form
            style         = {styles.form}
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">

            <mui.TextField
              ref               = "currentPassword"
              type              = "password"
              valueLink         = {this.linkState('currentPassword')}
              errorText         = {this.getValidationMessages('currentPassword').join(' ')}
              name              = "currentPassword"
              floatingLabelText = "Current password"
              className         = "text-field"
              autoComplete      = "currentPassword"
              hintText          = "Current password"
              fullWidth         = {true}
            />

            <mui.TextField
              ref               = "newPassword"
              type              = "password"
              valueLink         = {this.linkState('newPassword')}
              errorText         = {this.getValidationMessages('newPassword').join(' ')}
              name              = "newPassword"
              floatingLabelText = "New password"
              className         = "text-field"
              autoComplete      = "newPassword"
              hintText          = "New password"
              fullWidth         = {true}
            />

            <mui.TextField
              ref               = "confirmNewPassword"
              type              = "password"
              valueLink         = {this.linkState('confirmNewPassword')}
              errorText         = {this.getValidationMessages('confirmNewPassword').join(' ')}
              name              = "confirmNewPassword"
              floatingLabelText = "Confirm new password"
              className         = "text-field vm-6-b"
              autoComplete      = "confirmNewPassword"
              hintText          = "Confirm new password"
              fullWidth         = {true}
            />

            <mui.RaisedButton
              type       = "submit"
              label      = "Update"
              style      = {styles.updateButton}
              labelStyle = {styles.updateButtonLabel}
              className  = "raised-button"
              secondary  = {true}
            />
          </form>
        </div>
      </Common.Container.Profile>
    );
  }
});
