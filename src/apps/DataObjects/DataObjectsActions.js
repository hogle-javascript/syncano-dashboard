var Reflux         = require('reflux'),
    Syncano        = require('../Session/Connection'),
    Connection     = require('../Session/Connection').get(),
    D              = Syncano.D,

    Constants      = require('../../constants/Constants'),
    ClassesActions = require('../Classes/ClassesActions');

var DataObjectsActions = Reflux.createActions({
  checkItem             : {},
  uncheckAll            : {},

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
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  updateDataObject: {
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
    .list(className, {'page_size': Constants.DATAOBJECTS_PAGE_SIZE})
    .then(this.completed)
    .catch(this.failure);
});

DataObjectsActions.subFetchDataObjects.listen(function(payload) {
  console.info('DataObjectsActions::subFetchDataObjects');

  Connection
    .DataObjects
    .list(payload.className, {
      'last_pk'   : payload.lastItem.id,
      'page_size' : Constants.DATAOBJECTS_PAGE_SIZE,
      'direction' : 1
    })
    .then(this.completed)
    .catch(this.failure);
});

DataObjectsActions.createDataObject.listen(function(payload) {
  console.info('DataObjectsActions::createDataObject', payload);
  Connection
    .DataObjects
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

DataObjectsActions.updateDataObject.listen(function(id, payload) {
  console.info('DataObjectsActions::updateDataObject');
  Connection
    .DataObjects
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
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
