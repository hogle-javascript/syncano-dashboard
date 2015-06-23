var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;


var ProfileActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},

  'updateSettings': {
      asyncResult: true,
      asyncForm: true,
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

ProfileActions.acceptInvitations.listen(function (items) {
  var promises = items.map(function (item) {
    return Connection.AccountInvitations.accept(item.key);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

ProfileActions.declineInvitations.listen(function (items) {
  var promises = items.map(function (item) {
    return Connection.AccountInvitations.remove(item.id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = ProfileActions;