export default {
  list() {
    this.NewLibConnection
      .Admin
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.Connection
      .Admins
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(admins) {
    const promises = admins.map((admin) => this.Connection.Admins.remove(admin));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
