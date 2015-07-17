import Reflux from 'reflux';
import _ from 'lodash';

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
    if (_.isFunction(action.method)) {
      RefluxActions[key].listen(action.method);
    }
  });

  return RefluxActions;
};
