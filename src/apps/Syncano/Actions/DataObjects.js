import Constants from '../../constants/Constants';

export default {
  fetchDataObjects(className) {
    this.Connection
      .DataObjects
      .list(className, {
        page_size : Constants.DATAOBJECTS_PAGE_SIZE,
        order_by  : '-created_at'
      })
      .then(this.completed)
      .catch(this.failure);
  },

  subFetchDataObjects(payload) {

    this.Connection
      .DataObjects
      .list(payload.className, payload.params)
      .then(this.completed)
      .catch(this.failure);
  },

  createDataObject(payload) {

    this.Connection
      .DataObjects
      .create(payload.className, payload.params)
      .then(createdItem => {

        let promises = payload.fileFields.map(file => {
          return this.Connection.DataObjects.uploadFile(payload.className, createdItem, file)
        });

        this.D.all(promises)
          .success(this.completed)
          .error(this.failure);
      });
  },

  updateDataObject(payload) {

    this.Connection
      .DataObjects
      .update(payload.className, payload.params)
      .then(updatedItem => {

        let promises = payload.fileFields.map(file => {
          return this.Connection.DataObjects.uploadFile(payload.className, updatedItem, file)
        });

        this.D.all(promises)
          .success(this.completed)
          .error(this.failure);
      });
  },

  removeDataObjects(className, dataobjects) {

    let promises = dataobjects.map(dataobject => {
      return this.Connection.DataObjects.remove(className, dataobject)
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
