import React from 'react';
import _ from 'lodash';
import Loading from '../common/Loading';

export default (options, props) => {
  props        = props        || {};
  options      = options      || {};
  options.attr = options.attr || 'state.isLoading';
  options.show = options.show || [true, null, undefined];

  return {
    componentDidMount() {
      if (!_.isFunction(this.renderLoaded)) {
        throw Error('invalid `renderLoaded` type');
      }
    },

    render() {
      let value = _.get(this, options.attr, false);

      if (_.indexOf(options.show, value) > -1) {
        return <Loading {...props} show = {true} />
      }

      return this.renderLoaded();
    }
  };
};
