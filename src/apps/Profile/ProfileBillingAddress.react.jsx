var React                      = require('react'),
    Reflux                     = require('reflux'),

    FormMixin                  = require('../../mixins/FormMixin'),

    ProfileActions             = require('./ProfileActions'),
    ProfileBillingAddressStore = require('./ProfileBillingAddressStore'),

    mui                        = require('material-ui'),
    TextField                  = mui.TextField,
    RaisedButton               = mui.RaisedButton;


module.exports = React.createClass({

  displayName: 'ProfileBillingAddress',

  mixins: [
    Reflux.connect(ProfileBillingAddressStore),
    React.addons.LinkedStateMixin,
    FormMixin
  ],

  validatorConstraints: {
    company_name: {
      length: {maximum: 150},
      presence: true
    },
    first_name: {
      length: {maximum: 35}
    },
    last_name: {
      length: {maximum: 35}
    },
    address_line1: {
      length: {maximum: 150},
      presence: true
    },
    address_line2: {
      length: {maximum: 150}
    },
    address_city: {
      length: {maximum: 100},
      presence: true
    },
    address_state: {
      length: {maximum: 100},
      presence: true
    },
    address_zip: {
      length: {maximum: 10},
      presence: true
    },
    address_country: {
      length: {maximum: 35},
      presence: true
    },
    tax_number: {
      length: {maximum: 50},
      presence: true
    }
  },

  componentDidMount: function() {
    ProfileActions.fetchBillingProfile();
  },

  handleSuccessfullValidation: function () {
    ProfileActions.updateBillingProfile(this.state);
  },

  render: function () {
    return (
      <div>
        {this.renderFormNotifications()}
        <form
          onSubmit      = {this.handleFormValidation}
          acceptCharset = "UTF-8"
          method        = "post">

          <TextField
            name              = "company_name"
            fullWidth         = {true}
            valueLink         = {this.linkState('company_name')}
            defaultValue      = {this.state.company_name}
            errorText         = {this.getValidationMessages('company_name').join(' ')}
            hintText          = "Company name"
            floatingLabelText = "Company name" />

          <TextField
            valueLink         = {this.linkState('first_name')}
            defaultValue      = {this.state.first_name}
            errorText         = {this.getValidationMessages('first_name').join(' ')}
            name              = "first_name"
            floatingLabelText = "First name"
            className         = "text-field"
            hintText          = "First name"
            fullWidth         = {true} />

          <TextField
            valueLink         = {this.linkState('last_name')}
            defaultValue      = {this.state.last_name}
            errorText         = {this.getValidationMessages('last_name').join(' ')}
            name              = "last_name"
            floatingLabelText = "Last name"
            className         = "text-field"
            hintText          = "Last name"
            fullWidth         = {true} />

          <TextField
            valueLink         = {this.linkState('address_line1')}
            defaultValue      = {this.state.address_line1}
            errorText         = {this.getValidationMessages('address_line1').join(' ')}
            name              = "address_line1"
            floatingLabelText = "Address"
            className         = "text-field"
            hintText          = "Address"
            fullWidth         = {true} />

          <TextField
            valueLink         = {this.linkState('address_line2')}
            defaultValue      = {this.state.address_line2}
            errorText         = {this.getValidationMessages('address_line2').join(' ')}
            name              = "address_line2"
            floatingLabelText = "Address"
            className         = "text-field"
            hintText          = "Address"
            fullWidth         = {true} />

          <TextField
            valueLink         = {this.linkState('address_city')}
            defaultValue      = {this.state.address_city}
            errorText         = {this.getValidationMessages('address_city').join(' ')}
            name              = "address_city"
            floatingLabelText = "City"
            className         = "text-field"
            hintText          = "City"
            fullWidth         = {true} />

          <TextField
            valueLink         = {this.linkState('address_state')}
            defaultValue      = {this.state.address_state}
            errorText         = {this.getValidationMessages('address_state').join(' ')}
            name              = "address_state"
            floatingLabelText = "State"
            className         = "text-field"
            autoComplete      = "State"
            hintText          = "State"
            fullWidth         = {true} />

          <TextField
            valueLink         = {this.linkState('address_zip')}
            defaultValue      = {this.state.address_zip}
            errorText         = {this.getValidationMessages('address_zip').join(' ')}
            name              = "address_zip"
            floatingLabelText = "Zip code"
            className         = "text-field"
            hintText          = "Zip code"
            fullWidth         = {true} />

          <TextField
            valueLink         = {this.linkState('address_country')}
            defaultValue      = {this.state.address_country}
            errorText         = {this.getValidationMessages('address_country').join(' ')}
            name              = "address_country"
            floatingLabelText = "Country"
            className         = "text-field"
            hintText          = "Country"
            fullWidth         = {true} />

          <TextField
            valueLink         = {this.linkState('tax_number')}
            defaultValue      = {this.state.tax_number}
            errorText         = {this.getValidationMessages('tax_number').join(' ')}
            name              = "tax_number"
            floatingLabelText = "Tax number"
            className         = "text-field"
            hintText          = "Tax number"
            fullWidth         = {true} />

          <RaisedButton
            type       = "submit"
            label      = "Update"
            className  = "raised-button"
            secondary  = {true} />

        </form>
      </div>
    );
  }

});