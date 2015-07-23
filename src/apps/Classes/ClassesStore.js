var Reflux              = require('reflux'),
    _                   = require('lodash'),

    // Utils & Mixins
    Constans            = require('../../constants/Constants'),
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    SessionStore        = require('../Session/SessionStore'),
    ClassesActions      = require('./ClassesActions');

var ClassesStore = Reflux.createStore({
  listenables : ClassesActions,
  mixins      : [
    CheckListStoreMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items: [],
      isLoading: true
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
  },

  refreshData: function() {
    console.debug('ClassesStore::refreshData');
    ClassesActions.fetchClasses();
  },

  getItems: function() {
    return this.data.items;
  },

  getClassesDropdown: function() {
    return this.data.items.map(function(item) {
      return {
        payload : item.name,
        text    : item.name
      }
    });
  },

  onGetClassByName: function(className) {
    var classObj = null;
    this.data.items.some(function(item) {
      if (item.name == className) {
        classObj = item;
        return true;
      }
    });
    return classObj;
  },

  getClassFields: function(className) {
    var classObj = null;
    this.data.items.some(function(item) {
      if (item.name == className) {
        classObj = item;
        return true;
      }
    });
    return classObj.schema;
  },

  getClassRelationFields: function(className) {
    var allFields      = this.getClassFields(className),
        relationFields = [];

    allFields.map(function(item) {
      if (item.type === 'reference') {
        relationFields.push(item);
      }
    });
    return relationFields;
  },

  getClassOrderFieldsPayload: function(className) {
    var allFields      = this.getClassFields(className),
        orderPayload = [];

    allFields.map(function(item) {
      console.log(item)
      if (item.order_index) {
        orderPayload.push({
          text    : item.name + ' (ascending)',
          payload : item.name
        });
        orderPayload.push({
          text    : item.name + ' (descending)',
          payload : '-' + item.name
        });
      }
    });
    return orderPayload;
  },

  getCheckedItemIconColor: function() {
    var singleItem = this.getCheckedItem();

    if (!singleItem) {
      return {
        color : null,
        icon  : null
      }
    }
    return {
      color : singleItem.metadata ? singleItem.metadata.color : 'blue',
      icon  : singleItem.metadata ? singleItem.metadata.icon : 'table-large'
    };
  },

  setProtectedFromEditClasses: function(item) {
    var indexInProtectedFromEditArray = _.findIndex(Constans.PROTECTED_FROM_EDIT_CLASS_NAMES, {name: item.name});

    if (indexInProtectedFromEditArray > -1) {
      item.protectedFromEdit = Constans.PROTECTED_FROM_EDIT_CLASS_NAMES[indexInProtectedFromEditArray];
    }

    return item;
  },

  setProtectedFromDeleteClasses: function(item) {
    if (Constans.PROTECTED_FROM_DELETE_CLASS_NAMES.indexOf(item.name) > -1) {
      item.protectedFromDelete = true;
    }
    return item;
  },

  setClasses: function(items) {
    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });

    if (this.data.items.length > 0) {
      this.data.items = this.data.items.map(this.setProtectedFromDeleteClasses);
      this.data.items = this.data.items.map(this.setProtectedFromEditClasses);
    }

    this.trigger(this.data);
  },

  onFetchClasses: function() {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onFetchClassesCompleted: function(items) {
    console.debug('ClassesStore::onFetchClassesCompleted');
    this.data.isLoading = false;
    ClassesActions.setClasses(items);
  },

  onRemoveClassesCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  }

});

module.exports = ClassesStore;
