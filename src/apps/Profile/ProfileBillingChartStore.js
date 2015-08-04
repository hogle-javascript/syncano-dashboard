import Reflux from 'reflux';
import moment from 'moment';
import d3 from 'd3';
import _ from 'lodash';

import SessionActions from '../Session/SessionActions';
import Actions from './ProfileBillingChartActions';

export default Reflux.createStore({
  listenables: Actions,
  format: 'YYYY-MM-DD',

  init() {
    this.joinTrailing(
      Actions.fetchBillingProfile.completed,
      Actions.fetchTotalDailyUsage.completed,
      this.prepareChartData
    );
  },

  getInitialState() {
    let today = this.getToday();
    let allDates = this.getAllDates();
    let xColumn  = ['x'].concat(allDates);

    return {
      isLoading: true,
      chart: {
        data: {
          x: 'x',
          columns: [xColumn],
          types: {},
          groups: [[]],
          colors: {
            api: '#77D8F6',
            cbx: '#FFD78E'
          }
        },
        point: {
          show: false
        },
        axis: {
          x: {
            label: 'Day of the month',
            type: 'timeseries',
            tick: {
              fit: true,
              format: '%b %d'
            }
          },
          y: {
            label: 'Cost ($)',
            type: 'indexed',
            tick: {
              format: (x) => {
                return x / 2 ? x : null
              },
              fit: true
            },
            show: true
          }
        },
        grid: {
          x: {
            lines: [
              {value: today, text: 'Today', position: 'start'}
            ]
          },
          y: {lines: []}
        },
        tooltip: {
          format: {
            title: d => {
              let title = moment(d).format('MMM DD');
              let date = moment(d).format(this.format);
              if (date > today) {
                title = `Prediction for ${title}`;
              }
              return title;
            },
            name: name => {
              return {api: 'API calls', cbx: 'CodeBox runs'}[name];
            },
            value: value => d3.format('$')(_.round(value, 5))
          }
        },
        regions: [{
          start: today,
          end: _.last(allDates),
          class: 'predictions'
        }],
        legend: {show: false}
      },
      profile: {
        subscription: {}
      },
      overage: {
        api: 0,
        cbx: 0,
        amount: 0
      },
      covered: {
        api: 0,
        cbx: 0,
        amount: 0
      }
    };
  },

  prepareChartData(profile, usage) {
    profile = _.first(profile);
    usage = _.first(usage);

    let state = this.getInitialState();

    state.isLoading = false;
    state.profile = profile;

    let subscription = profile.subscription || {};
    let plan = subscription.plan || {};
    let pricing = subscription.pricing;
    let usageAmount = {'api': 0, 'cbx': 0};
    let columns = {'api': {}, 'cbx': {}};

    if (_.isEmpty(pricing)) {
      // $5.25
      pricing = {
        api: {overage: 0.0000200, included: 200000},
        cbx: {overage: 0.0002500, included: 5000}
      };
    }

    // Map array to nested object e.g {source: {date: value}} -> {'api': {'2015-01-01': 0.0000200}}
    _.forEach(usage.objects, _usage => {
      if (columns[_usage.source] === undefined) {
        return;
      }

      let amount = pricing[usage.source].overage * usage.value;
      columns[usage.source][usage.date] = amount;
      usage[usage.source] += amount;
    });

    this.fillBlanks(columns);
    this.objectToArray(columns);

    _.forEach(columns, (values, name) => {
      state.chart.data.columns.push([name].concat(values));
      state.chart.data.groups[0].push(name);
      state.chart.data.types[name] = 'area';
    });

    state.covered = _.reduce(pricing, (r, v, k) => {
      let amount = v.included * v.overage;
      r.amount += amount;
      r[k] = _.extend({}, v, {amount: amount});
      return r;
    }, {amount: 0});

    state.covered.amount = _.round(state.covered.amount, 0);
    state.chart.grid.y.lines.push({
      value: state.covered.amount,
      text: 'Covered by plan',
      position: 'middle'
    });

    // state.chart.regions.push({
    //   axis: 'y',
    //   start: 0,
    //   end: state.covered.amount,
    //   class: 'covered'
    // });

    state.overage = _.reduce(pricing, (r, v, k) => {
      let covered = state.covered[k];
      let amount = (usageAmount[k] > covered.amount) ? usageAmount[k] - covered.amount : 0;
      let included = _.round(amount / v.overage);

      r.amount += amount;
      r[k] = r[k] = _.extend({}, v, {amount: amount, included: included});
      return r;
    }, {amount: 0});

    if (plan !== 'builder' && _.last(state.chart.data.columns[1]) < 6 && _.last(state.chart.data.columns[2]) < 6) {
      state.chart.axis.y.max = state.covered.amount + (0.1 * state.covered.amount);
    }

    if (plan === 'builder' && _.last(state.chart.data.columns[1]) < 0.5 && _.last(state.chart.data.columns[2]) < 0.5) {
      state.chart.axis.y.max = 0.5;
    }

    this.trigger(state);
  },

  fillBlanks(columns) {
    // We need to calculate median for predictions
    let today = this.getToday();
    let medians = _.reduce(columns, (result, v, k) => {
      result[k] = _.round(d3.median(_.values(v)) || 0);
      return result;
    }, {});

    _.forEach(this.getAllDates(), date => {
      _.forEach(columns, (v, source) => {
        if (columns[source][date] === undefined) {
          columns[source][date] = 0;
        }

        if (date > today) {
          columns[source][date] += medians[source];
        }

      });
    });

  },

  objectToArray(elements) {
    _.forEach(elements, (v, k) => {
      let keys = _.keys(v).sort();
      elements[k] = _.reduce(keys, (r, key, index) => {
        let prev = (index > 0) ? r[index - 1] : 0;
        r.push(v[key] + prev);
        return r;
      }, []);
    });
  },

  sumAncestors(elements) {
    _.forEach(elements, (v, k) => {
      elements[k] = _.reduce(v, (result, value, index) => {
        value.value += (index > 0) ? result[index - 1].value : 0;
        result.push(value);
        return result;
      }, []);
    });
  },

  getDate() {
    let today = new Date();
    today.year = today.getFullYear();
    today.month = today.getMonth();
    return today;
  },

  getToday() {
    return moment(this.getDate()).format(this.format);
  },

  getAllDates() {
    let {year, month} = this.getDate();
    let days = _.range(1, this.getNumberOfDays() + 1);

    return _.map(days, day => {
      return moment(new Date(year, month, day)).format(this.format);
    });
  },

  getNumberOfDays() {
    let {year, month} = this.getDate();
    return new Date(year, month + 1, 0).getDate();
  },

  getStartDate() {
    let {year, month} = this.getDate();
    return moment(new Date(year, month, 1)).format(this.format);
  },

  getEndDate() {
    let {year, month} = this.getDate();
    return moment(new Date(year, month, this.getNumberOfDays())).format(this.format);
  }

});
