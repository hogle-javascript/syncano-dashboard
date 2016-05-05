export default {
  list() {
    this.NewLibConnection
      .Invitation
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  accept(invitations) {
    if (typeof invitations === 'string') {
      this.Connection
        .AccountInvitations
        .accept(invitations)
        .then(this.completed)
        .catch(this.failure);
    } else {
      const promises = invitations.map((invitation) => this.Connection.AccountInvitations.accept(invitation.key));

      this.Promise.all(promises)
        .then(this.completed)
        .error(this.failure);
    }
  },

  decline(invitations) {
    const promises = invitations.map((invitation) =>
      this.NewLibConnection
        .Invitation
        .please()
        .delete({id: invitation.id}));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
