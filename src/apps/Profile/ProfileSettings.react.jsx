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
      label: 'Home',
    },
    {
      route: 'profile-settings',
      label: 'Account',
    },
    {
      route: 'profile-settings',
      label: 'Profile',
    }
  ],

  headerMenuItems: [
    {
      route: 'profile-settings',
      label: 'Profile',
    },
    {
      route: 'profile-authentication',
      label: 'Authentication',
    },
    {
      route: 'profile-billing',
      label: 'Billing',
    },
    {
      route: 'profile-invitations',
      label: 'Invitations',
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

  render: function () {
    return (
      <div className="container">
        {this.renderError()}
        {this.renderFeedback()}
        <form
          onSubmit={this.handleSubmit}
          acceptCharset="UTF-8"
          method="post">
          <TextField
            ref="firstName"
            valueLink={this.linkState('firstName')}
            defaultValue={this.state.firstName}
            errorText={this.getValidationMessages('firstName').join()}
            name="firstName"
            className="text-field"
            autoComplete="firstName"
            hintText="First name" />
          <TextField
            ref="lastName"
            valueLink={this.linkState('lastName')}
            defaultValue={this.state.lastName}
            errorText={this.getValidationMessages('lastName').join()}
            name="lastName"
            className="text-field"
            autoComplete="lastName"
            hintText="Last name" />
          <TextField
            ref="email"
            name="email"
            value={this.state.email}
            className="text-field"
            autoComplete="email"
            hintText="Your email"
            disabled={true} />
          <RaisedButton
            type="submit"
            label="Update"
            style={{height: '48px'}}
            className="raised-button"
            secondary={true} />
        </form>
      </div>
    );
  }

});