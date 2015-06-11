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
    Paper           = mui.Paper,
    FlatButton      = mui.FlatButton,
    FontIcon        = mui.FontIcon,

    Notification    = require('../../common/Notification/Notification.react');


require('./Account.sass');


module.exports = React.createClass({

  displayName: 'AccountSignup',

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

  componentWillUpdate: function (nextProps, nextState) {
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
      return
    }

    this.validate(function(isValid){
      if (isValid === true) {
        AuthActions.passwordSignUp({
          email: this.state.email,
          password: this.state.password
        });
      }
    }.bind(this));
  },

  handleSocialSignup: function (network) {
    return function () {
      AuthActions.socialLogin(network)
    };
  },

  renderSocialButton: function (network) {

    var buttonStyles = {
      width: '100%'
    };

    var iconStyles = {
      display: 'flex'
    };

    return (
      <FlatButton style={buttonStyles} linkButton={true} onClick={this.handleSocialSignup(network)} label={"Sign up with " + network}>
        <FontIcon style={iconStyles} className={"synicon-" + network} />
      </FlatButton>
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

    return <ul className="social-actions-list">{buttons}</ul>
  },

  renderError: function () {
    if (!this.state.errors || this.state.errors.feedback === undefined) {
      return
    }

    return (
      <Notification type="error">{this.state.errors.feedback}</Notification>
    );
  },

  render: function () {
    return (
      <div className="account-container">
        <div className="account-logo">
          <img src="/img/syncano-logo.svg" />
        </div>
        <Paper className="account-container__content">
          <div className="account-container__content__header vm-3-b">
            <p className="vm-2-b">Try it now and start creating your apps</p>
            <small>
              Your 30 day trial includes unlimited use of the Syncano platform without
               inputting any credit card information.
            </small>
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
              label="Sign up for free"
              style={{
                width: '100%',
                height: '48px'
              }}
              className="raised-button"
              primary={true} />
          </form>
          {this.renderSocialButtons()}
          <div className="account-container__content__footer">
            <ul className="list--flex list--horizontal">
              <li>
                <p>Already have an account? <Link to="login"> Login</Link></p>
              </li>
            </ul>
          </div>
        </Paper>
        <p className="vm-0-b text--center">By signing up you agree to our <Link to="login"> Terms of Use and Privacy Policy</Link>.</p>
      </div>
    );
  }
});
