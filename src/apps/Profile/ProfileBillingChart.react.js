import React from 'react';
import Reflux from 'reflux';

import Common from '../../common';

import d3Chart from './ProfileBillingChart.d3';
import Actions from './ProfileBillingChartActions';
import Store from './ProfileBillingChartStore';

export default React.createClass({
  mixins: [Reflux.connect(Store)],

  componentDidMount() {
    Actions.fetchTotalDailyUsage({
      start: Store.getStartDate(),
      end: Store.getEndDate()
    });
  },

  componentDidUpdate(prevProps, prevState) {
    let element = this.getDOMNode();
    this.chart  = new d3Chart(element, this.state);
  },

  render() {

    return (
      <Common.Loading show={this.state.isLoading}>
        <div className="chart" />
      </Common.Loading>
    );
  }
});
