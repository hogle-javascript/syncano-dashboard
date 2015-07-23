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

  render() {
    return (
      <Common.Loading show={this.state.isLoading}>
        <div
          ref       = "chart"
          className = "chart" />
        <div
          ref       = "stats"
          className = "stats">

          <Common.Show if={this.state.overage.amount > 0}>
          <div>
            <div>
              <strong>Overage</strong><br />
              {this.state.overage.api.included} API calls<br />
              {this.state.overage.cbx.included} CodeBox runs
            </div>
            <div>${this.state.overage.amount}</div>
          </div>
          </Common.Show>

          <div>
            <div>
              <strong>Covered by plan</strong><br />
              {this.state.covered.api.included} API calls<br />
              {this.state.covered.cbx.included} CodeBox runs
            </div>
            <div>${this.state.covered.amount}</div>
          </div>
          <div>
            <div>
              <strong>So far this month</strong>
              Syncano cost: xxx<br/>
              Yout cost: xxx
            </div>
            <div>$12</div>
          </div>

        </div>
      </Common.Loading>
    );
  }
});
