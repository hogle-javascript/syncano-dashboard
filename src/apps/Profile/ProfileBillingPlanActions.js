var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;

var ProfileBillingPlanActions = Reflux.createActions({
//  checkItem: {},
//  uncheckAll: {},
//  fetch: {},
//  setInvitations: {},
//  fetchInvitations: {
//    asyncResult: true,
//    loading: true,
//    children: ['completed', 'failure']
//  },
//  declineInvitations: {
//    asyncResult: true,
//    children: ['completed', 'failure']
//  },
//  acceptInvitations: {
//    asyncResult: true,
//    children: ['completed', 'failure']
//  }
//});
//
//ProfileInvitationsActions.fetchInvitations.listen(function() {
//  console.info('ProfileInvitationsActions::fetchInvitations');
//  Connection
//    .AccountInvitations
//    .list()
//    .then(this.completed)
//    .catch(this.failure);
//});
//
//ProfileInvitationsActions.acceptInvitations.listen(function(items) {
//  console.info('ProfileInvitationsActions::acceptInvitations');
//  var promises = items.map(function(item) {
//    return Connection.AccountInvitations.accept(item.key);
//  });
//
//  D.all(promises)
//    .success(this.completed)
//    .error(this.failure);
//});
//
//ProfileInvitationsActions.declineInvitations.listen(function(items) {
//  console.info('ProfileInvitationsActions::declineInvitations');
//  var promises = items.map(function(item) {
//    return Connection.AccountInvitations.remove(item.id);
//  });
//
//  D.all(promises)
//    .success(this.completed)
//    .error(this.failure);
});

module.exports = ProfileBillingPlanActions;
