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
    Paper           = mui.Paper;

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
      <div>
        <p>{this.state.errors.feedback}</p>
      </div>
    );
  },

  renderFeedback: function () {
    if (!this.state.feedback || this.state.feedback === undefined) {
      return
    }

    return (
      <div>
        <p>{this.state.feedback}</p>
      </div>
    );
  },

  render: function() {
    return (
      <div className="account-container">
        <div className="account-logo">
          <img src="/img/syncano-logo.svg" />
        </div>
        <Paper className="account-container__content">
          <div className="account-container__content__header">
            <p className="text--gray text--left">Change password</p>
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
              hintText="New password" />
            <TextField
              ref="confirmPassword"
              valueLink={this.linkState('confirmPassword')}
              errorText={this.getValidationMessages('confirmPassword').join()}
              type="password"
              name="confirmPassword"
              className="text-field"
              autoComplete="confirmPassword"
              hintText="Confirm password" />
            <RaisedButton
              type="submit"
              label="Change password"
              style={{
                width: '100%',
                height: '48px'
              }}
              className="raised-button"
              primary={true} />
          </form>
          <div className="account-container__content__footer">
            <ul className="list--flex">
              <li>
                <p><Link to="signup">Create your account</Link></p>
              </li>
              <li>
                <p>Already have an account? <Link to="login">Login</Link>.</p>
              </li>
            </ul>
          </div>
        </Paper>
      </div>
    )
  }
});
