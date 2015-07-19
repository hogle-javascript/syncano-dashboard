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

  displayName: 'AccountSignup',

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
    willTransitionTo(transition) {
      if (SessionStore.isAuthenticated()) {
        transition.redirect(AuthConstants.LOGIN_REDIRECT_PATH, {}, {});
      }
    }
  },

  componentWillUpdate(nextProps, nextState) {
    // I don't know if it's good place for this but it works
    if (SessionStore.isAuthenticated()) {
      var router = this.context.router,
          next   = router.getCurrentQuery().next || AuthConstants.LOGIN_REDIRECT_PATH;

      router.replaceWith(next);
    }
  },

  handleSuccessfullValidation() {
    AuthActions.passwordSignUp({
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
          rounded   = {false}
        >
          <div className="account-container__content__header vm-3-b">
            <p className="vm-2-b">Start Building Now</p>
            <small>
              Simply enter your email, create a password and you're in!<br />
              No credit card required.
            </small>
          </div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            className     = "account-container__content__form"
            acceptCharset = "UTF-8"
            method        = "post"
          >
            <MUI.TextField
              ref          = "email"
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
              label      = "Create my account"
              labelStyle = {{fontSize: '16px'}}
              fullWidth  = {true}
              style      = {{boxShadow: 'none'}}
              primary    = {true}
            />
          </form>
          <Common.SocialAuthButtonsList mode="signup" />
          <div className="account-container__content__footer">
            <ul className="list--flex list--horizontal">
              <li><p>Already have an account? <Link to="login"> Login</Link></p></li>
            </ul>
          </div>
        </MUI.Paper>
        <p className="vm-0-b text--center">By signing up you agree to our <a href="http://www.syncano.com/terms-of-service/" target="_blank"> Terms of Use and Privacy Policy</a>.</p>
      </div>
    );
  }
});
