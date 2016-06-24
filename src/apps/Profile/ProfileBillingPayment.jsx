import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';
import Helmet from 'react-helmet';

import { FormMixin } from '../../mixins';

import Actions from './ProfileActions';
import Store from './ProfileBillingPaymentStore';

import { TextField, RaisedButton, SelectField, MenuItem } from 'material-ui';
import { Container, CreditCard, Show, Loading, InnerToolbar } from '../../common/';

export default Radium(React.createClass({
  displayName: 'ProfileBillingPayment',

  mixins: [
    Reflux.connect(Store),
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
        greaterThanOrEqualTo: new Date().getFullYear() - 20,
        lessThanOrEqualTo: new Date().getFullYear() + 20
      }
    }
  },

  componentDidMount() {
    Actions.fetchBillingCard();
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

  handleDeleteButtonClick() {
    this.setState({ card: null });

    Actions.deleteBillingCard();
  },

  toggleForm(state) {
    this.setState({
      showForm: state,
      show_form: state
    });
  },

  render() {
    const { isLoading, card, showForm, show_form, canSubmit } = this.state;
    const title = 'Payment methods';
    const hasCard = !_.isEmpty(card);
    const displayForm = !hasCard || showForm === true || show_form === true;
    const formSubmitButtonLabel = hasCard ? 'Update payment' : 'Add payment';
    const currentYear = new Date().getFullYear();
    const expirationMonthRange = _.range(1, 13);
    const expirationYearRange = _.range(currentYear - 20, currentYear + 20);

    return (
      <Loading show={isLoading}>
        <Helmet title={title} />
        <InnerToolbar title={title} />
        <Container>
          <Show if={displayForm}>
            <form
              onSubmit={this.handleFormValidation}
              acceptCharset="UTF-8"
              method="post"
            >
              {this.renderFormNotifications()}

              <div className="row">
                <div className="col-sm-35 col-md-30 col-lg-12">
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
              <div className="row vm-4-b">
                <div className="col-sm-35 col-md-30 col-lg-12">
                  <div className="row">
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
                    <div className="col-flex-1">
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
                </div>
              </div>
              <div className="row">
                <div
                  className="col-sm-35 col-md-30 col-lg-12"
                  style={{ display: 'flex' }}
                >
                  <Show if={hasCard}>
                    <RaisedButton
                      onClick={this.toggleForm.bind(this, false)}
                      label="Cancel"
                      className="raised-button"
                    />
                  </Show>
                  <RaisedButton
                    type="submit"
                    label={formSubmitButtonLabel}
                    className="raised-button"
                    primary={true}
                    disabled={!canSubmit}
                    style={{ margin: '0 0 0 auto' }}
                  />
                </div>
              </div>
            </form>
          </Show>

          <Show if={!displayForm}>
            <div>
              <CreditCard card={card} />
              <RaisedButton
                onClick={this.handleDeleteButtonClick}
                label="Remove payment"
                style={{ marginRight: 8 }}
              />
              <RaisedButton
                onClick={this.toggleForm.bind(null, true)}
                type="submit"
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
