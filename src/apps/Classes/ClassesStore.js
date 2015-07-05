var Reflux              = require('reflux'),

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

  getCheckedItemIconColor: function() {
    var singleItem = this.getCheckedItem();

    if (!singleItem) {
      return {
        color : null,
        icon  : null
      }
    }
    return {
      color : singleItem.metadata.color,
      icon  : singleItem.metadata.icon
    };
  },

  setProtectedClasses: function(item) {
    if(Constans.PROTECTED_CLASS_NAMES.indexOf(item.name) > -1) {
      item.protected = true;
    }
    return item;
  },

  setClasses: function(items) {
    this.data.items = Object.keys(items).map(function(key) {
      return items[key];
    });
    this.data.items = this.data.items.map(this.setProtectedClasses);
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
