export default {
  fetchClasses() {
    this.Connection
      .Classes
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createClass(payload) {
    this.Connection
      .Classes
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  updateClass(classname, payload) {
    this.Connection
      .Classes
      .update(classname, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeClasses(classnames) {
    let promises = classnames.map(classname => {
      return this.Connection.Classes.remove(classname);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
