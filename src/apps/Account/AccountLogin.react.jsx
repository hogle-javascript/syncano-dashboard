var React         = require('react'),
    Router        = require('react-router'),
    Link          = Router.Link,
    mui           = require('material-ui'),
    TextField     = mui.TextField,
    RaisedButton  = mui.RaisedButton,
    AuthActions   = require('./AuthActions'),
    AuthStore     = require('./AuthStore'),
    AuthConstants = require('./AuthConstants');


require('./AccountSignup.css');


module.exports = React.createClass({

  displayName: 'AccountLogin',
  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    willTransitionTo: function (transition) {
      if (AuthStore.getState().token !== null) {
        transition.redirect(AuthConstants.LOGIN_REDIRECT_PATH, {}, {});
      }
    },
  },

  getInitialState: function() {
    return AuthStore.getState();
  },

  componentDidMount: function () {
    AuthStore.listen(this.onChange);
  },

  componentWillUnmount: function () {
    AuthStore.unlisten(this.onChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    // I don't know if it's good place for this but it works
    if (nextState.canSubmit && nextState.token !== null) {
      var router = this.context.router,
          next   = router.getCurrentQuery().next || AuthConstants.LOGIN_REDIRECT_PATH;

      router.replaceWith(next);
    }

  },

  onChange: function (state) {
    this.setState(state);
  },

  handleSubmit: function (event) {
    event.preventDefault();

    if (!this.state.canSubmit) {
      return;
    }

    AuthActions.passwordSignIn({
      email: this.state.email,
      password: this.state.password,
    });
  },

  renderError: function () {
    if (!this.state.error) {
      return;
    }

    return (
      <div>
        <p>{this.state.error}</p>
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
              errorText={this.state.emailError}
              name="email"
              className="text-field"
              autoComplete="email"
              hintText="Your email" />
            <TextField
              ref="password"
              valueLink={this.linkState('password')}
              errorText={this.state.passwordError}
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