import Reflux from 'reflux';
import _ from 'lodash';

import Syncano from '../apps/Syncano';

let Actions = {Syncano};

export default (options, actions) => {
  options = options || {};

  if (options.withDialog) {
    actions.showDialog    = {};
    actions.dismissDialog = {};
  }

  if (options.withCheck) {
    actions.checkItem  = {};
    actions.selectAll  = {};
    actions.uncheckAll = {};
  }

  let RefluxActions = Reflux.createActions(actions);
  _.forEach(actions, (action, key) => {
    if (_.isString(action.method)) {
      if (!_.has(Actions, action.method)) {
        throw new Error('Invalid action method: "' + action.method + '"');
      }

      action.method = _.get(Actions, action.method);
    }

    if (_.isFunction(action.method)) {
      RefluxActions[key].listen(action.method);
    }
  });

  return RefluxActions;
};
