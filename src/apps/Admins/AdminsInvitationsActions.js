var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var AdminsInvitationsActions = Reflux.createActions({
  checkItem      : {},
  uncheckAll     : {},
  setInvitations : {},

  fetchInvitations: {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'createInvitation': {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure']
  },
  'resendInvitation': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'removeInvitation': {
      asyncResult: true,
      children: ['completed', 'failure']
  }
});

AdminsInvitationsActions.fetchInvitations.listen( function() {
  console.info('AdminsInvitationsActions::fetchInvitations');
  Connection
    .Invitations
    .list()
    .then(this.completed)
    .catch(this.failure);
});

AdminsInvitationsActions.createInvitation.listen( function(payload) {
  console.info('AdminsInvitationsActions::createAdmin');
  Connection
    .Invitations
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

AdminsInvitationsActions.removeInvitation.listen( function(items) {
  console.info('AdminsInvitationsActions::createAdmin');
  items.map(function(item) {
    Connection
      .Invitations
      .remove(item.id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

AdminsInvitationsActions.resendInvitation.listen( function(items) {
  console.info('AdminsInvitationsActions::createAdmin');
  items.map(function(item) {
    Connection
      .Invitations
      .resend(item.id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = AdminsInvitationsActions;