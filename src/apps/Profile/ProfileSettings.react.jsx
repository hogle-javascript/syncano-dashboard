var React           = require('react'),

    HeaderMixin     = require('../Header/HeaderMixin'),
    ValidationMixin = require('../../mixins/ValidationMixin'),

    mui             = require('material-ui'),
    TextField       = mui.TextField,
    RaisedButton    = mui.RaisedButton;


module.exports = React.createClass({

  displayName: 'ProfileSettings',

  mixins: [
    HeaderMixin,
    React.addons.LinkedStateMixin,
    ValidationMixin
  ],

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

  getInitialState: function () {
    return {
      firstName: null,
      lastName: null,
      email: null,
    }
  },

  render: function () {
    return (
      <div className="container">
        <form
          onSubmit={this.handleSubmit}
          acceptCharset="UTF-8"
          method="post">
          <TextField
            ref="firstName"
            valueLink={this.linkState('firstName')}
            errorText={this.getValidationMessages('firstName').join()}
            name="firstName"
            className="text-field"
            autoComplete="firstName"
            hintText="First name" />
          <TextField
            ref="lastName"
            valueLink={this.linkState('lastName')}
            errorText={this.getValidationMessages('lastName').join()}
            name="lastName"
            className="text-field"
            autoComplete="lastName"
            hintText="Last name" />
          <TextField
            ref="email"
            name="email"
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