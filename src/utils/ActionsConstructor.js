import Reflux from 'reflux';

export default (config, actions) => {

  if (config.withDialog) {
    actions.showDialog = {};
    actions.dismissDialog = {};
  }

  if (config.withCheck) {
    actions.checkItem = {};
    actions.selectAll = {};
    actions.uncheckAll = {};
  }

  let RefluxActions = Reflux.createActions(actions);

  Object.keys(actions).map(action => {
    if (action) {
      if (actions[action].method) {
        RefluxActions[action].listen(actions[action].method);
      }
    }
  });

  return RefluxActions;
};