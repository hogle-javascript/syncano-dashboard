export default {
  fetchAdmins() {
    this.Connection
      .Admins
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateAdmin(name, payload) {
    this.Connection
      .Admins
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeAdmins(admins) {
    let promises = admins.map(admin => {
      this.Connection.Admins.remove(admin)
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
