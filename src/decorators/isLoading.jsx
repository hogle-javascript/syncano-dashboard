import React from 'react';
import _ from 'lodash';
import Loading from '../common/Loading';
import {decorate} from './utils';

function applyIsLoading(context, fn, args, config, options) {
  let attr  = config.attr || 'state.isLoading';
  let show  = config.show || [true, null];
  let value = _.get(context, config.attr, false);

  console.log('applyIsLoading');

  if (_.indexOf(show, value) > -1) {
    return <Loading {...options} show = {true} />
  }

  return fn.apply(context, args);
}

/*eslint-disable no-dupe-args*/
function handleDescriptor(target, key, descriptor, [config = {}, options = {}]) {
  return {
    ...descriptor,
    value: function isLoadingWrapper() {
      return applyIsLoading(this, descriptor.value, arguments, config, options);
    }
  };
}

/*eslint-enable*/

export default function isLoading(...args) {
  return decorate(handleDescriptor, args);
}
