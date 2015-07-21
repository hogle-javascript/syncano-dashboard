import {EventEmitter} from 'events';
import d3 from 'd3';
import _ from 'lodash';

import './x.css';


class BillingChart {

  constructor(element, data) {
    let margin    = {top: 30, right: 20, bottom: 35, left: 0};
    let width     = 700 - margin.left - margin.right;
    let height    = 270 - margin.top - margin.bottom;
    let parseDate = d3.time.format("%Y-%m-%d").parse;

    let x = d3.time.scale().range([0, width]);
    let y = d3.scale.linear().range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(5);

    let svg = d3.select(element)
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain([parseDate(data.x.min), parseDate(data.x.max)]);
    y.domain([data.y.min, data.y.max]);

    _.forEach(data.y.values, (value) => {
      let area = d3.svg.area()
        .x( d => x(parseDate(d.date)))
        .y0(height)
        .y1( d => y(+d.value) );

      // Add the filled area
      svg.append("path")
          .datum(value.values)
          .attr("class", `area area-${value.source}`)
          .attr("d", area);

    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // Add the text label for the X axis
    svg.append("text")
        .attr("transform",
              "translate(" + (width/2) + " ," +
                             (height+margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Date");

  }

  update() {

  }

  draw() {

  }

};

export default BillingChart;
