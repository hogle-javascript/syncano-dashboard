var Reflux         = require('reflux'),
    Syncano        = require('../Session/Connection'),
    Connection     = require('../Session/Connection').get(),
    D              = Syncano.D,

    Constants      = require('../../constants/Constants'),
    ClassesActions = require('../Classes/ClassesActions');

var DataObjectsActions = Reflux.createActions({
  checkItem             : {},
  uncheckAll            : {},
  checkToggleColumn     : {},
  showDialog            : {},
  dismissDialog         : {},
  fetch                 : {},
  setDataObjects        : {},
  setCurrentClassObj    : {},
  setSelectedRows       : {},
  getIDsFromTable       : {},

  fetchCurrentClassObj  : {
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  fetchDataObjects: {
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  subFetchDataObjects: {
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  createDataObject: {
    asyncForm   : true,
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  updateDataObject: {
    asyncForm   : true,
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  removeDataObjects: {
    asyncResult : true,
    children    : ['completed', 'failure']
  }
});

DataObjectsActions.fetchCurrentClassObj.listen(function(className) {
  console.info('DataObjectsActions::fetchCurrentClassObj');
  Connection
    .Classes
    .get(className)
    .then(this.completed)
    .catch(this.failure);
});

DataObjectsActions.fetchDataObjects.listen(function(className) {
  console.info('DataObjectsActions::fetchDataObjects');
  Connection
    .DataObjects
    .list(className, {
      'page_size' : Constants.DATAOBJECTS_PAGE_SIZE,
      'order_by'  : '-created_at'
    })
    .then(this.completed)
    .catch(this.failure);
});

DataObjectsActions.subFetchDataObjects.listen(function(payload) {
  console.info('DataObjectsActions::subFetchDataObjects');

  Connection
    .DataObjects
    .list(payload.className, payload.params)
    .then(this.completed)
    .catch(this.failure);
});

DataObjectsActions.createDataObject.listen(function(payload) {
  console.info('DataObjectsActions::createDataObject', payload);
  Connection
    .DataObjects
    .create(payload.className, payload.params)
    .then(function(createdItem) {

      var promises = payload.fileFields.map(function(file) {
        return Connection.DataObjects.uploadFile(payload.className, createdItem, file)
      });

      D.all(promises)
        .success(this.completed)
        .error(this.failure);

    }.bind(this));
});

DataObjectsActions.updateDataObject.listen(function(payload) {
  console.info('DataObjectsActions::updateDataObject');
  Connection
    .DataObjects
    .update(payload.className, payload.params)
    .then(function(updatedItem) {

      var promises = payload.fileFields.map(function(file) {
        return Connection.DataObjects.uploadFile(payload.className, updatedItem, file)
      });

      D.all(promises)
        .success(this.completed)
        .error(this.failure);

    }.bind(this));
});

DataObjectsActions.removeDataObjects.listen(function(className, dataobjects) {
  console.info('DataObjectsActions::removeDataObjects');
  var promises = dataobjects.map(function(dataobject) {
    return Connection.DataObjects.remove(className, dataobject)
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);

});

module.exports = DataObjectsActions;
