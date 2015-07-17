export default {
  createDataView(payload) {
    this.Connection
      .DataViews
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchDataViews() {
    this.Connection
      .DataViews
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateDataView(id, payload) {
    this.Connection
      .DataViews
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeDataViews(dataviews) {
    let promises = dataviews.map(dataview => {
      return this.Connection.DataViews.remove(dataview.name);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
