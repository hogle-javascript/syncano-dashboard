import React from 'react';
import Reflux from 'reflux';
import Helmet from 'react-helmet';

import {FormMixin} from '../../mixins';

import Actions from './ProfileActions';
import Store from './ProfileBillingAddressStore';

import {TextField, RaisedButton} from 'syncano-material-ui';
import {Container} from 'syncano-components';
import {InnerToolbar} from '../../common';

export default React.createClass({
  displayName: 'ProfileBillingAddress',

  mixins: [
    Reflux.connect(Store),
    FormMixin
  ],

  validatorConstraints: {
    company_name: {
      length: {maximum: 150}
    },
    first_name: {
      length: {maximum: 35}
    },
    last_name: {
      length: {maximum: 35}
    },
    address_line1: {
      length: {
        maximum: 150,
        message: '^Address is too long (maximum is 150 characters)'
      }
    },
    address_line2: {
      length: {
        maximum: 150,
        message: '^Address is too long (maximum is 150 characters)'
      }
    },
    address_city: {
      length: {
        maximum: 100,
        message: '^City is too long (maximum is 100 characters)'
      }
    },
    address_state: {
      length: {
        maximum: 100,
        message: '^State  is too long (maximum is 100 characters)'
      }
    },
    address_zip: {
      length: {
        maximum: 10,
        message: '^Zip code is too long (maximum is 10 characters)'
      }
    },
    address_country: {
      length: {
        maximum: 35,
        message: '^Country is too long (maximum is 35 characters)'
      }
    },
    tax_number: {
      length: {maximum: 50}
    }
  },

  componentDidMount() {
    Actions.fetchBillingProfile();
  },

  handleSuccessfullValidation() {
    Actions.updateBillingProfile(this.state);
  },

  render() {
    const {
      company_name,
      first_name,
      last_name,
      tax_number,
      address_line1,
      address_line2,
      address_country,
      address_state,
      address_zip,
      address_city,
      canSubmit
    } = this.state;
    const title = 'Billing address';

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar title={title} />

        <Container>
          {this.renderFormNotifications()}
          <form
            onSubmit={this.handleFormValidation}
            acceptCharset="UTF-8"
            method="post">
            <div className="row vm-6-b">
              <div className="col-flex-1">
                <TextField
                  name="company_name"
                  fullWidth={true}
                  valueLink={this.linkState('company_name')}
                  defaultValue={company_name}
                  errorText={this.getValidationMessages('company_name').join(' ')}
                  hintText="Company name"
                  floatingLabelText="Company name"/>
                <TextField
                  valueLink={this.linkState('first_name')}
                  defaultValue={first_name}
                  errorText={this.getValidationMessages('first_name').join(' ')}
                  name="first_name"
                  floatingLabelText="First name"
                  hintText="First name"
                  fullWidth={true}/>
                <TextField
                  valueLink={this.linkState('last_name')}
                  defaultValue={last_name}
                  errorText={this.getValidationMessages('last_name').join(' ')}
                  name="last_name"
                  floatingLabelText="Last name"
                  hintText="Last name"
                  fullWidth={true}/>
                <TextField
                  valueLink={this.linkState('tax_number')}
                  defaultValue={tax_number}
                  errorText={this.getValidationMessages('tax_number').join(' ')}
                  name="tax_number"
                  floatingLabelText="Tax number"
                  hintText="Tax number"
                  fullWidth={true}/>
              </div>
              <div className="col-flex-1">
                <TextField
                  valueLink={this.linkState('address_line1')}
                  defaultValue={address_line1}
                  errorText={this.getValidationMessages('address_line1').join(' ')}
                  name="address_line1"
                  floatingLabelText="Address"
                  hintText="Address"
                  fullWidth={true}/>
                <TextField
                  valueLink={this.linkState('address_line2')}
                  defaultValue={address_line2}
                  errorText={this.getValidationMessages('address_line2').join(' ')}
                  name="address_line2"
                  floatingLabelText="Address"
                  hintText="Address"
                  fullWidth={true}/>
                <TextField
                  valueLink={this.linkState('address_country')}
                  defaultValue={address_country}
                  errorText={this.getValidationMessages('address_country').join(' ')}
                  name="address_country"
                  floatingLabelText="Country"
                  hintText="Country"
                  fullWidth={true}/>
                <TextField
                  valueLink={this.linkState('address_state')}
                  defaultValue={address_state}
                  errorText={this.getValidationMessages('address_state').join(' ')}
                  name="address_state"
                  floatingLabelText="State"
                  autoComplete="State"
                  hintText="State"
                  fullWidth={true}/>

                <div className="row">
                  <div className="col-md-15">
                    <TextField
                      valueLink={this.linkState('address_zip')}
                      defaultValue={address_zip}
                      errorText={this.getValidationMessages('address_zip').join(' ')}
                      name="address_zip"
                      floatingLabelText="Zip code"
                      hintText="Zip code"
                      fullWidth={true}/>
                  </div>
                  <div className="col-flex-1">
                    <TextField
                      valueLink={this.linkState('address_city')}
                      defaultValue={address_city}
                      errorText={this.getValidationMessages('address_city').join(' ')}
                      name="address_city"
                      floatingLabelText="City"
                      hintText="City"
                      fullWidth={true}/>
                  </div>
                </div>
              </div>
            </div>
            <RaisedButton
              type="submit"
              label="Update"
              className="raised-button"
              disabled={!canSubmit}
              primary={true}/>
          </form>
        </Container>
      </div>
    );
  }
});
