import {EventEmitter} from 'events';
import d3 from 'd3';
import _ from 'lodash';

import './ProfileBillingChart.css';

class BillingChart {

  constructor(element, data) {
    let margin    = {top: 0, right: 0, bottom: 35, left: 0};
    let width     = data.width - margin.left - margin.right;
    let height    = data.height - margin.top - margin.bottom;
    let parseDate = d3.time.format('%Y-%m-%d').parse;

    let x = d3.time.scale().range([0, width]);
    let y = d3.scale.linear().range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .ticks(5);

    let svg = d3.select(element)
        .append('svg')
          .attr('width', data.width)
          .attr('height', data.height)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain([parseDate(data.x.min), parseDate(data.x.max)]);
    y.domain([data.y.min, data.y.max]);

    // Define the div for the tooltip
    let tooltip = d3.select(element)
                    .append('div')
                    .attr('class', 'tooltip')
                    .style('opacity', 0);

    _.forEach(data.y.values, (value) => {
      let area = d3.svg.area()
        .x(d => x(parseDate(d.date)))
        .y0(height)
        .y1(d => y(+d.value));

      // Add the filled area
      svg.append('path')
          .datum(value.values)
          .attr('class', `area area-${value.source}`)
          .attr('d', area);

      if (!value.tooltip) {
        return;
      }

      // Add the scatterplot
      svg.selectAll('dot')
          .data(value.values)
        .enter()
          .append('circle')
          .attr('r', 5)
          .attr('cx', d => x(parseDate(d.date)))
          .attr('cy', d => y(+d.value))
          .style('fill-opacity', 0)
          .on('mouseover', function(d) {
            tooltip
              .transition()
              .duration(200)
              .style('opacity', .9);

            tooltip
              .style('left', (d3.event.pageX - 31) + 'px')
              .style('top', (d3.event.pageY - 35) + 'px')
              .html('$' + _.round(d.value, 2));
          })
          .on('mouseout', function(d) {
            tooltip.transition()
              .duration(500)
              .style('opacity', 0);
          });

    });

    // Add the X Axis
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

    // Add the text label for the X axis
    svg.append('text')
        .attr('transform',
              'translate(' + (width / 2) + ' ,' +
                             (height + margin.bottom) + ')')
        .style('text-anchor', 'middle')
        .text('Date');
  }

};

export default BillingChart;
