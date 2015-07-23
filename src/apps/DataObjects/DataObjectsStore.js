import Reflux from 'reflux';
import URL from 'url';

// Utils & Mixins
import CheckListStoreMixin from '../../mixins/CheckListStoreMixin';
import StoreFormMixin from '../../mixins/StoreFormMixin';
import WaitForStoreMixin from '../../mixins/WaitForStoreMixin';

import DataObjectsRenderer from './DataObjectsRenderer';

//Stores & Actions
import ClassesActions from '../Classes/ClassesActions';
import ClassesStore from '../Classes/ClassesStore';
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import DataObjectsActions from './DataObjectsActions';

var DataObjectsStore = Reflux.createStore({
  listenables : DataObjectsActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      items        : null,
      isLoading    : false,
      selectedRows : [],
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
          id      : 'owner_permissions',
          name    : 'Owner p',
          width   : 60,
          tooltip : 'Built-in property: Owner Permissions',
          checked : false
        },
        {
          id      : 'group_permissions',
          name    : 'Group p',
          width   : 60,
          tooltip : 'Built-in property: Group Permissions',
          checked : false
        },
        {
          id      : 'other_permissions',
          name    : 'Other p',
          width   : 60,
          tooltip : 'Built-in property: Other Permissions',
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

  init() {
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

  refreshData() {
    console.debug('DataObjectsStore::refreshData');
    DataObjectsActions.fetchCurrentClassObj(SessionStore.router.getCurrentParams().className)
  },

  refreshDataObjects() {
    console.debug('DataObjectsStore::refreshDataObjects', this.getCurrentClassName());
    DataObjectsActions.fetchDataObjects(this.getCurrentClassName());
  },

  getCurrentClassName() {
    if (this.data.classObj) {
      return this.data.classObj.name;
    }
    return null;
  },

  getCurrentClassObj() {
    return this.data.classObj;
  },

  getSelectedRowsLength() {
    if (this.data.selectedRows) {
      return this.data.selectedRows.length;
    }
    return null;
  },
  getSelectedRowObj(cellNumber) {
    return this.data.items[cellNumber];
  },

  setCurrentClassObj(classObj) {
    console.debug('DataObjectsStore::onSetCurrentClassObj');
    this.data.classObj = classObj;

    // Update columns from Class
    this.data.columns = this.getInitialState().columns;
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

  setSelectedRows(selectedRows) {
    console.debug('DataObjectsStore::setSelectedRows');
    this.data.selectedRows = selectedRows;
    this.trigger(this.data);
  },

  getColumn(columnId) {
    var column = null;
    this.data.columns.some(function(columnObj) {
      if (column.id = columnId) {
        column = columnObj;
        return true;
      }
    });
    return column;
  },

  setDataObjects(items) {
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
  getIDsFromTable() {
    return this.data.selectedRows.map(function(rowNumber) {return this.data.items[rowNumber].id}.bind(this));
  },

  // Table stuff
  renderTableData() {
    return DataObjectsRenderer.renderTableData(this.data.items, this.data.columns);
  },

  renderTableHeader() {
    return DataObjectsRenderer.renderTableHeader(this.data.classObj, this.data.columns);
  },

  updateFromLocalStorage() {
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

  updateLocalStorage() {
    var className = this.getCurrentClassName();
    localStorage.setItem('dataobjects_checkedcolumns_' + className, JSON.stringify(this.getCheckedColumnsIDs()));
  },

  checkToggleColumn(columnId) {
    console.debug('DataObjectsStore::checkToggleColumn', columnId);
    this.data.columns.map(function(item) {
      if (columnId === item.id) {
        item.checked = !item.checked
      }
    });
    this.updateLocalStorage();
    this.trigger(this.data);
  },

  getTableColumns() {
    return this.data.columns;
  },

  getCheckedColumnsIDs() {
    var columns = [];
    this.data.columns.map(function(column) {
      if (column.checked) {
        columns.push(column.id);
      }
    });
    return columns;
  },

  onFetchCurrentClassObjCompleted(classObj) {
    console.debug('DataObjectsStore::onFetchCurrentClassObjCompleted');
    this.data.classObj = classObj; // TODO why, why?
    DataObjectsActions.setCurrentClassObj(classObj);
  },

  onFetchDataObjects() {
    console.debug('DataObjectsStore::onFetchDataObjects');
    //this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchDataObjectsCompleted(items) {
    console.debug('DataObjectsStore::onFetchDataObjectsCompleted');
    this.data.items = [];
    DataObjectsActions.setDataObjects(items);
  },

  onSubFetchDataObjectsCompleted(items) {
    console.debug('DataObjectsStore::onFetchDataObjectsCompleted');
    DataObjectsActions.setDataObjects(items);
  },

  onCreateDataObjectCompleted() {
    console.debug('DataObjectsStore::onCreateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  onUpdateDataObjectCompleted() {
    console.debug('DataObjectsStore::onUpdateDataObjectCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshDataObjects();
  },
  onRemoveDataObjects() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onRemoveDataObjectsCompleted() {
    this.data.hideDialogs = true;
    this.data.selectedRows = null;
    this.trigger(this.data);
    this.refreshDataObjects();
  }

});

module.exports = DataObjectsStore;
