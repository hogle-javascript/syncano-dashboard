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
      SessionActions.setUser,
      Actions.fetchBillingProfile.completed,
      Actions.fetchTotalDailyUsage.completed,
      this.prepareChartData
    );
  },

  getInitialState() {
    return {
      isLoading: true,
      x: {
        values: [],
        min: null,
        max: null
      },
      'y': {
        values: [],
        min: 0,
        max: null
      }
    }
  },

  prepareChartData(user, profile, usage) {
    user    = _.first(user);
    profile = _.first(profile);
    usage   = _.first(usage);

    let state       = this.getInitialState();
    state.isLoading = false;
    state.x.values  = this.getAllDates();
    state.x.min     = state.x.values[0];
    state.x.max     = _.last(state.x.values);

    if (_.isEmpty(usage.objects)) {
      this.trigger(state);
      return;
    }

    let subscription = profile.subscription || {};
    let pricing      = subscription.pricing;
    let max          = '1970-01-01';
    let objects      = {
      api: {},
      cbx: {}
    };

    if (_.isEmpty(pricing)) {
      // $5.25
      pricing = {
        api: {overage: 0.0000200, included: 200000},
        cbx: {overage: 0.0002500, included: 5000}
      };
    }

    let pricingMax = _.sum(pricing, v => v.included * v.overage);

    // Genrrate placeholder for predictions based on objects
    let predictions = _.reduce(objects, (result, v, k) => {
      result[k] = {};
      return result;
    }, {});

    // Map array to nested object e.g {source: {date: value}} -> {'api': {'2015-01-01': 0.0000200}}
    _.forEach(usage.objects, usage => {
      if (objects[usage.source] === undefined) {
        return;
      }

      objects[usage.source][usage.date] = pricing[usage.source].overage * usage.value;
      if (max < usage.date) {
        max = usage.date;
      }
    });

    // Fill blanks in objects and predictions
    this.fillBlanks(objects, predictions, max);

    // Map nested objects back to arrays in proper order
    this.nestedObjectToArray(objects);
    this.nestedObjectToArray(predictions);

    // Sum objects
    this.sumAncestors(objects);

    _.forEach(objects, (v, source) => {
      predictions[source].unshift(_.last(v));
    });

    this.sumAncestors(predictions);

    // Sum all results
    this.sumArrays(objects);
    this.sumArrays(predictions);

    let findYMaxIn  = (!_.isEmpty(predictions)) ? predictions : objects;
    let yMax        = _.max(_.map(findYMaxIn, value => _.max(value, 'value').value));
    state.y.min     = 0;
    state.y.max     = _.ceil((yMax < pricingMax) ? pricingMax : yMax);

    _.forEach([objects, predictions], (elements, index) => {
      let keys   = _.keys(elements).reverse();
      let suffix = (index > 0) ? '-predictions' : '';

      _.forEach(keys, key => {
        state.y.values.push({
          source: key + suffix,
          values: elements[key]
        });
      });
    });

    if (!_.isEmpty(predictions)) {
      state.y.values.unshift({
        source: 'predictions-bg',
        values: _.map(predictions.api, prediction => {
          return {
            date: prediction.date,
            value: yMax
          };
        })
      });
    }

    state.y.values.push({
      source: 'pricing-max',
      values: _.map(state.x.values, date => {
        return {
          date: date,
          value: pricingMax
        };
      })
    });

    this.trigger(state);
  },

  sumArrays(elements) {
    let keys = _.keys(elements).sort();
    _.forEach(keys, (key, index) => {
      if (index === 0) {
        return;
      }

      elements[key] = _.zipWith(elements[keys[index - 1]], elements[key], (v1, v2) => {
        v2.value += v1.value;
        return v2;
      });
    });

  },

  fillBlanks(objects, predictions, max) {
    // We need to calculate median for predictions
    let medians = _.reduce(objects, (result, v, k) => {
      result[k] = _.round(d3.median(_.values(v)) || 0);
      return result;
    }, {});

    _.forEach(this.getAllDates(), date => {
      _.forEach(objects, (v, source) => {
        if (date <= max) {
          if (objects[source][date] === undefined) {
            objects[source][date] = 0;
          }

        } else {
          predictions[source][date] = medians[source];
        }
      });
    });

  },

  nestedObjectToArray(elements) {
    _.forEach(elements, (v, k) => {
      let keys = _.keys(v).sort();
      elements[k] = _.map(keys, key => {
        return {date: key, value: v[key]};
      })
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
    let today   = new Date();
    today.year  = today.getFullYear();
    today.month = today.getMonth();
    return today;
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
