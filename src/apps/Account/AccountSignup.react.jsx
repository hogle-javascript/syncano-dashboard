var React           = require('react'),
    Reflux          = require('reflux'),
    Router          = require('react-router'),
    Link            = Router.Link,
    mui             = require('material-ui'),
    TextField       = mui.TextField,
    RaisedButton    = mui.RaisedButton,
    //AuthActions     = require('./AuthActions'),
    AuthActions       = require('./AuthStore').AuthActions,
    AuthStore       = require('./AuthStore').AuthStore,
    AuthConstants   = require('./AuthConstants'),
    ValidationMixin = require('../../mixins/ValidationMixin');


require('./AccountSignup.css');

module.exports = React.createClass({

  displayName: 'AccountSignup',

  mixins: [
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
    },
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  //statics: {
  //  willTransitionTo: function (transition) {
  //    if (AuthStore.getState().token !== null) {
  //      transition.redirect(AuthConstants.LOGIN_REDIRECT_PATH, {}, {});
  //    }
  //  },
  //},

  //getInitialState: function() {
  //  return AuthStore.getState();
  //},

  componentWillUpdate: function (nextProps, nextState) {
    // I don't know if it's good place for this but it works
    if (nextState.canSubmit && nextState.token !== null) {
      var router = this.context.router,
          next   = router.getCurrentQuery().next || AuthConstants.LOGIN_REDIRECT_PATH;

      router.replaceWith(next);
    }

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

    if (!this.state.canSubmit) {
      return
    }

    this.validate(function(isValid){
      if (isValid === true) {
        AuthActions.passwordSignUp({
          email: this.state.email,
          password: this.state.password,
        });
      }
    }.bind(this));
  },

  renderError: function () {
    if (!this.state.errors || this.state.errors.feedback === undefined) {
      return
    }

    return (
      <div>
        <p>{this.state.errors.feedback}</p>
      </div>
    )
  },

  render: function () {
    return (
      <div>
        {this.renderError()}
        <form
          onSubmit={this.handleSubmit}
          className="login-input-group"
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
              marginTop: '1em'
            }}
            primary={true} />
        </form>
      </div>
    );
  }
});
