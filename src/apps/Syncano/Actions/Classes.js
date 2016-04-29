export default {
  list() {
    this.NewLibConnection
      .Class
      .please()
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  get(className) {
    this.Connection
      .Classes
      .get(className)
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

  update(classname, payload) {
    this.Connection
      .Classes
      .update(classname, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(classnames) {
    const promises = classnames.map((classname) => this.Connection.Classes.remove(classname));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
