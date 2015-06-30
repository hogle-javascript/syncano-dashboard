var Reflux              = require('reflux'),
    URL                 = require('url'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    DataObjectsRenderer = require('./DataObjectsRenderer'),

    //Stores & Actions
    ClassesActions      = require('../Classes/ClassesActions'),
    ClassesStore        = require('../Classes/ClassesStore'),
    SessionActions      = require('../Session/SessionActions'),
    SessionStore        = require('../Session/SessionStore'),
    DataObjectsActions  = require('./DataObjectsActions');


var DataObjectsStore = Reflux.createStore({
  listenables : DataObjectsActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items        : null,
      isLoading    : false,
      selectedRows : null
    };
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();

    // TODO why not setCurrentClassObj why?
    this.listenTo(DataObjectsActions.setCurrentClassObj, this.refreshDataObjects);
  },

  refreshData: function() {
    console.debug('DataObjectsStore::refreshData');
    DataObjectsActions.fetchCurrentClassObj(SessionStore.router.getCurrentParams().className)
  },

  refreshDataObjects: function() {
    console.debug('DataObjectsStore::refreshDataObjects', this.getCurrentClassName());
    DataObjectsActions.fetchDataObjects(this.getCurrentClassName());
  },

  getCurrentClassName: function() {
    if (this.data.classObj) {
      return this.data.classObj.name;
    }
    return null;
  },

  getCurrentClassObj: function() {
    return this.data.classObj;
  },

  getSelectedRowsLength: function() {
    if (this.data.selectedRows) {
      return this.data.selectedRows.length;
    }
    return null;
  },

  setCurrentClassObj: function(classObj) {
    console.debug('DataObjectsStore::onSetCurrentClassObj');
    this.data.classObj = classObj;
  },

  setSelectedRows: function(selectedRows) {
    console.debug('DataObjectsStore::setSelectedRows');
    this.data.selectedRows = selectedRows;
    this.trigger(this.data);
  },

  setDataObjects: function(items) {
    console.debug('DataObjectsStore::setDataObjects');

    this.data.hasNextPage = items.hasNextPage();
    this.data.nextParams  = URL.parse(items.next() || '', true).query;
    this.data.prevParams  = URL.parse(items.prev() || '', true).query;

    if (!this.data.items) {
      this.data.items = []
    }

    var newItems = [];
    Object.keys(items).map(function(key) {
      newItems.splice(0, 0, items[key]);
    }.bind(this));

    this.data.items = this.data.items.concat(newItems);

    this.data.isLoading = false;
    this.trigger(this.data);
  },

  // We know number of selected rows, now we need to get ID of the objects
  getIDsFromTable: function() {
    return this.data.selectedRows.map(function(rowNumber) {return this.data.items[rowNumber].id}.bind(this));
  },

  // Table stuff
  renderTableData: function() {
    return DataObjectsRenderer.renderTableData(this.data.items);
  },

  renderTableHeader: function() {
    return DataObjectsRenderer.renderTableHeader(this.data.classObj);
  },

  getTableColumns: function() {
    return [
      {
        name    : 'Id',
        checked : true
      },
      {
        name    : 'User',
        checked : true
      },
      {
        name    : 'Group',
        checked : true
      }
    ]
  },

  onFetchCurrentClassObjCompleted: function(classObj) {
    console.debug('DataObjectsStore::onFetchCurrentClassObjCompleted');
    this.data.classObj = classObj; // TODO why, why?
    DataObjectsActions.setCurrentClassObj(classObj);
  },

  onFetchDataObjects: function() {
    console.debug('DataObjectsStore::onFetchDataObjects');
    //this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchDataObjectsCompleted: function(items) {
    console.debug('DataObjectsStore::onFetchDataObjectsCompleted');
    this.data.items = [];
    DataObjectsActions.setDataObjects(items);
  },

  onSubFetchDataObjectsCompleted: function(items) {
    console.debug('DataObjectsStore::onFetchDataObjectsCompleted');
    DataObjectsActions.setDataObjects(items);
  },

  onCreateDataObjectCompleted: function() {
    console.debug('DataObjectsStore::onCreateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  onUpdateDataObjectCompleted: function() {
    console.debug('DataObjectsStore::onUpdateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },
  onRemoveDataObjects: function() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveDataObjectsCompleted: function() {
    this.data.hideDialogs = true;
    this.data.selectedRows = null;
    this.trigger(this.data);
    this.refreshDataObjects();
  }

});

module.exports = DataObjectsStore;
