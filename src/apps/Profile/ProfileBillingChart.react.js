import React from 'react';
import Reflux from 'reflux';

import Common from '../../common';

import BillingChart from './ProfileBillingChart.d3';
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
    let element = this.refs.chart.getDOMNode();
    this.chart  = new BillingChart(element, this.state);
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
    return (
      <Common.Loading show={this.state.isLoading}>
        <div className="row">
          <div className="col" style={{width: 700}}>
            <div
              ref       = "chart"
              className = "chart" />
            <div
              ref       = "stats"
              className = "stats" />
          </div>
          <div className="col-md-6" style={{padding: 0, background: '#F6E8E8', marginBottom: 35, display: 'flex', flexDirection: 'column-reverse'}}>
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
                    Covered by Syncano
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