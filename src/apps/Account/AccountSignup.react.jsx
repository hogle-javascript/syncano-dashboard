import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import FormMixin from '../../mixins/FormMixin';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import Store from './AuthStore';
import Actions from './AuthActions';
import Constants from './AuthConstants';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/AccountContainer.react';

export default React.createClass({

  displayName: 'AccountSignup',

  mixins: [
    Reflux.connect(Store),
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
        transition.redirect(Constants.LOGIN_REDIRECT_PATH, {}, {});
      }
    }
  },

  componentWillUpdate(nextProps, nextState) {
    // I don't know if it's good place for this but it works
    if (SessionStore.isAuthenticated()) {
      var router = this.context.router,
          next   = router.getCurrentQuery().next || Constants.LOGIN_REDIRECT_PATH;

      router.replaceWith(next);
    }
  },

  handleSuccessfullValidation() {
    Actions.passwordSignUp({
      email: this.state.email,
      password: this.state.password
    });
  },

  render: function() {
    let bottomContent = <p className="vm-0-b text--center">By signing up you agree to our <a href="http://www.syncano.com/terms-of-service/" target="_blank"> Terms of Use and Privacy Policy</a>.</p>;

    return (
      <Container bottomContent={bottomContent}>
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
          method        = "post">
          <MUI.TextField
            ref          = "email"
            valueLink    = {this.linkState('email')}
            errorText    = {this.getValidationMessages('email').join(' ')}
            name         = "email"
            className    = "text-field"
            autoComplete = "email"
            hintText     = "Email"
            fullWidth    = {true} />

          <MUI.TextField
            ref          = "password"
            valueLink    = {this.linkState('password')}
            errorText    = {this.getValidationMessages('password').join(' ')}
            type         = "password"
            name         = "password"
            className    = "text-field vm-4-b"
            autoComplete = "password"
            hintText     = "My password"
            fullWidth    = {true} />

          <MUI.RaisedButton
            type       = "submit"
            label      = "Create my account"
            labelStyle = {{fontSize: '16px'}}
            fullWidth  = {true}
            style      = {{boxShadow: 'none'}}
            primary    = {true} />
        </form>
        <Common.SocialAuthButtonsList mode="signup" />
        <div className="account-container__content__footer">
          <ul className="list--flex list--horizontal">
            <li><p>Already have an account? <Router.Link to="login"> Login</Router.Link></p></li>
          </ul>
        </div>
      </Container>
    );
  }
});
