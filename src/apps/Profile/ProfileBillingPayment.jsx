import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';
import Helmet from 'react-helmet';

import { FormMixin, DialogsMixin } from '../../mixins';

import Actions from './ProfileActions';
import Store from './ProfileBillingPaymentStore';

import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import { Container, CreditCard, Dialog, Show, Loading, PaymentIcon, InnerToolbar } from '../../common/';

export default Radium(React.createClass({
  displayName: 'ProfileBillingPayment',

  mixins: [
    FormMixin,
    DialogsMixin,
    Reflux.connect(Store)
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
        greaterThanOrEqualTo: new Date().getFullYear(),
        lessThanOrEqualTo: new Date().getFullYear() + 20
      }
    }
  },

  componentDidMount() {
    Actions.fetchBillingCard();
  },

  getStyles() {
    return {
      container: {
        maxWidth: 550
      },
      cardIcon: {
        width: 40,
        height: 'auto',
        display: 'block',
        marginRight: 10
      },
      formDescriptionText: {
        fontSize: 10,
        color: 'rgb(170, 170, 170)',
        textTransform: 'uppercase'
      }
    };
  },

  handleSuccessfullValidation(data) {
    const { card } = this.state;
    const params = {
      number: data.number,
      cvc: data.cvc,
      exp_month: data.exp_month,
      exp_year: data.exp_year
    };

    if (_.isEmpty(card)) {
      return Actions.addBillingCard(params);
    }

    Actions.updateBillingCard(params);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteBillingCard',
        ref: 'deleteBillingCard',
        title: 'Remove Billing Card',
        handleConfirm: Actions.deleteBillingCard,
        modal: true,
        children: ['Are you sure you want to remove your billing card?']
      }
    }];
  },

  toggleForm(state) {
    this.setState({
      showForm: state,
      show_form: state
    });
  },

  render() {
    const styles = this.getStyles();
    const { isLoading, card, showForm, show_form, canSubmit } = this.state;
    const title = 'Payment methods';
    const hasCard = !_.isEmpty(card);
    const displayForm = !hasCard || showForm === true || show_form === true;
    const formSubmitButtonLabel = hasCard ? 'Update payment' : 'Add payment';
    const currentYear = new Date().getFullYear();
    const expirationMonthRange = _.range(1, 13);
    const expirationYearRange = _.range(currentYear, currentYear + 20);

    return (
      <Loading show={isLoading}>
        <Helmet title={title} />
        {this.getDialogs()}
        <InnerToolbar title={title} />
        <Container style={styles.container}>
          <Show if={displayForm}>
            <form
              onSubmit={this.handleFormValidation}
              acceptCharset="UTF-8"
              method="post"
            >
              {this.renderFormNotifications()}

              <div className="row">
                <div
                  className="col-sm-35"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <PaymentIcon style={styles.cardIcon} />
                  <PaymentIcon type="MasterCard" style={styles.cardIcon} />
                  <PaymentIcon type="American Express" style={styles.cardIcon} />
                  <PaymentIcon type="Discover" style={styles.cardIcon} />
                  <PaymentIcon type="Diners Club" style={styles.cardIcon} />
                  <PaymentIcon type="Jcb" style={styles.cardIcon} />
                  <img
                    src={require('!file-loader!../../assets/img/stripe-badge@3x.png')}
                    alt="Powered by Stripe"
                    style={{ display: 'block', height: 78 / 3, marginLeft: 'auto' }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-35">
                  <TextField
                    ref="number"
                    name="number"
                    fullWidth={true}
                    value={this.state.number}
                    onChange={(event, value) => this.setState({ number: value })}
                    errorText={this.getValidationMessages('number').join(' ')}
                    hintText="Card Number"
                    floatingLabelText="Card Number"
                    dataStripe="number"
                  />
                </div>
              </div>
              <div className="row vm-2-b">
                <div className="col-flex-2">
                  <SelectField
                    ref="exp_month"
                    name="exp_month"
                    fullWidth={true}
                    floatingLabelText="Expiration month"
                    value={this.state.exp_month}
                    onChange={(event, index, value) => this.setState({ exp_month: value })}
                    errorText={this.getValidationMessages('exp_month').join(' ')}
                    dataStripe="exp-month"
                  >
                    {expirationMonthRange.map((value) => {
                      const primaryText = value < 10 ? `0${value}` : value;

                      return (
                        <MenuItem
                          key={value}
                          value={value}
                          primaryText={primaryText}
                        />
                      );
                    })}
                  </SelectField>
                </div>
                <div className="col-flex-2">
                  <SelectField
                    ref="exp_year"
                    name="exp_year"
                    fullWidth={true}
                    floatingLabelText="Expiration year"
                    value={this.state.exp_year}
                    onChange={(event, index, value) => this.setState({ exp_year: value })}
                    errorText={this.getValidationMessages('exp_year').join(' ')}
                    dataStripe="exp-year"
                  >
                    {expirationYearRange.map((value) => (
                      <MenuItem
                        key={value}
                        value={value}
                        primaryText={value}
                      />
                    ))}
                  </SelectField>
                </div>
                <div className="col-sm-5">
                  <TextField
                    ref="cvc"
                    maxLength={3}
                    name="cvc"
                    fullWidth={true}
                    value={this.state.cvc}
                    onChange={(event, value) => this.setState({ cvc: value })}
                    errorText={this.getValidationMessages('cvc').join(' ')}
                    hintText="CVC"
                    floatingLabelText="CVC"
                    dataStripe="cvc"
                  />
                </div>
              </div>
              <div className="row vm-4-b">
                <div className="col-sm-35">
                  <div style={styles.formDescriptionText}>
                    <p>The card security code (CVC) is located on the back of MasterCard, Visa, Discover, Diners Club,
                    and JCB credit or debit cards and is typically a separate group of 3 digits to the right of the
                    signature strip.</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-35">
                  <Show if={hasCard}>
                    <RaisedButton
                      onClick={this.toggleForm.bind(this, false)}
                      label="Cancel"
                      className="raised-button"
                      style={{ marginRight: 8 }}
                    />
                  </Show>
                  <RaisedButton
                    type="submit"
                    label={formSubmitButtonLabel}
                    primary={true}
                    className="raised-button"
                    style={{ margin: '0 0 0 auto' }}
                    disabled={!canSubmit}
                  />
                </div>
              </div>
            </form>
          </Show>

          <Show if={!displayForm}>
            <div>
              <CreditCard card={card} />
              <RaisedButton
                onClick={() => this.showDialog('deleteBillingCard', {})}
                label="Remove payment"
                style={{ marginRight: 8 }}
              />
              <RaisedButton
                type="submit"
                onClick={this.toggleForm.bind(null, true)}
                label="Update payment"
                primary={true}
              />
            </div>
          </Show>
        </Container>
      </Loading>
    );
  }
}));
