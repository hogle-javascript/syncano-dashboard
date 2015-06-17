var React           = require('react'),
    Reflux          = require('reflux'),
    Router          = require('react-router'),
    Link            = Router.Link,

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),

    // Stores and Actions
    AuthStore       = require('./AuthStore'),
    AuthActions     = require('./AuthActions'),

    // Components
    mui             = require('material-ui'),
    TextField       = mui.TextField,
    RaisedButton    = mui.RaisedButton,
    Paper           = mui.Paper,

    Notification    = require('../../common/Notification/Notification.react');


require('./Account.sass');

module.exports = React.createClass({

  displayName: 'AccountPasswordResetConfirm',

  mixins: [
    Reflux.connect(AuthStore),
    React.addons.LinkedStateMixin,
    ValidationMixin,
    Router.State
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

  handleSubmit: function (event) {
    event.preventDefault();

    if (!this.state.canSubmit) {
      return
    }

    this.validate(function(isValid){
      if (isValid === true) {
        var params = this.getParams();
        AuthActions.passwordResetConfirm({
          new_password: this.state.password,
          uid: params.uid,
          token: params.token
        });
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

  render: function() {
    return (
      <div className="account-container">
        <div className="account-logo">
          <Link to="login"><img src="/img/syncano-logo.svg" /></Link>
        </div>
        <Paper className="account-container__content" rounded={false}>
          <div className="account-container__content__header">
            <p className="">Choose a new password</p>
          </div>
          {this.renderError()}
          {this.renderFeedback()}
          <form
            onSubmit={this.handleSubmit}
            className="account-container__content__form"
            acceptCharset="UTF-8"
            method="post">
            <TextField
              ref="password"
              valueLink={this.linkState('password')}
              errorText={this.getValidationMessages('password').join()}
              type="password"
              name="password"
              className="text-field"
              autoComplete="password"
              hintText="New password"
              fullWidth={true} />
            <TextField
              ref="confirmPassword"
              valueLink={this.linkState('confirmPassword')}
              errorText={this.getValidationMessages('confirmPassword').join()}
              type="password"
              name="confirmPassword"
              className="text-field vm-4-b"
              autoComplete="confirmPassword"
              hintText="Confirm password"
              fullWidth={true} />
            <RaisedButton
              type="submit"
              label="Change password"
              labelStyle={{fontSize: '16px'}}
              style={{width: '100%', boxShadow: 'none'}}
              primary={true} />
          </form>
        </Paper>
      </div>
    );
  }
});
