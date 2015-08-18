import Reflux from 'reflux';
import _ from 'lodash';
import D from 'd.js';

// Utils & Mixins
import Constans from '../../constants/Constants';
import Mixins from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './ClassesActions';

export default Reflux.createStore({
  listenables: Actions,
  mixins: [
    Mixins.CheckListStore,
    Mixins.WaitForStore
  ],

  getInitialState() {
    return {
      items: [],
      triggers: [],
      isLoading: true
    }
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
  },

  refreshData() {
    console.debug('ClassesStore::refreshData');
    D.all([
      Actions.fetchClasses(),
      Actions.fetchTriggers()
    ]).then(() => {
      this.data.isLoading = false;
      this.trigger(this.data);
    })

  },

  getItems() {
    return this.data.items;
  },

  getClassesDropdown(addSelf = false) {
    let items = this.data.items.map((item) => {
      return {
        payload: item.name,
        text: item.name
      }
    });

    if (addSelf === true) {
      items.unshift({
        payload: 'self',
        text: 'self'
      });
    }

    return items;
  },

  onGetClassByName(className) {
    let classObj = null;

    this.data.items.some((item) => {
      if (item.name === className) {
        classObj = item;
        return true;
      }
    });
    return classObj;
  },

  getClassFields(className) {
    let classObj = null;

    this.data.items.some((item) => {
      if (item.name === className) {
        classObj = item;
        return true;
      }
    });
    return classObj.schema;
  },

  getClassRelationFields(className) {
    let allFields = this.getClassFields(className);
    let relationFields = [];

    allFields.map((item) => {
      if (item.type === 'reference') {
        relationFields.push(item);
      }
    });
    return relationFields;
  },

  getClassOrderFieldsPayload(className) {
    let allFields = this.getClassFields(className);
    let orderPayload = [];

    allFields.map((item) => {
      if (item.order_index) {
        orderPayload.push({
          text: item.name + ' (ascending)',
          payload: item.name
        });
        orderPayload.push({
          text: item.name + ' (descending)',
          payload: '-' + item.name
        });
      }
    });
    return orderPayload;
  },

  getCheckedItemIconColor() {
    let singleItem = this.getCheckedItem();

    if (!singleItem) {
      return {
        color: null,
        icon: null
      }
    }
    return {
      color: singleItem.metadata ? singleItem.metadata.color : 'blue',
      icon: singleItem.metadata ? singleItem.metadata.icon : 'table-large'
    };
  },

  setProtectedFromEditClasses(item) {
    let indexInProtectedFromEditArray = _.findIndex(Constans.PROTECTED_FROM_EDIT_CLASS_NAMES, {name: item.name});

    if (indexInProtectedFromEditArray > -1) {
      item.protectedFromEdit = Constans.PROTECTED_FROM_EDIT_CLASS_NAMES[indexInProtectedFromEditArray];
    }

    return item;
  },

  setProtectedFromDeleteClasses(item) {
    if (Constans.PROTECTED_FROM_DELETE_CLASS_NAMES.indexOf(item.name) > -1) {
      item.protectedFromDelete = true;
    }
    return item;
  },

  setClasses(items) {
    this.data.items = Object.keys(items).map((key) => items[key]);

    if (this.data.items.length > 0) {
      this.data.items = this.data.items.map(this.setProtectedFromDeleteClasses);
      this.data.items = this.data.items.map(this.setProtectedFromEditClasses);
    }

    this.trigger(this.data);
  },

  onUpdateClass() {
    this.data.isLoading = true;
  },

  onUpdateClassCompleted() {
    this.refreshData();
  },

  onFetchClasses() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchClassesCompleted(items) {
    console.debug('ClassesStore::onFetchClassesCompleted');
    Actions.setClasses(items);
  },

  onFetchTriggersCompleted(items) {
    console.debug('ClassesStore::onFetchTriggersCompleted');
    this.setTriggers(items);
  },

  setTriggers(items) {
    console.debug('ClassesStore::setTriggers');
    this.data.triggers = Object.keys(items).map(key => items[key]);
  },

  onRemoveClassesCompleted() {
    console.debug('ClassesStore::onRemoveClassesCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }
});
