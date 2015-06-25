var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;


var ProfileActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},
  setInvitations: {},

  updateSettings: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure'],
  },
  fetchInvitations: {
      asyncResult: true,
      loading: true,
      children: ['completed', 'failure'],
  },
  declineInvitations: {
      asyncResult: true,
      children: ['completed', 'failure'],
  },
  acceptInvitations: {
      asyncResult: true,
      children: ['completed', 'failure'],
  },
  changePassword: {
      asyncResult: true,
      children: ['completed', 'failure'],
  }
});

ProfileActions.updateSettings.listen(function (payload) {
  console.info('ProfileActions::updateSettings');
  Connection
    .Accounts
    .update({
      first_name: payload.firstName,
      last_name: payload.lastName
    })
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.fetchInvitations.listen(function () {
  console.info('ProfileActions::fetchInvitations');
  Connection
    .AccountInvitations
    .list()
    .then(this.completed)
    .catch(this.failure);
});

ProfileActions.acceptInvitations.listen(function (items) {
  console.info('ProfileActions::acceptInvitations');
  var promises = items.map(function (item) {
    return Connection.AccountInvitations.accept(item.key);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

ProfileActions.declineInvitations.listen(function (items) {
  console.info('ProfileActions::declineInvitations');
  var promises = items.map(function (item) {
    return Connection.AccountInvitations.remove(item.id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

ProfileActions.changePassword.listen(function (payload) {
  console.info('ProfileActions::changePassword');
  Connection
    .Accounts
    .changePassword({
      current_password: payload.currentPassword,
      new_password: payload.newPassword
    })
    .then(this.completed)
    .catch(this.failure);
});

module.exports = ProfileActions;