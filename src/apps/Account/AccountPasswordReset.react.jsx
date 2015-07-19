var React           = require('react'),
    Reflux          = require('reflux'),
    Router          = require('react-router'),
    Link            = Router.Link,

    // Utils
    FormMixin       = require('../../mixins/FormMixin'),

    // Stores and Actions
    AuthStore       = require('./AuthStore'),
    AuthActions     = require('./AuthActions'),

    // Components
    mui             = require('material-ui'),
    TextField       = mui.TextField,
    RaisedButton    = mui.RaisedButton,
    Paper           = mui.Paper,

    Logo            = require('../../common/Logo');


require('./Account.sass');

module.exports = React.createClass({

  displayName: 'AccountPasswordReset',

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
    }
  },

  handleSuccessfullValidation: function() {
    AuthActions.passwordReset(this.state.email);
  },

  render: function() {
    return (
      <div className="account-container">
        <div className="account-logo">
          <Link to="login"><Logo className="logo-blue" /></Link>
        </div>
        <Paper
          className="account-container__content"
          rounded={false}
        >
          <div className="account-container__content__header">
            <p className="">Reset your password</p>
          </div>
          {this.renderFormNotifications()}
          <form
            onSubmit      = {this.handleFormValidation}
            className     = "account-container__content__form"
            acceptCharset = "UTF-8"
            method        = "post"
          >

            <TextField
              ref="email"
              valueLink    = {this.linkState('email')}
              errorText    = {this.getValidationMessages('email').join(' ')}
              name         = "email"
              className    = "text-field vm-4-b"
              autoComplete = "email"
              hintText     = "Your email"
              fullWidth    = {true}
            />

            <RaisedButton
              type       = "submit"
              label      = "Reset password"
              fullWidth  = {true}
              labelStyle = {{fontSize: '16px'}}
              style      = {{boxShadow: 'none'}}
              primary    = {true}
            />
          </form>
          <div className="account-container__content__footer">
            <ul className="list--flex list--horizontal">
              <li><p><Link to="signup">Create your account</Link></p></li>
              <li><p>Already have an account? <Link to="login">Login</Link></p></li>
            </ul>
          </div>
        </Paper>
      </div>
    );
  }
});
