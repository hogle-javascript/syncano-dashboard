import React from 'react';
import Reflux from 'reflux';
import {withRouter, Link} from 'react-router';

// Utils
import {FormMixin} from '../../mixins';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Store from './AuthStore';
import Actions from './AuthActions';
import Constants from './AuthConstants';

// Components
import AccountContainer from './AccountContainer';
import {TextField, RaisedButton} from 'material-ui';
import {SocialAuthButtonsList} from '../../common/';

const AccountSignup = React.createClass({
  displayName: 'AccountSignup',

  mixins: [
    Reflux.connect(Store),
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

  componentWillUpdate() {
    const {router, location} = this.props;

    // I don't know if it's good place for this but it works
    if (SessionStore.isAuthenticated()) {
      let queryNext = location.query.next || null;
      let lastInstance = localStorage.getItem('lastInstance') || null;

      if (queryNext !== null) {
        router.replace(queryNext);
      } else if (lastInstance !== null) {
        router.replace('instance', {instanceName: lastInstance});
      } else {
        SessionStore
          .getConnection()
          .Instances
          .list()
          .then((instances) => {
            if (instances.length > 0) {
              let instance = instances._items[0];

              localStorage.setItem('lastInstance', instance.name);
              router.replace('instance', {instanceName: instance.name});
            } else {
              router.replace('sockets');
            }
          })
          .catch(() => {
            router.replace('sockets');
          });
      }
    }

    let invKey = location.query.invitation_key || null;

    if (invKey !== null && SessionActions.getInvitationFromUrl() !== invKey) {
      SessionActions.setInvitationFromUrl(invKey);
    }
  },

  getBottomContent() {
    return (
      <p className="vm-0-b text--center">
        By signing up you agree to our
        <a
          href="http://www.syncano.com/terms-of-service/"
          target="_blank">
          {' Terms of Use and Privacy Policy'}
        </a>.
      </p>
    );
  },

  handleSocialLogin(network) {
    SessionStore.showWelcomeDialog();
    SessionStore.setSignUpMode();
    Actions.socialLogin(network);
  },

  handleSuccessfullValidation(data) {
    const {email, password} = data;

    SessionStore.showWelcomeDialog();
    SessionStore.setSignUpMode();

    Actions.passwordSignUp({
      email,
      password
    });
  },

  render() {
    const {query} = this.props.location;

    return (
      <AccountContainer bottomContent={this.getBottomContent()}>
        <div className="account-container__content__header vm-3-b">
          <p className="vm-2-b">Start Building Now</p>
          <small>
            Simply enter your email, create a password and you're in!<br />
            No credit card required.
          </small>
        </div>
        {this.renderFormNotifications()}
        <form
          onSubmit={this.handleFormValidation}
          className="account-container__content__form"
          acceptCharset="UTF-8"
          method="post">
          <TextField
            ref="email"
            value={this.state.email}
            onChange={(event, value) => this.setState({email: value})}
            errorText={this.getValidationMessages('email').join(' ')}
            name="email"
            className="text-field"
            autoComplete="email"
            hintText="Email"
            fullWidth={true}/>

          <TextField
            ref="password"
            value={this.state.password}
            onChange={(event, value) => this.setState({password: value})}
            errorText={this.getValidationMessages('password').join(' ')}
            type="password"
            name="password"
            className="text-field vm-4-b"
            autoComplete="password"
            hintText="My password"
            fullWidth={true}/>

          <RaisedButton
            type="submit"
            label="Create my account"
            labelStyle={{fontSize: '16px'}}
            fullWidth={true}
            disabled={!this.state.canSubmit}
            style={{boxShadow: 'none', height: '48px'}}
            primary={true}/>
        </form>

        <SocialAuthButtonsList
          mode="signup"
          networks={Constants.SOCIAL_NETWORKS}
          onSocialLogin={this.handleSocialLogin} />

        <div className="account-container__content__footer">
          <ul className="list--flex list--horizontal">
            <li>
              <p>
                <span>Already have an account? </span>
                <Link
                  to={{
                    name: 'login',
                    query
                  }}>
                  Login
                </Link>
              </p>
            </li>
          </ul>
        </div>
      </AccountContainer>
    );
  }
});

export default withRouter(AccountSignup);
