var React                = require('react'),
    Reflux               = require('reflux'),

    HeaderMixin          = require('../Header/HeaderMixin'),
    FormMixin            = require('../../mixins/FormMixin'),

    ProfileActions       = require('./ProfileActions'),
    ProfileSettingsStore = require('./ProfileSettingsStore'),
    SessionStore         = require('../Session/SessionStore'),

    MUI                  = require('material-ui'),
    Container            = require('../../common/Container');

module.exports = React.createClass({

  displayName: 'ProfileSettings',

  mixins: [
    Reflux.connect(ProfileSettingsStore),
    React.addons.LinkedStateMixin,
    HeaderMixin,
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
        padding      : 48
      },
      form: {
        maxWidth     : 416
      },
      updateButton: {
        height       : 36,
        lineHeight   : '36px',
        boxShadow    : 0
      },
      updateButtonLabel: {
        lineHeight   : '36px',
        fontWeight   : 400,
        paddingLeft  : 30,
        paddingRight : 30
      }
    }
  },

  handleSuccessfullValidation: function() {
    ProfileActions.updateSettings(this.state);
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <Container.Profile
        headerText = 'Profile'
        show       = {this.state.isLoading}
      >
        <div style={styles.content}>
          {this.renderFormNotifications()}
          <form
            style         = {styles.form}
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">

            <MUI.TextField
              ref               = "firstName"
              valueLink         = {this.linkState('firstName')}
              defaultValue      = {this.state.firstName}
              errorText         = {this.getValidationMessages('firstName').join(' ')}
              name              = "firstName"
              floatingLabelText = "First name"
              className         = "text-field"
              autoComplete      = "firstName"
              hintText          = "First name"
              fullWidth         = {true}
            />

            <MUI.TextField
              ref               = "lastName"
              valueLink         = {this.linkState('lastName')}
              defaultValue      = {this.state.lastName}
              errorText         = {this.getValidationMessages('lastName').join(' ')}
              name              = "lastName"
              floatingLabelText = "Last name"
              className         = "text-field"
              autoComplete      = "lastName"
              hintText          = "Last name"
              fullWidth         = {true}
            />

            <MUI.TextField
              ref               = "email"
              name              = "email"
              value             = {this.state.email}
              floatingLabelText = "Email"
              className         = "text-field vm-6-b"
              autoComplete      = "email"
              hintText          = "Your email"
              disabled          = {true}
              fullWidth         = {true}
            />

            <MUI.RaisedButton
              type       = "submit"
              label      = "Update"
              style      = {styles.updateButton}
              labelStyle = {styles.updateButtonLabel}
              className  = "raised-button"
              secondary  = {true}
            />
          </form>
        </div>
      </Container.Profile>
    );
  }
});
