import Reflux from 'reflux';
import URI from 'urijs';

// Utils & Mixins
import {CheckListStoreMixin, StoreFormMixin, WaitForStoreMixin, StoreLoadingMixin} from '../../mixins';
import DataObjectsRenderer from './DataObjectsRenderer';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import DataObjectsActions from './DataObjectsActions';

export default Reflux.createStore({
  listenables: DataObjectsActions,
  mixins: [
    StoreLoadingMixin,
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState() {
    return {
      items: [],
      isLoading: true,
      selectedRows: [],
      columns: [
        {
          id: 'id',
          width: 90,
          tooltip: 'Built-in property: ID',
          checked: true
        },
        {
          id: 'revision',
          width: 20,
          tooltip: 'Built-in property: Revision',
          checked: true
        },
        {
          id: 'owner',
          width: 90,
          tooltip: 'Owner',
          checked: false
        },
        {
          id: 'group',
          width: 90,
          tooltip: 'Built-in property: Group',
          checked: false
        },
        {
          id: 'owner_permissions',
          width: 90,
          tooltip: 'Built-in property: Owner Permissions',
          checked: false
        },
        {
          id: 'group_permissions',
          width: 90,
          tooltip: 'Built-in property: Group Permissions',
          checked: false
        },
        {
          id: 'other_permissions',
          width: 90,
          tooltip: 'Built-in property: Other Permissions',
          checked: false
        },
        {
          id: 'channel',
          width: 90,
          tooltip: 'Built-in property: Channel',
          checked: false
        },
        {
          id: 'channel_room',
          width: 90,
          tooltip: 'Built-in property: Channel room',
          checked: false
        },
        {
          id: 'created_at',
          width: 120,
          tooltip: 'Built-in property: Created At',
          checked: true
        },
        {
          id: 'updated_at',
          width: 120,
          tooltip: 'Built-in property: Updated At',
          checked: true
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
    this.setLoadingStates();

    this.listenTo(DataObjectsActions.setCurrentClassObj, this.refreshDataObjects);
  },

  refreshData() {
    console.debug('DataObjectsStore::refreshData');
    DataObjectsActions.fetchCurrentClassObj(SessionStore.router.getCurrentParams().className);
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

  getItems() {
    return this.data.items;
  },

  setCurrentClassObj(classObj) {
    console.debug('DataObjectsStore::onSetCurrentClassObj');
    this.data.classObj = classObj;

    // Update columns from Class
    this.data.columns = this.getInitialState().columns;
    this.data.classObj.schema.map((item) => {
      this.data.columns.push({
        id: item.name,
        name: item.name,
        tooltip: 'Custom property: ' + item.name + ' (type: ' + item.type + ')',
        checked: true
      });
    });

    // Do we have any settings in localStorage?
    this.updateFromLocalStorage();
  },

  setSelectedRows(selectedRows) {
    console.debug('DataObjectsStore::setSelectedRows');
    this.data.selectedRows = selectedRows;
    this.trigger(this.data);
  },

  getColumn(columnId) {
    let column = null;

    this.data.columns.some((columnObj) => {
      if (column.id.toString() === columnId.toString()) {
        column = columnObj;
        return true;
      }
    });
    return column;
  },

  setDataObjects(items) {
    console.debug('DataObjectsStore::setDataObjects');

    this.data.hasNextPage = items.hasNextPage();
    this.data.nextParams = new URI(items.next() || '').search(true);
    this.data.prevParams = new URI(items.prev() || '').search(true);

    if (!this.data.items) {
      this.data.items = [];
    }

    let newItems = [];

    Object.keys(items).map((key) => newItems.splice(0, 0, items[key]));

    this.data.items = this.data.items.concat(newItems);
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  // We know number of selected rows, now we need to get ID of the objects
  getIDsFromTable() {
    return this.data.selectedRows.map((rowNumber) => this.data.items[rowNumber].id);
  },

  // Table stuff
  renderTableData() {
    return DataObjectsRenderer.renderTableData(this.data.items, this.data.columns, this.data.selectedRows);
  },

  renderTableHeader() {
    return DataObjectsRenderer.renderTableHeader(this.data.classObj, this.data.columns);
  },

  updateFromLocalStorage() {
    console.debug('DataObjectsStore::updateFromLocalStorage');

    const className = this.getCurrentClassName();
    const settings = localStorage.getItem('dataobjects_checkedcolumns_' + className);

    if (!settings) {
      return;
    }

    const checkedColumns = JSON.parse(settings);

    this.data.columns.map((column) => {
      column.checked = checkedColumns.indexOf(column.id) !== -1;
    });

    this.trigger(this.data);
  },

  updateLocalStorage() {
    const className = this.getCurrentClassName();

    localStorage.setItem('dataobjects_checkedcolumns_' + className, JSON.stringify(this.getCheckedColumnsIDs()));
  },

  checkToggleColumn(columnId) {
    console.debug('DataObjectsStore::checkToggleColumn', columnId);
    this.data.columns.map((item) => {
      if (columnId === item.id) {
        item.checked = !item.checked;
      }
    });
    this.updateLocalStorage();
    this.trigger(this.data);
  },

  getTableColumns() {
    return this.data.columns;
  },

  getCheckedColumnsIDs() {
    let columns = [];

    this.data.columns.map((column) => {
      if (column.checked) {
        columns.push(column.id);
      }
    });
    return columns;
  },

  onFetchCurrentClassObjCompleted(classObj) {
    console.debug('DataObjectsStore::onFetchCurrentClassObjCompleted');
    this.data.classObj = classObj;
    DataObjectsActions.setCurrentClassObj(classObj);
  },

  onFetchDataObjectsCompleted(items) {
    console.debug('DataObjectsStore::onFetchDataObjectsCompleted');
    this.data.items = [];
    DataObjectsActions.setDataObjects(items);
  },

  onSubFetchDataObjects() {
    console.debug('DataObjectsStore::onSubFetchDataObjects');
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onSubFetchDataObjectsCompleted(items) {
    console.debug('DataObjectsStore::onSubFetchDataObjectsCompleted');
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
    this.data.selectedRows = [];
    this.trigger(this.data);
    this.refreshDataObjects();
  },

  clearStore() {
    this.data = this.getInitialState();
  }
});
