import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import d3Chart from './ProfileBillingChart.d3';

export default React.createClass({
  chart: null,

  getDates() {
    let today        = new Date();
    let numberOfdays = new Date(today.getFullYear(), today.getMonth() + 2, 0).getDate();
    let days         = _.range(1, numberOfdays + 1);

    return _.map(days, day => {
      let date = new Date(today.getFullYear(), today.getMonth() + 1, day);
      return moment(date).format('YYYY-MM-DD');
    });

  },

  getChartState() {
    let dates  = this.getDates();
    let cb = d => {
      return {
        date: d,
        value: parseInt(Math.random() * (100 - 1) + 1)
      }
    };

    let reduceCb = (result, value, index) => {
      if (index > 1) {
        value.value += result[index - 2].value;
      }
      result.push(value);
      return result;
    };

    return {
      series: {
        api: _.reduce(_.map(dates, cb), reduceCb, []),
        cbx: _.reduce(_.map(dates, cb), reduceCb, []),
        apiPredictions: [],
        cbxPredictions: []
      },
      domain: dates
    };
  },

  getDefaultProps() {
    return {
      width: '100%',
      height: '300px'
    };
  },

  getInitialState() {
    return {

    };
  },

  componentDidMount() {
    let element = this.getDOMNode();
    let data    = this.getChartState();
    this.chart  = new d3Chart(element, data);
  },

  render() {
    return <div className="chart" />;
  }
});
