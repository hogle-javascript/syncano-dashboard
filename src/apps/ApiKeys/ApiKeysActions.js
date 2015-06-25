var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var ApiKeysActions = Reflux.createActions();

ApiKeysActions.getApiKeys = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
ApiKeysActions.getApiKeys.listen( function(payload) {
  console.info('ApiKeysActions::getApiKeys');
  Connection
    .ApiKeys
    .list()
    .then(this.completed)
    .catch(this.failure);
});

ApiKeysActions.createApiKey = Reflux.createAction({asyncResult: true, children: ['completed', 'failure'], loading: true});
ApiKeysActions.createApiKey.listen( function(payload) {
  console.info('ApiKeysActions::createApiKey');
  Connection
    .ApiKeys
    .create({
      description       : payload.description,
      allow_user_create : payload.allow_user_create,
      ignore_acl        : payload.ignore_acl
    })
    .then(this.completed)
    .catch(this.failure);
});

ApiKeysActions.removeApiKeys = Reflux.createAction({asyncResult: true, children: ['completed', 'failure'], loading: true});
ApiKeysActions.removeApiKeys.listen( function(names) {
  names.map(function(name) {
    console.info('ApiKeysActions::removeApiKeys');
    Connection
      .ApiKeys
      .remove(name)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

ApiKeysActions.resetApiKey = Reflux.createAction({asyncResult: true, children: ['completed', 'failure'], loading: true});
ApiKeysActions.resetApiKey.listen( function(id) {
  console.info('ApiKeysActions::resetApiKey');
  Connection
    .ApiKeys
    .reset(id)
    .then(this.completed)
    .catch(this.failure);
});


ApiKeysActions.checkItem = Reflux.createAction();
ApiKeysActions.uncheckAll = Reflux.createAction();

module.exports = ApiKeysActions;