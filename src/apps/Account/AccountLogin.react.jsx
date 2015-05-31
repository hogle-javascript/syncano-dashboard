var React        = require('react'),
    Router       = require('react-router'),
    Link         = Router.Link,
    mui          = require('material-ui'),
    TextField    = mui.TextField,
    RaisedButton = mui.RaisedButton,
    AuthActions  = require('./AuthActions'),
    AuthStore    = require('./AuthStore');


require('./AccountSignup.css');


module.exports = React.createClass({

  displayName: 'AccountLogin',
  mixins: [React.addons.LinkedStateMixin],
  contextTypes: {
    router: React.PropTypes.func
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

  onChange: function (state) {
    this.setState(state);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var router = this.context.router;
        next   = router.getCurrentQuery().next || '/instances';

    AuthActions.passwordSignIn({
      email: this.state.email,
      password: this.state.password,
      next: router.replaceWith,
      nextPath: next
    });
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
              disabled={this.state.isLoading}
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
            <p>Don't have an account? <Link to="signup">Sign up here</Link>.</p>
          </div>
        </div>
      </div>
    )
  }

});