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
    RaisedButton    = mui.RaisedButton;

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
    },
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
      <div className="login">
        <div className="login-logo">
          <img src="/img/syncano-logo.png" />
        </div>
        <div className="login-content">
          <div className="login-header">
            <h1>Reset password</h1>
          </div>
          {this.renderError()}
          {this.renderFeedback()}
          <form
            onSubmit={this.handleSubmit}
            className="login-input-group"
            acceptCharset="UTF-8"
            method="post">
            <TextField
              ref="email"
              valueLink={this.linkState('email')}
              errorText={this.getValidationMessages('email').join()}
              name="email"
              className="text-field"
              autoComplete="email"
              hintText="Reset password" />
            <RaisedButton
              type="submit"
              label="Reset password"
              style={{
                width: '100%',
                marginTop: '1em'
              }}
              primary={true} />
          </form>
          <div className="login-options-group">
          </div>
          <div className="login-disclaimer">
            <p><Link to="signup">Create your account</Link></p>
            <p>Already have an account? <Link to="login">Login</Link>.</p>
          </div>
        </div>
      </div>
    )
  }

});