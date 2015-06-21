var Reflux     = require('reflux'),
    Connection = require('../Session/Connection').get();


var ProfileActions = Reflux.createActions({
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

module.exports = ProfileActions;