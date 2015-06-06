var React           = require('react'),
    Reflux          = require('reflux'),
    Router          = require('react-router'),
    Link            = Router.Link,

    // Utils
    ValidationMixin = require('../../mixins/ValidationMixin'),

    // Stores and Actions
    SessionStore    = require('../Session/SessionStore'),
    AuthStore       = require('./AuthStore'),
    AuthActions     = require('./AuthActions'),
    AuthConstants   = require('./AuthConstants'),

    // Components
    mui             = require('material-ui'),
    TextField       = mui.TextField,
    RaisedButton    = mui.RaisedButton;

require('./AccountSignup.css');


module.exports = React.createClass({

  displayName: 'AccountLogin',

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
    password: {
      presence: true
    },
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo: function (transition) {
      if (SessionStore.isAuthenticated()) {
        transition.redirect(AuthConstants.LOGIN_REDIRECT_PATH, {}, {});
      }
    },
  },

  componentWillUpdate: function () {
    // I don't know if it's good place for this but it works
    if (SessionStore.isAuthenticated()) {
      var router = this.context.router,
          next   = router.getCurrentQuery().next || AuthConstants.LOGIN_REDIRECT_PATH;

      router.replaceWith(next);
    }
  },

  handleSubmit: function (event) {
    event.preventDefault();

    if (!this.state.canSubmit) {
      return;
    }

    this.validate(function(isValid){
      if (isValid === true) {
        AuthActions.passwordSignIn({
          email: this.state.email,
          password: this.state.password,
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

  render: function() {
    return (
      <div className="login">
        <div className="login-logo">
          <img src="/img/syncano-logo.png" />
        </div>
        <div className="login-content">
          <div className="login-header">
            <h1>Sign in and start creating your apps right away.</h1>
          </div>
          {this.renderError()}
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
              hintText="Your email" />
            <TextField
              ref="password"
              valueLink={this.linkState('password')}
              errorText={this.getValidationMessages('password').join()}
              type="password"
              name="password"
              className="text-field"
              autoComplete="password"
              hintText="Password" />
            <RaisedButton
              type="submit"
              label="Sign in"
              style={{
                width: '100%',
                marginTop: '1em'
              }}
              primary={true} />
          </form>
          <div className="login-options-group">
          </div>
          <div className="login-disclaimer">
            <p><Link to="password-reset">Forgot password?</Link></p>
            <p>Don't have an account? <Link to="signup">Sign up here</Link>.</p>
          </div>
        </div>
      </div>
    )
  }

});