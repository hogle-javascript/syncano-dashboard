import React from 'react';
import Reflux from 'reflux';
import {State, Navigation, Link} from 'react-router';

// Utils
import {FormMixin} from '../../mixins';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Store from './AuthStore';
import Actions from './AuthActions';
import Constants from './AuthConstants';

// Components
import {TextField, RaisedButton} from 'syncano-material-ui';
import {Container} from '../../common';
import {SocialAuthButtonsList} from 'syncano-components';

export default React.createClass({
  displayName: 'AccountLogin',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    Reflux.connect(Store),
    State,
    Navigation,
    FormMixin
  ],

  statics: {
    willTransitionTo(transition) {
      if (SessionStore.isAuthenticated()) {
        transition.redirect(Constants.LOGIN_REDIRECT_PATH, {}, {});
      }
    }
  },

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

  componentWillUpdate() {
    // I don't know if it's good place for this but it works
    if (SessionStore.isAuthenticated()) {
      let queryNext = this.getQuery().next || null;
      let lastInstance = localStorage.getItem('lastInstance') || null;

      if (queryNext !== null) {
        this.replaceWith(queryNext);
      } else if (lastInstance !== null) {
        this.replaceWith('instance', {instanceName: lastInstance});
      } else {
        SessionStore
          .getConnection()
          .Instances
          .list()
          .then((instances) => {
            if (instances.length > 0) {
              let instance = instances._items[0];

              localStorage.setItem('lastInstance', instance.name);
              this.replaceWith('instance', {instanceName: instance.name});
            } else {
              this.replaceWith('sockets');
            }
          })
          .catch(() => {
            this.replaceWith('sockets');
          });
      }
    }

    let invKey = this.getQuery().invitation_key || null;

    if (invKey !== null && SessionActions.getInvitationFromUrl() !== invKey) {
      SessionActions.setInvitationFromUrl(invKey);
    }
  },

  handleSocialLogin(network) {
    SessionStore.setSignUpMode();
    Actions.socialLogin(network);
  },

  handleSuccessfullValidation(data) {
    Actions.passwordSignIn({
      email: data.email,
      password: data.password
    });
  },

  render() {
    return (
      <Container.Account>
        <div className="account-container__content__header vm-3-b">
          <p className="vm-2-b">Access your dashboard</p>
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
            errorText={this.getValidationMessages('email').join(' ')}
            name="email"
            className="text-field"
            autoComplete="email"
            hintText="Email"
            fullWidth={true}/>

          <TextField
            ref="password"
            valueLink={this.linkState('password')}
            errorText={this.getValidationMessages('password').join(' ')}
            type="password"
            name="password"
            className="text-field vm-4-b"
            autoComplete="password"
            hintText="My password"
            fullWidth={true}/>

          <RaisedButton
            type="submit"
            label="Login"
            labelStyle={{fontSize: '16px'}}
            fullWidth={true}
            style={{boxShadow: 'none', height: '48px'}}
            primary={true}/>
        </form>

        <SocialAuthButtonsList
          networks={Constants.SOCIAL_NETWORKS}
          onSocialLogin={this.handleSocialLogin} />

        <div className="account-container__content__footer">
          <ul className="list--flex list--horizontal">
            <li>
              <p>
                <Link to="password-reset">Forgot password?</Link>
              </p>
            </li>
            <li>
              <p>
                <span>Don't have an account? </span>
                <Link
                  to="signup"
                  query={this.getQuery()}>
                  Sign up here
                </Link>
              </p>
            </li>
          </ul>
          <p className="vm-4-t vm-0-b">
            If you created your account before August 2015, please login <a href="https://login.syncano.com/">here</a>
          </p>
        </div>
      </Container.Account>
    );
  }
});
