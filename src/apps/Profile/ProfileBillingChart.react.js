import React from 'react';

import d3Chart from './ProfileBillingChart.d3';

export default React.createClass({
  chart: null,

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
    this.chart = new d3Chart(element);
  },

  render() {
    return <div className="chart" />;
  }
});
