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

  displayName: 'AccountPasswordReset',

  mixins: [
    Reflux.connect(AuthStore),
    React.addons.LinkedStateMixin,
    ValidationMixin
  ],

  validatorConstraints: {
    email: {
      presence: true,
      email: true
    }
  },

  handleSubmit: function (event) {
    event.preventDefault();

    if (!this.state.canSubmit) {
      return
    }

    this.validate(function(isValid){
      if (isValid === true) {
        AuthActions.passwordReset(this.state.email);
      }
    }.bind(this));
  },

  renderError: function () {
    if (!this.state.errors || this.state.errors.feedback === undefined) {
      return;
    }

    return (
      <Notification>{this.state.errors.feedback}</Notification>
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
          <img src="/img/syncano-logo.svg" />
        </div>
        <Paper className="account-container__content">
          <div className="account-container__content__header">
            <p className="text--gray text--left">Reset password</p>
          </div>
          {this.renderError()}
          {this.renderFeedback()}
          <form
            onSubmit={this.handleSubmit}
            className="account-container__content__form"
            acceptCharset="UTF-8"
            method="post">
            <TextField
              ref="email"
              valueLink={this.linkState('email')}
              errorText={this.getValidationMessages('email').join()}
              name="email"
              className="text-field"
              autoComplete="email"
              hintText="Your email" />
            <RaisedButton
              type="submit"
              label="Reset password"
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
    );
  }
});
