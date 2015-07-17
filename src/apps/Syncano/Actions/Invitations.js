export default {
  fetchInvitations() {
    this.Connection
      .Invitations
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createInvitation(payload) {
    this.Connection
      .Invitations
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeInvitation(items) {
    let promises = items.map(item => {
      this.Connection.Invitations.remove(item.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  resendInvitation(items) {
    let promises = items.map(item => {
      this.Connection.Invitations.resend(item.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
