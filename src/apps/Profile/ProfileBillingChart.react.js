import 'd3';
import 'c3/c3.css';
import c3 from 'c3';

import React from 'react';
import Reflux from 'reflux';

import Common from '../../common';

import Actions from './ProfileBillingChartActions';
import Store from './ProfileBillingChartStore';

export default React.createClass({
  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    Actions.fetchBillingProfile();
    Actions.fetchTotalDailyUsage({
      start: Store.getStartDate(),
      end: Store.getEndDate()
    });
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading === true || this.chart !== undefined) {
      return;
    }

    let config    = this.state.chart;
    config.bindto = this.refs.chart.getDOMNode();
    config.size   = {width: 700, height: 300};
    this.chart    = c3.generate(config);
  },

  renderSummary() {
    let plan = this.state.profile.subscription.plan;

    if (plan === 'free') {
      return <div>It's free account.</div>;
    }

    if (plan === 'builder') {
      return (
        <div>
          <div>
            <strong>So far this month</strong>
            Syncano cost: xxx<br/>
            Yout cost: xxx
          </div>
          <div>$12</div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <strong>So far this month</strong>
        </div>
        <div>${this.state.overage.amount + this.state.covered.amount}</div>
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
            ref       = "chart"
            className = "col chart"
            style={{width: 700}} />
          <div
            className="col-md-6"
            style={{
              padding       : 0,
              background    : '#F6E8E8',
              marginBottom  : 35,
              display       : 'flex',
              flexDirection : 'column-reverse'}}>
            <div>
              <div style={{height: '100%', background: '#F6E8E8'}}>
                <Common.Show if={this.state.overage.amount > 0}>
                  <div style={{height: 125, background: '#F6E8E8'}}>
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
                <div style={{paddingTop: 25, fontSize: '0.9rem'}}>
                  <div style={{textAlign: 'center', fontSize: '1.2rem'}}>
                    {coveredText}
                  </div>
                  <div className="row" style={{paddingLeft: 15, marginTop: 15}}>
                    <div className="col-md-14" style={{textAlign: 'right'}}>
                      <div><strong>{this.state.covered.api.included}</strong></div>
                      <div><strong>{this.state.covered.cbx.included}</strong></div>
                    </div>
                    <div className="col-flex-1">
                      <div>API calls</div>
                      <div>CodeBox runs</div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </Common.Loading>
    );
  }
});

//${this.state.overage.amount}
//${this.state.covered.amount}

//{this.renderSummary()}
