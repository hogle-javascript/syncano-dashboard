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

const AccountLogin = React.createClass({
  displayName: 'AccountLogin',

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
    const {location, router} = this.props;

    // I don't know if it's good place for this but it works
    if (SessionStore.isAuthenticated()) {
      let queryNext = location.query.next || null;
      let lastInstance = localStorage.getItem('lastInstance') || null;

      if (queryNext !== null) {
        router.replace(queryNext);
      } else if (lastInstance !== null) {
        router.replace({name: 'instance', params: {instanceName: lastInstance}});
      } else {
        SessionStore
          .getConnection()
          .Instances
          .list()
          .then((instances) => {
            if (instances.length > 0) {
              let instance = instances._items[0];

              localStorage.setItem('lastInstance', instance.name);
              router.replace({name: 'instance', params: {instanceName: instance.name}});
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
    const {query} = this.props.location;

    return (
      <AccountContainer>
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
            label="Login"
            labelStyle={{fontSize: '16px'}}
            fullWidth={true}
            disabled={!this.state.canSubmit}
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
                  to={{
                    name: 'signup',
                    query
                  }}>
                  Sign up here
                </Link>
              </p>
            </li>
          </ul>
          <p className="vm-4-t vm-0-b">
            If you created your account before August 2015, please login <a href="https://login.syncano.com/">here</a>
          </p>
        </div>
      </AccountContainer>
    );
  }
});

export default withRouter(AccountLogin);
