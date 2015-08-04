import 'd3';
import 'c3/c3.css';
import c3 from 'c3';
import _ from 'lodash';

import React from 'react';
import Reflux from 'reflux';
import Radium from 'radium';

import Common from '../../common';

import Actions from './ProfileBillingChartActions';
import Store from './ProfileBillingChartStore';

require('./ProfileBillingChart.css');

export default Radium(React.createClass({
  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    console.log('ProfileBillingChart::componentDidMount');

    Actions.fetchBillingProfile();
    Actions.fetchTotalDailyUsage({
      start: Store.getStartDate(),
      end: Store.getEndDate()
    });
  },

  componentDidUpdate(prevProps, prevState) {
    console.log('ProfileBillingChart::componentDidUpdate');

    if (this.state.isLoading === true || this.chart !== undefined) {
      return;
    }

    let config = this.state.chart;
    config.bindto = this.refs.chart.getDOMNode();
    config.size = {width: 700, height: 300};
    this.chart = c3.generate(config);
  },

  renderSummary() {
    let plan = this.state.profile.subscription.plan;

    let coveredText = '';
    if (plan === 'builder' || plan === 'free')
      coveredText = 'Covered by Syncano';
    else if (this.state.profile.subscription.plan === 'paid-commitment') {
      let amount = this.state.covered ? this.state.covered.amount : '';
      coveredText = `So far this month`;
    }

    if (plan === 'builder' || plan === 'free') {
      let totalIndex = _.findIndex(this.state.profile.balance, {source: 'Plan Fee'});
      let amountTotal = this.state.profile.balance[totalIndex].quantity;

      return (
        <div style={{paddingTop: 25}}>

          <div style={{textAlign: 'center', fontSize: '1.2rem'}}>
            {coveredText}
          </div>

          <div className="row align-middle" style={{marginTop: 25}}>
            <div className="col-flex-1" style={{textAlign: 'center'}}>
              <div style={{textDecoration: 'line-through', fontSize: '2rem'}}>${amountTotal}</div>
              <div style={{marginTop: 15, fontSize: '1rem'}}>Your Cost: $0</div>
            </div>
          </div>

        </div>
      );
    }

    let amountTotal = this.state.overage.amount + this.state.covered.amount;
    return (
      <div style={{paddingTop: 25}}>

        <div style={{textAlign: 'center', fontSize: '1.2rem'}}>
          {coveredText}
        </div>

        <div className="row align-middle" style={{marginTop: 20}}>
          <div className="col-flex-1" style={{textAlign: 'center'}}>
            <div style={{fontSize: '2rem'}}>${amountTotal}</div>
            <div style={{marginTop: 15, fontSize: '1rem'}}>
              ${this.state.covered.amount} plan + ${this.state.overage.amount} overage
            </div>
          </div>
        </div>

      </div>
    );
  },

  render() {
    let plan = this.state.profile.subscription.plan;

    let coveredText = '';
    if (plan === 'builder' || plan === 'free')
      coveredText = 'Covered by Syncano';
    else if (this.state.profile.subscription.plan === 'paid-commitment') {
      let amount = this.state.covered ? this.state.covered.amount : '';
      coveredText = `Covered by $${amount} plan`;
    }

    return (
      <Common.Loading show={this.state.isLoading}>
        <div className="row">
          <div
            ref="chart"
            className="col chart"
            style={{width: 700}}/>
          <div
            className="col-md-6"
            style={{
              padding       : 0,
              marginBottom  : 35,
              display       : 'flex',
              flexDirection : 'column-reverse'}}>
            <div>
              <div style={{height: 'calc(100% - 125px)'}}>
                <Common.Show if={this.state.overage.amount > 0}>
                  <div>
                    <div style={{paddingTop: 25, fontSize: '0.9rem'}}>
                      <div style={{textAlign: 'center', fontSize: '1.2rem'}}>
                        Overage
                      </div>
                      <div className="row" style={{paddingLeft: 15, marginTop: 15}}>
                        <div className="col-md-14" style={{textAlign: 'right'}}>
                          <div><strong>{this.state.overage.api.included}</strong></div>
                          <div><strong>{this.state.overage.cbx.included}</strong></div>
                        </div>
                        <div className="col-flex-1">
                          <div>API calls</div>
                          <div>CodeBox runs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Common.Show>
              </div>

              <div style={{height: 125, background: '#E1E1E1'}}>
                {this.renderSummary()}
              </div>

            </div>
          </div>
        </div>
      </Common.Loading>
    );
  }
}));

//${this.state.overage.amount}
//${this.state.covered.amount}

//{this.renderSummary()}
