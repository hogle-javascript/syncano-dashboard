import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';
import Helmet from 'react-helmet';

import {FormMixin} from '../../mixins';

import Actions from './ProfileActions';
import Store from './ProfileBillingPaymentStore';

import {TextField, RaisedButton} from 'material-ui';
import {Container, CreditCard, Show, Loading, InnerToolbar} from '../../common/';

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
    Actions.updateBillingCard({
      number: data.number,
      cvc: data.cvc,
      exp_month: data.exp_month,
      exp_year: data.exp_year
    });
  },

  toggleForm(state) {
    this.setState({
      showForm: state,
      show_form: state
    });
  },

  render() {
    const {card, showForm, show_form, isLoading, canSubmit} = this.state;
    const title = 'Payment methods';
    const hasCard = !_.isEmpty(card);
    const labelPrefix = hasCard ? 'Update' : 'Add';
    const displayForm = !hasCard || showForm === true || show_form === true;

    return (
      <Loading show={isLoading}>
        <Helmet title={title} />
        <InnerToolbar title={title} />
        <Container>
          <Show if={displayForm}>
            <form
              onSubmit={this.handleFormValidation}
              acceptCharset="UTF-8"
              method="post">
              {this.renderFormNotifications()}

              <div className="row">
                <div className="col-lg-20">
                  <TextField
                    name="number"
                    ref="number"
                    fullWidth={true}
                    value={this.state.number}
                    onChange={(event, value) => this.setState({number: value})}
                    errorText={this.getValidationMessages('number').join(' ')}
                    hintText="Card Number"
                    floatingLabelText="Card Number"
                    dataStripe="number"/>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-20">
                  <TextField
                    name="cvc"
                    ref="cvc"
                    fullWidth={true}
                    value={this.state.cvc}
                    onChange={(event, value) => this.setState({cvc: value})}
                    errorText={this.getValidationMessages('cvc').join(' ')}
                    hintText="CVC"
                    floatingLabelText="CVC"
                    dataStripe="cvc"/>
                </div>
              </div>
              <div className="row vm-4-b">
                <div className="col-lg-20">
                  <div className="row">
                    <div className="col-flex-1">
                      <TextField
                        name="exp_month"
                        ref="exp_month"
                        size={2}
                        fullWidth={true}
                        value={this.state.exp_month}
                        onChange={(event, value) => this.setState({exp_month: value})}
                        errorText={this.getValidationMessages('exp_month').join(' ')}
                        hintText="Expiration month (MM)"
                        floatingLabelText="Expiration month (MM)"
                        dataStripe="exp-month"/>
                    </div>
                    <div className="col-flex-1">
                      <TextField
                        name="exp_year"
                        ref="exp_year"
                        size={4}
                        fullWidth={true}
                        value={this.state.exp_year}
                        onChange={(event, value) => this.setState({exp_year: value})}
                        errorText={this.getValidationMessages('exp_year').join(' ')}
                        hintText="Expiration year (YYYY)"
                        floatingLabelText="Expiration year (YYYY)"
                        dataStripe="exp-year"/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-20" style={{display: 'flex'}}>
                  <Show if={hasCard}>
                    <RaisedButton
                      onClick={this.toggleForm.bind(this, false)}
                      label="Cancel"
                      className="raised-button"/>
                  </Show>
                  <RaisedButton
                    type="submit"
                    label={labelPrefix + ' payment'}
                    className="raised-button"
                    primary={true}
                    disabled={!canSubmit}
                    style={{margin: '0 0 0 auto'}}/>
                </div>
              </div>
            </form>
          </Show>

          <Show if={!showForm}>
            <div>
              <CreditCard card={card}/>
              <RaisedButton
                onClick={this.toggleForm.bind(null, true)}
                type="submit"
                label={labelPrefix + ' payment'}
                className="raised-button"
                primary={true}/>
            </div>
          </Show>
        </Container>
      </Loading>
    );
  }
}));
