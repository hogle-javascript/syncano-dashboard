var Reflux              = require('reflux'),

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
      selectedRows : null,
      columns      : [
        {
          id      : 'id',
          name    : 'Id',
          width   : 20,
          tooltip : 'Built-in property: ID',
          checked : true
        },
        {
          id      : 'owner',
          name    : 'Owner',
          width   : 20,
          checked : false
        },
        {
          id      : 'revision',
          name    : 'Rev',
          width   : 20,
          tooltip : 'Built-in property: Revision',
          checked : true
        },
        {
          id      : 'group',
          name    : 'Group',
          width   : 30,
          tooltip : 'Built-in property: Group',
          checked : false
        },
        {
          id      : 'created_at',
          name    : 'Created',
          width   : 200,
          tooltip : 'Built-in property: Created At',
          checked : true
        }
      ]
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

    // Update columns from Class
    this.data.classObj.schema.map(function(item) {
      this.data.columns.push({
        id      : item.name,
        name    : item.name,
        tooltip : 'Custom property: ' + item.name + ' (type: ' + item.type + ')',
        checked : true
      })
    }.bind(this));

    // Do we have any settings in localStorage?
    this.updateFromLocalStorage()
  },

  setSelectedRows: function(selectedRows) {
    console.debug('DataObjectsStore::setSelectedRows');
    this.data.selectedRows = selectedRows;
    this.trigger(this.data);
  },

  getColumn: function(columnId) {
    var column = null;
    this.data.columns.some(function(columnObj){
      if (column.id = columnId) {
        column = columnObj;
        return true;
      }
    });
    return column;
  },

  setDataObjects: function(items) {
    console.debug('DataObjectsStore::setDataObjects');

    this.data.hasNextPage = items.hasNextPage();

    if (!this.data.items) {
      this.data.items = []
    }

    Object.keys(items).map(function(key) {
      this.data.items.splice(0, 0, items[key]);
    }.bind(this));

    this.data.isLoading = false;
    this.trigger(this.data);
  },

  // We know number of selected rows, now we need to get ID of the objects
  getIDsFromTable: function() {
    return this.data.selectedRows.map(function(rowNumber) {return this.data.items[rowNumber].id}.bind(this));
  },

  // Table stuff
  renderTableData: function() {
    return DataObjectsRenderer.renderTableData(this.data.items, this.data.columns);
  },

  renderTableHeader: function() {
    return DataObjectsRenderer.renderTableHeader(this.data.classObj, this.data.columns);
  },

  updateFromLocalStorage: function() {
    console.debug('DataObjectsStore::updateFromLocalStorage');
    var className = this.getCurrentClassName(),
        settings  = localStorage.getItem('dataobjects_checkedcolumns_' + className);

    if (!settings) {
      return;
    }

    var checkedColumns = JSON.parse(settings);

    this.data.columns.map(function(column) {
      if (checkedColumns.indexOf(column.id) != -1) {
        column.checked = true;
      } else {
        column.checked = false;
      }
    });

    this.trigger(this.data);
  },

  updateLocalStorage: function() {
    var className = this.getCurrentClassName();
    localStorage.setItem('dataobjects_checkedcolumns_' + className, JSON.stringify(this.getCheckedColumnsIDs()));
  },

  checkToggleColumn: function(columnId) {
    console.debug('DataObjectsStore::checkToggleColumn', columnId);
    this.data.columns.map(function(item) {
      if (columnId === item.id) {
        item.checked = !item.checked
      }
    });
    this.updateLocalStorage();
    this.trigger(this.data);
  },

  getTableColumns: function() {
    return this.data.columns;
  },

  getCheckedColumnsIDs: function() {
    var columns = [];
    this.data.columns.map(function(column) {
      if (column.checked) {
        columns.push(column.id);
      }
    });
    return columns;
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
