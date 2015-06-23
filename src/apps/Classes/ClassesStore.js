var Reflux              = require('reflux'),

    // Utils & Mixins
    CheckListStoreMixin = require('../../mixins/CheckListStoreMixin'),
    StoreFormMixin      = require('../../mixins/StoreFormMixin'),

    //Stores & Actions
    SessionStore        = require('../Session/SessionStore'),
    ClassesActions      = require('./ClassesActions');


var ClassesStore = Reflux.createStore({
  listenables : ClassesActions,
  mixins      : [
    CheckListStoreMixin,
    StoreFormMixin
  ],

  getInitialState: function () {
    return {
      items: [],
      isLoading: false
    }
  },

  init: function () {
    this.data = this.getInitialState();

    // We want to know when we are ready to download data for this store,
    // it depends on instance we working on
    this.listenTo(SessionStore, this.refreshData);
  },

  refreshData: function (data) {
    console.debug('ClassesStore::refreshData');
    if (SessionStore.instance) {
      ClassesActions.getClasses();
    }
  },

  getTableHeader: function() {
    if (this.getCheckedItem()) {

      // TODO: default columns, it should be controled somehow
      var header = {
        id         : {content: 'ID', tooltip: 'ID'},
        created_at : {content: 'Created', tooltip: 'Created'}
      };
      this.getCheckedItem().schema.map(function(item) {
        header[item.name] = {content: item.name, tooltip: item.type}
      });
      return header;
    }
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

  onGetClasses: function(items) {
    this.data.isLoading = true;
    this.trigger(this.data);
  },

  onGetClassesCompleted: function(items) {
    console.debug('ClassesStore::onGetClassesCompleted');

    this.data.items = Object.keys(items).map(function(item) {
        return items[item];
    });
    this.data.isLoading = false;
    this.trigger(this.data);
  },

  onCreateClassCompleted: function(payload) {
    console.debug('ClassesStore::onCreateClassCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onUpdateClassCompleted: function(paylod) {
    console.debug('ClassesStore::onUpdateClassCompleted');
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

  onRemoveClassesCompleted: function(payload) {
    this.data.hideDialogs = true;
    this.trigger(this.data);
    this.refreshData();
  },

});

module.exports = ClassesStore;