import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';
import MUI from 'material-ui';

import Mixins from '../../mixins';
import Common from '../../common';

import ProfileActions from './ProfileActions';
import ProfileBillingPaymentStore from './ProfileBillingPaymentStore';

module.exports = React.createClass({

  displayName: 'ProfileBillingPayment',

  mixins: [
    Reflux.connect(ProfileBillingPaymentStore),
    React.addons.LinkedStateMixin,
    Mixins.Form
  ],

  validatorConstraints: {
    number : {
      presence : true
    },
    cvc: {
      presence : true,
      numericality : {
        onlyInteger : true,
        greaterThan : 0
      }
    },
    exp_month : {
      presence: true,
      numericality : {
        onlyInteger       : true,
        greaterThan       : 0,
        lessThanOrEqualTo : 12
      }
    },
    exp_year : {
      presence: true,
      numericality : {
        onlyInteger : true,
        greaterThan : 0
      }
    }
  },

  componentDidMount() {
    ProfileActions.fetchBillingCard();
  },

  handleSuccessfullValidation() {
    ProfileActions.updateBillingCard(this.state);
  },

  toggleForm: function(state) {
    this.setState({
      showForm: state,
      show_form: state
    });
  },

  render() {
    let hasCard      = !_.isEmpty(this.state.card);
    let showForm     = !hasCard || this.state.showForm === true || this.state.show_form === true;
    let labelPrefix  = hasCard ? 'Update' : 'Add';

    return (
      <div style={{padding: 48}}>
        <Common.Loading show={this.state.isLoading}>
          <Common.Show if={showForm}>
              <div className="row">

                {this.renderFormNotifications()}

                <div className="col-lg-20">
                  <MUI.TextField
                    name              = "number"
                    fullWidth         = {true}
                    valueLink         = {this.linkState('number')}
                    errorText         = {this.getValidationMessages('number').join(' ')}
                    hintText          = "Card Number"
                    floatingLabelText = "Card Number"
                    dataStripe        = "number"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-20">
                  <MUI.TextField
                    name              = "cvc"
                    fullWidth         = {true}
                    valueLink         = {this.linkState('cvc')}
                    errorText         = {this.getValidationMessages('cvc').join(' ')}
                    hintText          = "CVC"
                    floatingLabelText = "CVC"
                    dataStripe        = "cvc"
                  />
                </div>
              </div>
              <div className="row vm-4-b">
                <div className="col-lg-20">
                  <div className="row">
                    <div className="col-flex-1">
                      <MUI.TextField
                        name              = "exp_month"
                        size              = {2}
                        fullWidth         = {true}
                        valueLink         = {this.linkState('exp_month')}
                        errorText         = {this.getValidationMessages('exp_month').join(' ')}
                        hintText          = "Expiration month (MM)"
                        floatingLabelText = "Expiration month (MM)"
                        dataStripe        = "exp-month"
                      />
                    </div>
                    <div className="col-flex-1">
                      <MUI.TextField
                        name              = "exp_year"
                        size              = {4}
                        fullWidth         = {true}
                        valueLink         = {this.linkState('exp_year')}
                        errorText         = {this.getValidationMessages('exp_year').join(' ')}
                        hintText          = "Expiration year (YYYY)"
                        floatingLabelText = "Expiration year (YYYY)"
                        dataStripe        = "exp-year"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-20" style={{display: '-webkit-flex; display: flex'}}>
                  <Common.Show if={hasCard}>
                    <MUI.RaisedButton
                      onClick   = {this.toggleForm.bind(this, false)}
                      label     = "Cancel"
                      className = "raised-button"
                    />
                  </Common.Show>
                  <MUI.RaisedButton
                    type      = "submit"
                    label     = {labelPrefix + ' payment'}
                    className = "raised-button"
                    secondary = {true}
                    style     = {{margin: '0 0 0 auto'}}
                  />
                </div>
              </div>
          </Common.Show>
        </Common.Loading>
      </div>
    );
  }

});
