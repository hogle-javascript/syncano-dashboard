var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;


var ProfileActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},

  'updateSettings': {
      asyncResult: true,
      children: ['completed', 'failure'],
  },
  'getInvitations': {
      asyncResult: true,
      children: ['completed', 'failure'],
  },
  'declineInvitations': {
      asyncResult: true,
      children: ['completed', 'failure'],
  },
  'acceptInvitations': {
      asyncResult: true,
      children: ['completed', 'failure'],
  }
});


ProfileActions.updateSettings.listen(function (payload) {
  Connection
    .Accounts
    .update({
      first_name: payload.firstName,
      last_name: payload.lastName
    })
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.getInvitations.listen(function () {
  Connection
    .AccountInvitations
    .list()
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.acceptInvitations.listen(function (keys) {
  var promises = keys.map(function (key) {
    return Connection.AccountInvitations.accept(key);
  });

  D.all(promises)
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.declineInvitations.listen(function (ids) {
  var promises = ids.map(function (id) {
    return Connection.AccountInvitations.remove(id);
  });

  D.all(promises)
    .then(this.completed)
    .catch(this.failure);
});

module.exports = ProfileActions;