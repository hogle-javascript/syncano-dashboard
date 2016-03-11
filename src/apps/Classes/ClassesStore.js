import Reflux from 'reflux';
import _ from 'lodash';
import Promise from 'bluebird';

// Utils & Mixins
import Constans from '../../constants/Constants';
import {StoreHelpersMixin, CheckListStoreMixin, WaitForStoreMixin, StoreLoadingMixin} from '../../mixins';

// Stores & Actions
import SessionActions from '../Session/SessionActions';
import Actions from './ClassesActions';
import SocketsActions from '../Sockets/SocketsActions';

export default Reflux.createStore({
  listenables: [Actions, SocketsActions],

  mixins: [
    StoreHelpersMixin,
    CheckListStoreMixin,
    WaitForStoreMixin,
    StoreLoadingMixin
  ],

  getInitialState() {
    return {
      items: [],
      clickedItem: null,
      triggers: [],
      isLoading: true
    };
  },

  init() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.setLoadingStates();
  },

  refreshData() {
    console.debug('ClassesStore::refreshData');
    Promise.all([
      Actions.fetchClasses(),
      Actions.fetchTriggers()
    ]).then(() => {
      this.data.isLoading = false;
      this.trigger(this.data);
    });
  },

  getItems() {
    return this.data.items;
  },

  getClickedItem() {
    return this.data.clickedItem;
  },

  getClassesDropdown(addSelf = false) {
    let items = this.data.items.map((item) => {
      return {
        payload: item.name,
        text: item.name
      };
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

  getClickedItemIconColor() {
    let clickedItem = this.getClickedItem();

    if (!clickedItem) {
      return {
        color: 'indigo',
        icon: 'cloud'
      };
    }
    return {
      color: clickedItem.metadata.color,
      icon: clickedItem.metadata.icon
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
    this.data.items = Object.keys(items).map((key) => {
      if (_.isEmpty(items[key].metadata)) {
        items[key].metadata = {color: 'indigo', icon: 'cloud'};
      }
      return items[key];
    });

    if (this.data.items.length > 0) {
      this.data.items = this.data.items.map(this.setProtectedFromDeleteClasses);
      this.data.items = this.data.items.map(this.setProtectedFromEditClasses);
    }

    this.trigger(this.data);
  },

  onSetClickedClass(item) {
    this.data.clickedItem = item;
    this.trigger(this.data);
  },

  onUpdateClassCompleted() {
    this.refreshData();
  },

  onFetchSocketsCompleted(sockets) {
    console.debug('ScriptsStore::onFetchSocketsCompleted');
    Actions.setClasses(sockets.scripts);
  },

  onFetchClassesCompleted(items) {
    console.debug('ClassesStore::onFetchClassesCompleted');
    Actions.setClasses(items);
  },

  onFetchTriggersCompleted(items) {
    console.debug('ClassesStore::onFetchTriggersCompleted');
    this.setTriggers(items._items);
  },

  setTriggers(items) {
    console.debug('ClassesStore::setTriggers');
    this.data.triggers = items;
    this.trigger(this.data);
  },

  onRemoveClassesCompleted() {
    console.debug('ClassesStore::onRemoveClassesCompleted');
    this.data.hideDialogs = true;
    this.refreshData();
  }
});
