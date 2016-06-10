import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import {FormMixin} from '../../mixins';

import Actions from './ProfileActions';
import Store from './ProfileSettingsStore';

import {TextField, RaisedButton} from 'material-ui';
import {Container, InnerToolbar} from '../../common/';

export default React.createClass({
  displayName: 'ProfileSettings',

  mixins: [
    Reflux.connect(Store),
    FormMixin
  ],

  validatorConstraints: {
    firstName: {
      presence: true
    },
    lastName: {
      presence: true
    }
  },

  getStyles() {
    return {
      form: {
        maxWidth: 416
      },
      updateButton: {
        height: 36,
        lineHeight: '36px',
        boxShadow: 0
      },
      updateButtonLabel: {
        lineHeight: '36px',
        fontWeight: 400,
        paddingLeft: 30,
        paddingRight: 30
      }
    };
  },

  handleSuccessfullValidation() {
    Actions.updateSettings(this.state);
  },

  render() {
    const styles = this.getStyles();
    const title = 'Profile';

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar title={title}/>
        <Container>
          {this.renderFormNotifications()}
          <form
            style={styles.form}
            onSubmit={this.handleFormValidation}
            acceptCharset="UTF-8"
            method="post">
            <TextField
              ref="firstName"
              value={this.state.firstName}
              onChange={(event, value) => this.setState({firstName: value})}
              defaultValue={this.state.firstName}
              errorText={this.getValidationMessages('firstName').join(' ')}
              name="firstName"
              floatingLabelText="First name"
              autoComplete="firstName"
              hintText="First name"
              fullWidth={true}/>
            <TextField
              ref="lastName"
              value={this.state.lastName}
              onChange={(event, value) => this.setState({lastName: value})}
              defaultValue={this.state.lastName}
              errorText={this.getValidationMessages('lastName').join(' ')}
              name="lastName"
              floatingLabelText="Last name"
              autoComplete="lastName"
              hintText="Last name"
              fullWidth={true}/>
            <TextField
              ref="email"
              name="email"
              value={this.state.email}
              floatingLabelText="Email"
              className="vm-6-b"
              autoComplete="email"
              hintText="Your email"
              disabled={true}
              fullWidth={true}/>
            <RaisedButton
              type="submit"
              label="Update"
              style={styles.updateButton}
              labelStyle={styles.updateButtonLabel}
              className="raised-button"
              disabled={!this.state.canSubmit}
              primary={true}/>
          </form>
        </Container>
      </div>
    );
  }
});
