var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

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

  columnWidthMap: {
    id         : 20,
    revision   : 20,
    group      : 30,
    //created_at : 100
  },

  getInitialState: function () {
    return {
      items        : null,
      isLoading    : false,
      selectedRows : null
    }
  },

  init: function () {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();

    this.listenTo(DataObjectsActions.setCurrentClassObj, this.refreshDataObjects); // TODO why not setCurrentClassObj why?
  },

  refreshData: function () {
    console.debug('DataObjectsStore::refreshData');
    DataObjectsActions.fetchCurrentClassObj(SessionStore.router.getCurrentParams().className)
  },

  refreshDataObjects: function() {
    console.debug('DataObjectsStore::refreshDataObjects');
    DataObjectsActions.fetchDataObjects(this.getCurrentClassName());
  },

  getCurrentClassName: function() {
    return this.data.classObj.name;
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

  onFetchCurrentClassObjCompleted: function(classObj) {
    console.debug('DataObjectsStore::onFetchCurrentClassObjCompleted');
    this.data.classObj = classObj; // TODO why, why?
    DataObjectsActions.setCurrentClassObj(classObj);
  },

  renderTableData: function() {
    var tableItems = [];
    this.data.items.map(function(item) {
      var row = {};
      Object.keys(item).map(function(key) {
        var value = item[key] ? item[key] : '';

        row[key] = {content: value.toString(), style: {width: this.columnWidthMap[key]}}
      }.bind(this));
      tableItems.push(row);
    }.bind(this));
    return tableItems;

  },
  getTableHeader: function() {
      console.debug('ClassesStore::getTableHeader');
      //// TODO: default columns, it should be controled somehow
    //var classObj = null,
        header = {
          id: {
            content: 'ID',
            tooltip: 'Built-in property: ID'
          },
          revision: {
            content: 'Rev',
            tooltip: 'Built-in property: Revision'
          },
          group: {
            content: 'Group',
            tooltip: 'Built-in property: Group'
          },
          created_at: {
            content: 'Created',
            tooltip: 'Built-in property: Created At'
          }
        };

    this.data.classObj.schema.map(function(item) {
      if (!header[item.name]) {
        header[item.name] = {content: item.name, tooltip: item.type}
      }
    });

    Object.keys(header).map(function(key){
      header[key].style = {width: this.columnWidthMap[key]}
    }.bind(this));

    return header;
  },

  // We know number of selected rows, now we need to get ID of the objects
  getIDsFromTable: function() {
    return this.data.selectedRows.map(function(rowNumber) {return this.data.items[rowNumber].id}.bind(this));
  },

  setSelectedRows: function(selectedRows) {
    console.debug('DataObjectsStore::setSelectedRows');
    this.data.selectedRows = selectedRows;
    this.trigger(this.data);
  },

  setDataObjects: function (items) {
    console.debug('DataObjectsStore::setDataObjects');

    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });

    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onFetchDataObjects: function(items) {
    console.debug('DataObjectsStore::onFetchDataObjects');
    //this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchDataObjectsCompleted: function(items) {
    console.debug('DataObjectsStore::onFetchDataObjectsCompleted');
    //this.data.isLoading = false;
    DataObjectsActions.setDataObjects(items);
  },

  onCreateDataObjectCompleted: function(payload) {
    console.debug('DataObjectsStore::onCreateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  onUpdateDataObjectCompleted: function(paylod) {
    console.debug('DataObjectsStore::onUpdateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },
  onRemoveDataObjects: function(payload) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveDataObjectsCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.data.selectedRows = null;
    this.trigger(this.data);
    this.refreshDataObjects();
  },

});

module.exports = DataObjectsStore;