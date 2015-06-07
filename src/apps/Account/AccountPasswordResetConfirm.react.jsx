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

  displayName: 'AccountPasswordResetConfirm',

  mixins: [
    Reflux.connect(AuthStore),
    React.addons.LinkedStateMixin,
    ValidationMixin,
    Router.State,
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
          token: params.token,
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
      <div className="login">
        <div className="login-logo">
          <img src="/img/syncano-logo.png" />
        </div>
        <div className="login-content">
          <div className="login-header">
            <h1>Confirm password reset</h1>
          </div>
          {this.renderError()}
          {this.renderFeedback()}
          <form
            onSubmit={this.handleSubmit}
            className="login-input-group"
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
              hintText="Confirm new password" />
            <RaisedButton
              type="submit"
              label="Change password"
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