var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),
    WaitForStoreMixin   = require('../../mixins/WaitForStoreMixin'),

    //Stores & Actions
    SessionActions      = require('../Session/SessionActions'),
    SessionStore        = require('../Session/SessionStore'),
    ClassesActions      = require('./ClassesActions');

var ClassesStore = Reflux.createStore({
  listenables : ClassesActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin,
    WaitForStoreMixin
  ],

  getInitialState: function() {
    return {
      items: [],
      isLoading: false
    }
  },

  init: function() {
    this.data = this.getInitialState();
    this.waitFor(
      SessionActions.setUser,
      SessionActions.setInstance,
      this.refreshData
    );
    this.listenToForms();
  },

  refreshData: function() {
    console.debug('ClassesStore::refreshData');
    ClassesActions.fetchClasses();
  },

  getItems: function() {
    return this.data.items;
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

  setClasses: function(items) {
    this.data.items = Object.keys(items).map(function(item) {
      return items[item];
    });
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

  onCreateClassCompleted: function() {
    console.debug('ClassesStore::onCreateClassCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateClassCompleted: function() {
    console.debug('ClassesStore::onUpdateClassCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveClassesCompleted: function() {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = ClassesStore;
