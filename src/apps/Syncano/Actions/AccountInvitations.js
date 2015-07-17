export default {
  fetchAccountInvitations() {
    this.Connection
      .AccountInvitations
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  acceptInvitations(items) {
    let promises = items.map(item => {
      return this.Connection.AccountInvitations.accept(item.key);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  declineInvitations(items) {
    let promises = items.map(item => {
      return this.Connection.AccountInvitations.remove(item.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchInstance(name) {
    this.Connection
      .setInstance(name)
      .then(this.completed)
      .catch(this.failure)
  }
};
