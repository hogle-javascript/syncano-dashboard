var React                = require('react'),
    Reflux               = require('reflux'),
    Router               = require('react-router'),
    Link                 = Router.Link,

    // Utils
    FormMixin            = require('../../mixins/FormMixin'),
    ValidationMixin      = require('../../mixins/ValidationMixin'),

    // Stores and Actions
    SessionStore         = require('../Session/SessionStore'),
    AuthStore            = require('./AuthStore'),
    AuthActions          = require('./AuthActions'),
    AuthConstants        = require('./AuthConstants'),

    // Components
    mui                  = require('material-ui'),
    TextField            = mui.TextField,
    RaisedButton         = mui.RaisedButton,
    Paper                = mui.Paper,

    SocialAuthButton     = require('../../common/SocialAuthButton/SocialAuthButton.react'),
    SocialAuthButtonList = require('../../common/SocialAuthButton/SocialAuthButtonList.react');


require('./Account.sass');


module.exports = React.createClass({

  displayName: 'AccountSignup',

  mixins: [
    Reflux.connect(AuthStore),
    React.addons.LinkedStateMixin,

    ValidationMixin,
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
    willTransitionTo: function (transition) {
      if (SessionStore.isAuthenticated()) {
        transition.redirect(AuthConstants.LOGIN_REDIRECT_PATH, {}, {});
      }
    }
  },

  componentWillUpdate: function (nextProps, nextState) {
    // I don't know if it's good place for this but it works
    if (SessionStore.isAuthenticated()) {
      var router = this.context.router,
          next   = router.getCurrentQuery().next || AuthConstants.LOGIN_REDIRECT_PATH;

      router.replaceWith(next);
    }
  },

  handleSuccessfullValidation: function () {
    AuthActions.passwordSignUp({
      email: this.state.email,
      password: this.state.password
    });
  },

  handleSocialSignup: function (network) {
    return function () {
      AuthActions.socialLogin(network)
    };
  },

  renderSocialButton: function (network) {
    return (
      <SocialAuthButton
          icon        = {'synicon-' + network}
          label       = {'Sign up with ' + network}
          handleClick = {this.handleSocialSignup(network)}/>
    )
  },

  renderSocialButtons: function () {
    var buttons = AuthConstants.SOCIAL_NETWORKS.map(function (network){
      return (
        <li key={network}>
          {this.renderSocialButton(network)}
        </li>
      )
    }.bind(this));

    return <SocialAuthButtonList>{buttons}</SocialAuthButtonList>
  },

  render: function () {
    return (
      <div className="account-container">
        <div className="account-logo">
          <Link to="login"><img src="/img/syncano-logo.svg" /></Link>
        </div>
        <Paper
          className = "account-container__content"
          rounded   = {false}>
          <div className="account-container__content__header vm-3-b">
            <p className="vm-2-b">Try it now and start creating your apps</p>
            <small>
              Your 30 day trial includes unlimited use of the Syncano platform without
               inputting any credit card information.
            </small>
          </div>
          {this.renderFormNotifications()}
          <form
            onSubmit={this.handleFormValidation}
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
              hintText="Your email"
              fullWidth={true} />
            <TextField
              ref="password"
              valueLink={this.linkState('password')}
              errorText={this.getValidationMessages('password').join()}
              type="password"
              name="password"
              className="text-field vm-4-b"
              autoComplete="password"
              hintText="Password"
              fullWidth={true} />
            <RaisedButton
              type="submit"
              label="Sign up for free"
              labelStyle={{fontSize: '16px'}}
              style={{width: '100%', boxShadow: 'none'}}
              primary={true} />
          </form>
          {this.renderSocialButtons()}
          <div className="account-container__content__footer">
            <ul className="list--flex list--horizontal">
              <li><p>Already have an account? <Link to="login"> Login</Link></p></li>
            </ul>
          </div>
        </Paper>
        <p className="vm-0-b text--center">By signing up you agree to our <a href="http://www.syncano.com/terms-of-service/" target="_blank"> Terms of Use and Privacy Policy</a>.</p>
      </div>
    );
  }
});
