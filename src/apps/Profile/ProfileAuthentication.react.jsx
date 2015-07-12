var React                      = require('react'),
    Reflux                     = require('reflux'),
    ZeroClipboard              = require('react-zeroclipboard'),

    HeaderMixin                = require('../Header/HeaderMixin'),
    FormMixin                  = require('../../mixins/FormMixin'),

    ProfileActions             = require('./ProfileActions'),
    ProfileAuthenticationStore = require('./ProfileAuthenticationStore'),

    mui                        = require('material-ui'),
    TextField                  = mui.TextField,
    RaisedButton               = mui.RaisedButton,
    FlatButton                 = mui.FlatButton,
    Snackbar                   = mui.Snackbar,
    Paper                      = mui.Paper,
    Loading                    = require('../../common/Loading/Loading.react');


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
      container: {
        marginTop       : 96,
        marginBottom    : 96
      },
      header: {
        padding         : '48px 48px 0',
        color           : 'rgba(0, 0, 0, 0.87)',
        fontSize        : 20,
        lineHeight      : '24px'
      },
      content: {
        padding         : 48
      },
      form: {
        maxWidth        : 416
      },
      updateButton: {
        height          : 36,
        lineHeight      : '36px',
        fontWeigh       : 400,
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

  handleSuccessfullValidation: function () {
    ProfileActions.changePassword(this.state);
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <div
        className = "container"
        style     = {styles.container}>
        <div className="row align-center">
          <Paper
            className ="col-md-25"
            zDepth    = {1}
            rounded   = {false}>
            <div style={styles.header}>
              Authentication
            </div>

            <Loading show={this.state.isLoading}>
              <div style={styles.content}>
                <h6>Account key</h6>
                <p>{this.state.account_key}</p>
                <ZeroClipboard text={this.state.account_key}>
                  <FlatButton
                    label       = "COPY"
                    primary     = {true}
                    onClick     = {this.handleCopyClick} />
                </ZeroClipboard>
                <FlatButton
                  label       = "RESET"
                  primary     = {true}
                  onClick     = {this.handleResetClick} />
                <Snackbar
                  ref="snackbar"
                  message="API key copied to the clipboard" />
              </div>
              <div style={styles.content}>
                <h6>Password</h6>
                {this.renderFormNotifications()}
                <form
                  style         = {styles.form}
                  onSubmit      = {this.handleFormValidation}
                  acceptCharset = "UTF-8"
                  method        = "post">
                  <TextField
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
                  <TextField
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
                  <TextField
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
                  <RaisedButton
                    type       = "submit"
                    label      = "Update"
                    style      = {styles.updateButton}
                    labelStyle = {styles.updateButtonLabel}
                    className  = "raised-button"
                    secondary  = {true} />
                </form>
              </div>
            </Loading>
          </Paper>
        </div>
      </div>
    );
  }

});