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
          className = "stats" />
      </Common.Loading>
    );
  }
});
