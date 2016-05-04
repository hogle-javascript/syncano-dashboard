export default {
  list() {
    this.NewLibConnection
      .Class
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .Classes
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, payload) {
    this.Connection
      .Classes
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(classes) {
    const promises = classes.map((item) => this.NewLibConnection.Class.please().delete({name: item.name}));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
