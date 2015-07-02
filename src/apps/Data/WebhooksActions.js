var Reflux     = require('reflux'),

    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;

var WebhooksActions = Reflux.createActions({
  checkItem     : {},
  uncheckAll    : {},
  fetch         : {},
  setWebhooks   : {},
  showDialog    : {},
  dismissDialog : {},
  createWebhook: {
    asyncResult : true,
    asyncForm   : true,
    children    : ['completed', 'failure']
  },
  fetchWebhooks: {
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  updateWebhook: {
    asyncResult : true,
    asyncForm   : true,
    children    : ['completed', 'failure']
  },
  removeWebhooks: {
    asyncResult : true,
    children    : ['completed', 'failure']
  }
});

WebhooksActions.createWebhook.listen(function(payload) {
  console.info('WebhooksActions::createWebhook');
  Connection
    .Webhooks
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

WebhooksActions.fetchWebhooks.listen(function() {
  console.info('WebhooksActions::fetchWebhooks');
  Connection
    .Webhooks
    .list()
    .then(this.completed)
    .catch(this.failure);
});

WebhooksActions.updateWebhook.listen(function(id, payload) {
  console.info('WebhooksActions::updateWebhook');
  Connection
    .Webhooks
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
});

WebhooksActions.removeWebhooks.listen(function(ids) {
  console.info('WebhooksActions::removeWebhooks');
  var promises = ids.map(function(id) {
    return Connection.Webhooks.remove(id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = WebhooksActions;
