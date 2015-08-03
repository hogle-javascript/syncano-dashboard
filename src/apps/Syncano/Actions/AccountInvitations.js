export default {
  list() {
    this.Connection
      .AccountInvitations
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  accept(items) {
    let promises = items.map(item => this.Connection.AccountInvitations.accept(item.key));

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  decline(items) {
    let promises = items.map(item => this.Connection.AccountInvitations.remove(item.id));

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
