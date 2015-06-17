var React                = require('react'),
    Reflux               = require('reflux'),

    HeaderMixin          = require('../Header/HeaderMixin'),
    ValidationMixin      = require('../../mixins/ValidationMixin'),

    ProfileActions       = require('./ProfileActions'),
    ProfileSettingsStore = require('./ProfileSettingsStore'),
    SessionStore         = require('../Session/SessionStore'),

    mui                  = require('material-ui'),
    TextField            = mui.TextField,
    RaisedButton         = mui.RaisedButton,
    Paper                = mui.Paper,

    Notification         = require('../../common/Notification/Notification.react');


module.exports = React.createClass({

  displayName: 'ProfileSettings',

  mixins: [
    Reflux.connect(ProfileSettingsStore),
    HeaderMixin,
    React.addons.LinkedStateMixin,
    ValidationMixin
  ],

  validatorConstraints: {
    firstName: {
      presence: true
    },
    lastName: {
      presence: true
    }
  },

  headerBreadcrumbs: [
    {
      route: 'dashboard',
      label: 'Home'
    },
    {
      route: 'profile-settings',
      label: 'Account'
    },
    {
      route: 'profile-settings',
      label: 'Profile'
    }
  ],

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

  handleSubmit: function (event) {
    event.preventDefault();

    this.validate(function(isValid){
      if (isValid === true) {
        ProfileActions.updateSettings(this.state);
      }
    }.bind(this));
  },

  renderError: function () {
    if (!this.state.errors || this.state.errors.feedback === undefined) {
      return;
    }

    return (
      <Notification type="error">{this.state.errors.feedback}</Notification>
    );
  },

  renderFeedback: function () {
    if (!this.state.feedback || this.state.feedback === undefined) {
      return
    }

    return (
      <Notification>{this.state.feedback}</Notification>
    );
  },

  getStyles: function() {
    return {
      container: {
        marginTop: 96,
        marginBottom: 96
      },
      header: {
        padding: '48px 48px 0',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 20,
        lineHeight: '24px'
      },
      content: {
        padding: 48
      },
      form: {
        maxWidth: 416
      },
      updateButton: {
        height: 36,
        lineHeight: '36px',
        fontWeigh: 400,
        boxShadow: 0
      },
      updateButtonLabel: {
        lineHeight: '36px',
        fontWeight: 400,
        paddingLeft: 30,
        paddingRight: 30
      }
    }
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <div className="container" style={styles.container}>
        <div className="row align-center">
          <Paper className="col-md-25" zDepth={1} rounded={false}>
            <div style={styles.header}>
              Profile
            </div>
            <div style={styles.content}>
              {this.renderError()}
              {this.renderFeedback()}
              <form
                style={styles.form}
                onSubmit={this.handleSubmit}
                acceptCharset="UTF-8"
                method="post">
                <TextField
                  ref="firstName"
                  valueLink={this.linkState('firstName')}
                  defaultValue={this.state.firstName}
                  errorText={this.getValidationMessages('firstName').join()}
                  name="firstName"
                  floatingLabelText="First name"
                  className="text-field"
                  autoComplete="firstName"
                  hintText="First name"
                  fullWidth={true} />
                <TextField
                  ref="lastName"
                  valueLink={this.linkState('lastName')}
                  defaultValue={this.state.lastName}
                  errorText={this.getValidationMessages('lastName').join()}
                  name="lastName"
                  floatingLabelText="Last name"
                  className="text-field"
                  autoComplete="lastName"
                  hintText="Last name"
                  fullWidth={true} />
                <TextField
                  ref="email"
                  name="email"
                  value={this.state.email}
                  floatingLabelText="Email"
                  className="text-field vm-6-b"
                  autoComplete="email"
                  hintText="Your email"
                  disabled={true}
                  fullWidth={true} />
                <RaisedButton
                  type="submit"
                  label="Update"
                  style={styles.updateButton}
                  labelStyle={styles.updateButtonLabel}
                  className="raised-button"
                  secondary={true} />
              </form>
            </div>
          </Paper>
        </div>
      </div>
    );
  }

});