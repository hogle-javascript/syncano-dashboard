import {EventEmitter} from 'events';
import d3 from 'd3';

let data = [
  {date: '1-May-12', close: 1},
  {date: '2-May-12', close: 2},
  {date: '3-May-12', close: 3},
  {date: '4-May-12', close: 4},
];

class BillingChart {

  constructor(element) {
    this.element    = element;
    this.dispatcher = new EventEmitter();
    this.svg        = d3.select(element)
                        .append('svg')
                        .attr('class', 'd3');

    var margin    = {top: 30, right: 20, bottom: 35, left: 50},
        width     = 600 - margin.left - margin.right,
        height    = 270 - margin.top - margin.bottom,
        parseDate = d3.time.format("%d-%b-%y").parse;

    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(5);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);

    var area = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.close); });

    var area2 = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.close+1); });

    this.svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    // Add the filled area
    this.svg.append("path")
        .datum(data)
        .attr("class", "area2")
        .attr("d", area2);

    // Add the filled area
    this.svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    // Add the X Axis
    this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the text label for the X axis
    this.svg.append("text")
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