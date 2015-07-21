var React                = require('react'),
    Reflux               = require('reflux'),
    Router               = require('react-router'),
    Link                 = Router.Link,

    // Utils
    FormMixin            = require('../../mixins/FormMixin'),

    // Stores and Actions
    SessionStore         = require('../Session/SessionStore'),
    AuthStore            = require('./AuthStore'),
    AuthActions          = require('./AuthActions'),
    AuthConstants        = require('./AuthConstants'),

    // Components
    MUI                  = require('material-ui'),
    Common               = require('../../common');

require('./Account.sass');

module.exports = React.createClass({

  displayName: 'AccountLogin',

  mixins: [
    Reflux.connect(AuthStore),
    React.addons.LinkedStateMixin,
    FormMixin
  ],

  validatorConstraints: {
    email: {
      presence: true,
      email: {
        message: '^Invalid email address'
      }
    },
    password: {
      presence: true
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo: function(transition) {
      if (SessionStore.isAuthenticated()) {
        transition.redirect(AuthConstants.LOGIN_REDIRECT_PATH, {}, {});
      }
    }
  },

  componentWillUpdate: function() {
    // I don't know if it's good place for this but it works
    if (SessionStore.isAuthenticated()) {
      var router = this.context.router,
          next   = router.getCurrentQuery().next || AuthConstants.LOGIN_REDIRECT_PATH;

      router.replaceWith(next);
    }
  },

  handleSuccessfullValidation: function() {
    AuthActions.passwordSignIn({
      email: this.state.email,
      password: this.state.password
    });
  },

  render: function() {
    return (
      <div className="account-container">
        <div className="account-logo">
          <Link to="login"><Common.Logo className="logo-blue" /></Link>
        </div>
        <MUI.Paper
          className = "account-container__content"
          ounded    = {false}
        >
          <div className="account-container__content__header vm-3-b">
            <p className="vm-2-b">Access your dashboard</p>
          </div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            className     = "account-container__content__form"
            acceptCharset = "UTF-8"
            method        = "post">

            <MUI.TextField
              ref="email"
              valueLink    = {this.linkState('email')}
              errorText    = {this.getValidationMessages('email').join(' ')}
              name         = "email"
              className    = "text-field"
              autoComplete = "email"
              hintText     = "Email"
              fullWidth    = {true}
            />

            <MUI.TextField
              ref          = "password"
              valueLink    = {this.linkState('password')}
              errorText    = {this.getValidationMessages('password').join(' ')}
              type         = "password"
              name         = "password"
              className    = "text-field vm-4-b"
              autoComplete = "password"
              hintText     = "My password"
              fullWidth    = {true}
            />

            <MUI.RaisedButton
              type       = "submit"
              label      = "Log in"
              labelStyle = {{fontSize: '16px'}}
              fullWidth  = {true}
              style      = {{boxShadow: 'none'}}
              primary    = {true}
            />
          </form>
          <Common.SocialAuthButtonsList />
          <div className="account-container__content__footer">
            <ul className="list--flex list--horizontal">
              <li><p><Link to="password-reset">Forgot password?</Link></p></li>
              <li><p>Don't have an account?<Link to="signup"> Sign up here</Link></p></li>
            </ul>
          </div>
        </MUI.Paper>
      </div>
    );
  }
});
