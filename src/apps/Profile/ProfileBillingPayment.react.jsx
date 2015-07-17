var React                      = require('react'),
    Reflux                     = require('reflux'),
    _                          = require('lodash'),

    FormMixin                  = require('../../mixins/FormMixin'),

    ProfileActions             = require('./ProfileActions'),
    ProfileBillingPaymentStore = require('./ProfileBillingPaymentStore'),

    MUI                        = require('material-ui'),
    Loading                    = require('../../common/Loading/Loading.react'),
    Show                       = require('../../common/Show/Show.react'),
    PaymentIcon                = require('./../../common/PaymentIcon');

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

  handleSuccessfullValidation: function() {
    ProfileActions.updateBillingCard(this.state);
  },

  toggleForm: function(state) {
    this.setState({
      showForm: state,
      show_form: state
    });
  },

  getStyles: function() {
    return {
      cardContainer: {
        width: 219,
        height: 152,
        background: '#fafafa',
        border: '1px solid #ddd',
        BorderRadius: 10,
        padding: 16,
        color: 'rgba(0, 0, 0, 0.87)',
        display: '-webkit-flex; display: flex',
        FlexDirection: 'column'
      },
      cardHeadline: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        lineHeight: '16px'
      },
      cardFooter: {
        display: '-webkit-flex; display: flex',
        margin: 'auto 0 0',
        JustifyContent: 'space-between',
        AlignItems: 'center'
      },
      cardIcon: {
        width: 40,
        height: 40,
        display: 'block'
      }
    }
  },

  getCardTypeIcon: function(cardType) {
    var styles = this.getStyles();

    if (cardType === 'Visa') {
      return <PaymentIcon.Visa style={styles.cardIcon} />
    } else if (cardType === 'Mastercard') {
      return <PaymentIcon.Mastercard style={styles.cardIcon} />
    } else {
      return cardType
    }
  },

  render: function() {
    var styles      = this.getStyles(),
        hasCard     = !_.isEmpty(this.state.card),
        showForm    = !hasCard || this.state.showForm === true || this.state.show_form === true,
        labelPrefix = hasCard ? 'Update' : 'Add',
        cardTypeIcon = this.getCardTypeIcon(this.state.card.brand);

    return (
      <div style={{padding: 48}}>
        <Loading show={this.state.isLoading}>
          <Show if={showForm}>
            <form
              onSubmit      = {this.handleFormValidation}
              acceptCharset = "UTF-8"
              method        = "post"
            >

              {this.renderFormNotifications()}

              <div className="row">
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
                  <Show if={hasCard}>
                    <MUI.RaisedButton
                      onClick   = {this.toggleForm.bind(this, false)}
                      label     = "Cancel"
                      className = "raised-button"
                    />
                  </Show>
                  <MUI.RaisedButton
                    type      = "submit"
                    label     = {labelPrefix + ' payment'}
                    className = "raised-button"
                    secondary = {true}
                    style     = {{margin: '0 0 0 auto'}}
                  />
                </div>
              </div>
            </form>
          </Show>

          <Show if={!showForm}>
            <div>
              <p className="vm-4-b">Your card</p>
              <div className="vm-6-b" style={styles.cardContainer}>
                <div>
                  <div style={styles.cardHeadline}>Card number</div>
                  <div>*** **** *** {this.state.card.last4}</div>
                </div>
                <div style={styles.cardFooter}>
                  <div>
                    <div style={styles.cardHeadline}>Expiry</div>
                    {this.state.card.exp_month}/{this.state.card.exp_year}
                  </div>
                  <div>
                    {cardTypeIcon}
                  </div>
                </div>
              </div>
              <MUI.RaisedButton
                onClick    = {this.toggleForm.bind(null, true)}
                type       = "submit"
                label      = {labelPrefix + ' payment'}
                className  = "raised-button"
                secondary  = {true}
              />
            </div>
          </Show>
        </Loading>
      </div>
    );
  }

});
