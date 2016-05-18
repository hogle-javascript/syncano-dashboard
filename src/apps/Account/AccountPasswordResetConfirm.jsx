import React from 'react';
import Reflux from 'reflux';

// Utils
import {FormMixin} from '../../mixins';

// Stores and Actions
import Store from './AuthStore';
import Actions from './AuthActions';

// Components
import {TextField, RaisedButton} from 'syncano-material-ui';
import AccountContainer from './AccountContainer';

export default React.createClass({
  displayName: 'AccountPasswordResetConfirm',

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [
    Reflux.connect(Store),
    FormMixin
  ],

  validatorConstraints: {
    password: {
      presence: true
    },
    confirmPassword: {
      presence: true,
      equality: 'password'
    }
  },

  handleSuccessfullValidation() {
    const {uid, token} = this.context.params;
    const {password} = this.state;

    Actions.passwordResetConfirm({
      new_password: password,
      uid,
      token
    });
  },

  render() {
    return (
      <AccountContainer>
        <div className="account-container__content__header">
          <p className="">Choose a new password</p>
        </div>
        {this.renderFormNotifications()}
        <form
          onSubmit={this.handleFormValidation}
          className="account-container__content__form"
          acceptCharset="UTF-8"
          method="post">

          <TextField
            ref="password"
            valueLink={this.linkState('password')}
            errorText={this.getValidationMessages('password').join(' ')}
            type="password"
            name="password"
            className="text-field"
            autoComplete="password"
            hintText="New password"
            fullWidth={true}/>

          <TextField
            ref="confirmPassword"
            valueLink={this.linkState('confirmPassword')}
            errorText={this.getValidationMessages('confirmPassword').join(' ')}
            type="password"
            name="confirmPassword"
            className="text-field vm-4-b"
            autoComplete="confirmPassword"
            hintText="Confirm password"
            fullWidth={true}/>

          <RaisedButton
            type="submit"
            label="Change password"
            fullWidth={true}
            labelStyle={{fontSize: '16px'}}
            style={{boxShadow: 'none', height: '48px'}}
            disabled={!this.state.canSubmit}
            primary={true}/>
        </form>
      </AccountContainer>
    );
  }
});
