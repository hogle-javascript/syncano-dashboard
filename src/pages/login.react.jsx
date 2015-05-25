var React = require('react');
var Hello = require('hellojs');
//var DocumentTitle = require('react-document-title');

var AuthStore = require('../apps/Auth/store');

var AuthActions = require('../apps/Auth/actions');
var ButtonSocialAuthList = require('../common/SocialButton/SocialButtonList.react');

require('./signup.css');

module.exports = React.createClass({

  displayName: 'Login',

  getDefaultProps: function () {
    return {
      notificationGroup: 'notification-group-login'
    };
  },

  componentWillMount: function () {
    // TODO
    if (Syncano.getInfo().account.account_key) {
      window.location = "#instances";
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

  handleLogIn: function (e) {

    if (e.keyCode === 13 || e.type === "click") {
      var data = this.getFormData();
      AuthActions.passwordSignIn(data);
    }
  },

  handleSocialButtonClick: function (button) {
    Hello(button).login();
  },

  render: function () {
    return (
      <div className="login-page" ref="loginPage">
        <div className="login">
          <div className="login-logo">
            <img src="/img/syncano-logo.png"/>
          </div>
          <div className="login-content">

            <div className="login-header">
              <h1>Sign in and start creating your apps right away.</h1>
            </div>

            <form className="login-input-group" acceptCharset="UTF-8" action="/action" method="post">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Your email" ref="email" name="email" autoComplete="email"
                     onKeyUp={this.handleLogIn}/>
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" ref="password" name="password" autoComplete="password"
                     onKeyUp={this.handleLogIn}/>
            </form>

            <div className="login-options-group">
              <div className="login-button" onClick={this.handleLogIn}>
                <span>Sign in</span>
              </div>
              <div className="separator">or</div>
              <ButtonSocialAuthList handleClick={this.handleSocialButtonClick}/>
            </div>

            <div className="login-disclaimer">
              <p><span>Don't have an account? </span><a href="#signup">Sign up here</a><span>.</span></p>
            </div>

          </div>
        </div>
      </div>
    );
  }

});