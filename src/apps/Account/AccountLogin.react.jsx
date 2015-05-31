var React        = require('react'),
    mui          = require('material-ui'),
    TextField    = mui.TextField,
    RaisedButton = mui.RaisedButton;


require('./AccountSignup.css');


module.exports = React.createClass({

  displayName: 'AccountLogin',
  mixins: [React.addons.LinkedStateMixin],

  componentDidMount: function() {
    this.refs.email.getDOMNode().focus();
  },

  getInitialState: function() {
    return {
      error: null,
      email: null,
      emailError: null,
      password: null,
      passwordError: null,
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var router = this.context.router;
        next   = router.getCurrentQuery().next;
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
              type="submit"
              label="Sign in"
              style={{width: '100%'}}
              primary={true} />
          </form>
          <div className="login-options-group">
          </div>
          <div className="login-disclaimer">
            <p>Don't have an account? <a href="#signup">Sign up here</a>.</p>
          </div>
        </div>
      </div>
    )
  }

});