var Reflux     = require('reflux'),

    Syncano    = require('../Session/Connection'),
    Connection = require('../Session/Connection').get(),
    D          = Syncano.D;

var AdminsInvitationsActions = Reflux.createActions({
  checkItem      : {},
  uncheckAll     : {},
  fetch          : {},
  setInvitations : {},

  fetchInvitations: {
<<<<<<< HEAD
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  createInvitation: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  resendInvitation: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  removeInvitation: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
=======
    asyncResult: true,
    children: ['completed', 'failure']
  },
  createInvitation: {
    asyncResult: true,
    asyncForm: true,
    children: ['completed', 'failure']
  },
  resendInvitation: {
    asyncResult: true,
    children: ['completed', 'failure']
  },
  removeInvitation: {
    asyncResult: true,
    children: ['completed', 'failure']
>>>>>>> cd6c2f5064e840b0f714f7e0fa4ced62126213bd
  }
});

AdminsInvitationsActions.fetchInvitations.listen(function() {
  console.info('AdminsInvitationsActions::fetchInvitations');
  Connection
    .Invitations
    .list()
    .then(this.completed)
    .catch(this.failure);
});

AdminsInvitationsActions.createInvitation.listen(function(payload) {
  console.info('AdminsInvitationsActions::createAdmin');
  Connection
    .Invitations
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

AdminsInvitationsActions.removeInvitation.listen(function(items) {
<<<<<<< HEAD
  console.info('AdminsInvitationsActions::removeInvitation');
  var promises  = items.map(function(item) {
    Connection.Invitations.remove(item.id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);

});

AdminsInvitationsActions.resendInvitation.listen(function(items) {
  console.error('AdminsInvitationsActions::resendInvitation');
  var promises = items.map(function(item) {
    Connection.Invitations.resend(item.id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);

=======
  console.info('AdminsInvitationsActions::createAdmin');
  items.map(function(item) {
    Connection
      .Invitations
      .remove(item.id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

AdminsInvitationsActions.resendInvitation.listen(function(items) {
  console.info('AdminsInvitationsActions::createAdmin');
  items.map(function(item) {
    Connection
      .Invitations
      .resend(item.id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
>>>>>>> cd6c2f5064e840b0f714f7e0fa4ced62126213bd
});

module.exports = AdminsInvitationsActions;
