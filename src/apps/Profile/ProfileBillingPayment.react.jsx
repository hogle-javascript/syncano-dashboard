var React                      = require('react'),
    Reflux                     = require('reflux'),
    _                          = require('lodash'),

    FormMixin                  = require('../../mixins/FormMixin'),

    ProfileActions             = require('./ProfileActions'),
    ProfileBillingPaymentStore = require('./ProfileBillingPaymentStore'),

    mui                        = require('material-ui'),
    TextField                  = mui.TextField,
    RaisedButton               = mui.RaisedButton,
    Loading                    = require('../../common/Loading/Loading.react'),
    Show                       = require('../../common/Show/Show.react');


module.exports = React.createClass({

  displayName: 'ProfileBillingPayment',

  mixins: [
    Reflux.connect(ProfileBillingPaymentStore),
    React.addons.LinkedStateMixin,
    FormMixin
  ],

  validatorConstraints: {
    number: {
      presence: true
    },
    cvc: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThan: 0
      }
    },
    exp_month: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        lessThanOrEqualTo: 12
      }
    },
    exp_year: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThan: 0
      }
    }
  },

  componentDidMount: function() {
    ProfileActions.fetchBillingCard();
  },

  handleSuccessfullValidation: function () {
    ProfileActions.updateBillingCard(this.state);
  },

  toggleForm: function(state) {
    this.setState({
      showForm: state,
      show_form: state
    });
  },

  render: function () {
    var hasCard     = !_.isEmpty(this.state.card),
        showForm    = !hasCard || this.state.showForm === true || this.state.show_form === true,
        labelPrefix = hasCard ? 'Update': 'Add';

    return (
      <Loading show={this.state.isLoading}>

        <Show if={showForm}>
          <form
            onSubmit      = {this.handleFormValidation}
            acceptCharset = "UTF-8"
            method        = "post">

            {this.renderFormNotifications()}

            <TextField
              name              = "number"
              fullWidth         = {true}
              valueLink         = {this.linkState('number')}
              errorText         = {this.getValidationMessages('number').join(' ')}
              hintText          = "Card Number"
              floatingLabelText = "Card Number"
              dataStripe        = "number" />

            <TextField
              name              = "cvc"
              fullWidth         = {true}
              valueLink         = {this.linkState('cvc')}
              errorText         = {this.getValidationMessages('cvc').join(' ')}
              hintText          = "CVC"
              floatingLabelText = "CVC"
              dataStripe        = "cvc" />

            <TextField
              name              = "exp_month"
              size              = {2}
              valueLink         = {this.linkState('exp_month')}
              errorText         = {this.getValidationMessages('exp_month').join(' ')}
              hintText          = "Expiration month (MM)"
              floatingLabelText = "Expiration month (MM)"
              dataStripe        = "exp-month" />

            <TextField
              name              = "exp_year"
              size              = {4}
              valueLink         = {this.linkState('exp_year')}
              errorText         = {this.getValidationMessages('exp_year').join(' ')}
              hintText          = "Expiration year (YYYY)"
              floatingLabelText = "Expiration year (YYYY)"
              dataStripe        = "exp-year" />

            <Show if={hasCard}>
              <RaisedButton
                onClick    = {this.toggleForm.bind(this, false)}
                label      = "Cancel"
                className  = "raised-button"/>
            </Show>

            <RaisedButton
              type       = "submit"
              label      = {labelPrefix + ' payment'}
              className  = "raised-button"
              secondary  = {true} />

          </form>
        </Show>

        <Show if={!showForm}>
          <div>
            <h6>Your card</h6>
            <p>
              Card number <br />
              *** **** *** {this.state.card.last4} <br />
              Expiry <br />
              {this.state.card.exp_month}/{this.state.card.exp_year} {this.state.card.brand}

            </p>
            <RaisedButton
              onClick    = {this.toggleForm.bind(this, true)}
              type       = "submit"
              label      = {labelPrefix + ' payment'}
              className  = "raised-button"
              secondary  = {true} />
          </div>
        </Show>
      </Loading>
    );
  }

});