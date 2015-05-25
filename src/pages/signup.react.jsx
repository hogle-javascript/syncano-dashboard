var React = require('react');
var Hello = require('hellojs');

var ButtonSocialAuthList = require('../common/SocialButton/SocialButtonList.react');
//var ServerActions = require('../actions/ServerActions');
//
require('./signup.css');


module.exports = React.createClass({

  displayName: 'Signup',

  getDefaultProps: function () {
    return {
      msgs: {
        windowHeader: 'Try it now and start creating your apps right away.',
        signupDescription: 'Your 30 day trial includes unlimited use of the Syncano platform without inputting any credit card information.',
        signupButton: 'Sign up for free',
        loginHere: 'Log in here',
        alreadyAccount: 'Already have an account?',
        bySigning: 'By signing up you agree to our',
        terms: 'Terms of Use and Privacy Policy',
        passwordLabel: 'Password',
        emailLabel: 'Email',
      },
      socialAuthButtons: [{
        type: 'github',
        text: 'Sign up with Github',
      }, {
        type: 'google',
        text: 'Sign up with Google',
      }, {
        type: 'facebook',
        text: 'Sign up with Facebook',
      }]
    }
  },

  componentDidMount: function () {
    this.refs.email.getDOMNode().focus();
  },

  getFormData: function () {
    return {
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value,
    };
  },

  handleSignUp: function (e) {
    if (e.keyCode === 13 || e.type === "click") {
      var data = this.getFormData();
      ServerActions.registerAccount(data);
    }
  },

  handleSocialButtonClick: function (button) {
    Hello(button).login();
  },

  facebookSignIn: function () {
    FB.login(function (res) {
      if (res.status === "connected") {
        var token = res.authResponse.accessToken;
        ServerActions.facebookSignIn(token);
      }
    }.bind(this), {
      scope: 'public_profile, email'
    });
  },

  render: function () {
    return (
      <div className="signup-page" ref="signupPage">
        <div className="signup">
          <div className="signup-logo">
            <img src="/img/syncano-logo.png" />
          </div>
          <div className="signup-content">
            <div className="signup-header">
              <h1>{this.props.msgs.windowHeader}</h1>
              <p>{this.props.msgs.signupDescription}</p>
            </div>

            <form className="signup-input-group" acceptCharset="UTF-8" action="/action" method="post">
              <label htmlFor="email">{this.props.msgs.emailLabel}</label>
              <input type="email" placeholder="Your email" ref="email" name="email" autoComplete="email" onKeyUp={this.handleSignUp} />

              <label htmlFor="password">{this.props.msgs.passwordLabel}</label>
              <input type="password" placeholder="Password" ref="password" name="password" autoComplete="password" onKeyUp={this.handleSignUp} />
            </form>
            <div className="signup-options-group">
              <div className="signup-button" onClick={this.handleSignUp}>
                <span>{this.props.msgs.signupButton}</span>
              </div>
              <div className="separator">or</div>
              <ButtonSocialAuthList handleClick={this.handleSocialButtonClick} facebookSignIn={this.facebookSignIn} />
            </div>
            <div className="signup-disclaimer">
              <p>{this.props.msgs.alreadyAccount} <a href="#login">{this.props.msgs.loginHere}</a></p>
              <p>{this.props.msgs.bySigning} <a href="#">{this.props.msgs.terms}</a>.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
