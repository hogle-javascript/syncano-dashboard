var React           = require('react'),
    Reflux          = require('reflux'),
    Router          = require('react-router'),
    Link            = Router.Link,

    // Utils
    FormMixin       = require('../../mixins/FormMixin'),
    ValidationMixin = require('../../mixins/ValidationMixin'),

    // Stores and Actions
    AuthStore       = require('./AuthStore'),
    AuthActions     = require('./AuthActions'),

    // Components
    mui             = require('material-ui'),
    TextField       = mui.TextField,
    RaisedButton    = mui.RaisedButton,
    Paper           = mui.Paper,

    Logo            = require('../../common/Logo/Logo.react');


require('./Account.sass');

module.exports = React.createClass({

  displayName: 'AccountPasswordResetConfirm',

  mixins: [
    Reflux.connect(AuthStore),
    React.addons.LinkedStateMixin,
    Router.State,

    ValidationMixin,
    FormMixin
  ],

  validatorConstraints: {
    password: {
      presence: true
    },
    confirmPassword: {
      presence: true,
      equality: 'password'
    }
  },

  handleSuccessfullValidation: function () {
    var params = this.getParams();
    AuthActions.passwordResetConfirm({
      new_password: this.state.password,
      uid: params.uid,
      token: params.token
    });
  },

  render: function() {
    return (
      <div className="account-container">
        <div className="account-logo">
          <Link to="login"><Logo className="logo-blue" /></Link>
        </div>
        <Paper
          className="account-container__content"
          rounded={false}
        >
          <div className="account-container__content__header">
            <p className="">Choose a new password</p>
          </div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            className     = "account-container__content__form"
            acceptCharset = "UTF-8"
            method        = "post"
          >

            <TextField
              ref          = "password"
              valueLink    = {this.linkState('password')}
              errorText    = {this.getValidationMessages('password').join(' ')}
              type         = "password"
              name         = "password"
              className    = "text-field"
              autoComplete = "password"
              hintText     = "New password"
              fullWidth    = {true}
            />

            <TextField
              ref          = "confirmPassword"
              valueLink    = {this.linkState('confirmPassword')}
              errorText    = {this.getValidationMessages('confirmPassword').join(' ')}
              type         = "password"
              name         = "confirmPassword"
              className    = "text-field vm-4-b"
              autoComplete = "confirmPassword"
              hintText     = "Confirm password"
              fullWidth    = {true}
            />

            <RaisedButton
              type       = "submit"
              label      = "Change password"
              labelStyle = {{fontSize: '16px'}}
              style      = {{width: '100%', boxShadow: 'none'}}
              primary    = {true}
            />
          </form>
        </Paper>
      </div>
    );
  }
});
