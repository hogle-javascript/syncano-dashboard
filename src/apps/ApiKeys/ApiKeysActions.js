var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();

var ApiKeysActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},
  selectAll  : {},
  fetch      : {},
  setApiKeys : {},
  showDialog    : {},
  dismissDialog : {},
  fetchApiKeys: {
    asyncResult: true,
    loading    : true,
    children    : ['completed', 'failure']
  },
  createApiKey: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  updateApiKey: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  removeApiKeys: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  resetApiKey: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  }
});

ApiKeysActions.fetchApiKeys.listen(function() {
  console.info('ApiKeysActions::fetchApiKeys');
  Connection
    .ApiKeys
    .list()
    .then(this.completed)
    .catch(this.failure);
});

ApiKeysActions.createApiKey.listen(function(payload) {
  console.info('ApiKeysActions::createApiKey');
  Connection
    .ApiKeys
    .create({
      description       : payload.description,
      // jscs:disable
      allow_user_create : payload.allow_user_create,
      ignore_acl        : payload.ignore_acl
      // jscs:enable
    })
    .then(this.completed)
    .catch(this.failure);
});

ApiKeysActions.updateApiKey.listen(function(name, payload) {
  console.info('ApiKeysActions::updateApiKey');
  Connection
    .ApiKeys
    .update(name, payload)
    .then(this.completed)
    .catch(this.failure);
});

ApiKeysActions.removeApiKeys.listen(function(names) {
  names.map(function(name) {
    console.info('ApiKeysActions::removeApiKeys');
    Connection
      .ApiKeys
      .remove(name)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

ApiKeysActions.resetApiKey.listen(function(id) {
  console.info('ApiKeysActions::resetApiKey');
  Connection
    .ApiKeys
    .reset(id)
    .then(this.completed)
    .catch(this.failure);
});

module.exports = ApiKeysActions;
