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
    config.size = {height: 300};
    this.chart = c3.generate(config);
  },

  render() {
    return (
        <div
          ref="chart"
          style={{paddingTop: 10, background: '#EBEBEB'}}
          className="col chart"/>
    );
  }
}));
