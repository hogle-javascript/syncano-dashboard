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
    RaisedButton    = mui.RaisedButton,
    Paper           = mui.Paper;

require('./Account.sass');


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
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo: function (transition) {
      if (SessionStore.isAuthenticated()) {
        transition.redirect(AuthConstants.LOGIN_REDIRECT_PATH, {}, {});
      }
    }
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
      <div className="account-container">
        <div className="account-logo">
          <img src="/img/syncano-logo.png" />
        </div>
        <Paper className="account-container__content">
          <div className="account-container__content__header">
            <p>Sign in and start creating your apps right away.</p>
          </div>
          {this.renderError()}
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
                height: '48px'
              }}
              className="raised-button"
              primary={true} />
          </form>
          <div className="account-container__content__footer">
            <ul className="list--flex">
              <li>
                <p>
                  <Link to="password-reset">Forgot password?</Link>
                </p>
              </li>
              <li>
                <p>
                  Don't have an account?<Link to="signup"> Sign up here</Link>.
                </p>
              </li>
            </ul>
          </div>
        </Paper>
      </div>
    )
  }
});
