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
    let statsStyles   = {};
    let overageStyles = {};

    return (
      <Common.Loading show={this.state.isLoading}>
        <div
          ref       = "chart"
          className = "chart" />
        <div
          ref       = "stats"
          className = "stats">

          <div>
            <div>
              <strong>Overage</strong><br />
              xx API calls<br />
              xx CodeBox runs
            </div>
            <div>$2</div>
          </div>
          <div>
            <div>
              <strong>Covered by plan</strong><br />
              xx API calls<br />
              xx CodeBox runs
            </div>
            <div>$10</div>
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
